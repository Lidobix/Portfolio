import { domCreator } from './src/domCreator.js';
const DomCreator = new domCreator();

window.addEventListener('DOMContentLoaded', function () {
  const site = {
    body: document.querySelector('body'),
    projectPreview: false,
    sectionPaddingRight: 0,
    headerPaddingRight: 0,
    navToggleRight: 0,
    lastVerticalScrollY: 0,
    lastHorizontalScrollY: 0,
    previewBackgroundDiv: {},
    header: {},
    section: {},
    navToggle: {},
    script: document.querySelector('script'),
    siteElements: {},
    navToggled: false,

    buildSite: async function () {
      await this.fetchElements();
      this.buildHeader(this.siteElements.header);
      this.buildSection(this, this.siteElements.section);
      this.section = document.querySelector('section');
      this.header = document.querySelector('header');

      this.buildNav(this.siteElements.nav);

      document.querySelector('header').appendChild(this.buildNavToggle());

      this.navToggle = document.getElementById('navToggle');

      document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        const targetEvent = e.target;
        if (targetEvent.classList.contains('navTrigger') && !this.navToggled) {
          nav.style.transform = 'translate(-15rem)';
          this.navToggled = true;
        } else {
          nav.style.transform = 'translate(15rem)';
          this.navToggled = false;
        }
        if (this.projectPreview) {
          this.closePreview(this);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && this.projectPreview) {
          this.closePreview(this);
        }
      });

      window.addEventListener('orientationchange', () => {
        if (window.orientation === 0) {
          // Appareil en position portrait
          this.lastHorizontalScrollY = window.scrollY;
          setTimeout(() => {
            window.scroll(0, this.lastVerticalScrollY);
            this.previewBackgroundDiv.style.top =
              this.lastVerticalScrollY + 'px';
            this.previewBackgroundDiv.style.height = window.innerHeight + 'px';
          }, 100);
        } else if (window.orientation === 90 || window.orientation === -90) {
          // Appareil en position paysage

          this.lastVerticalScrollY = window.scrollY;
          setTimeout(() => {
            window.scroll(0, this.lastHorizontalScrollY);
            this.previewBackgroundDiv.style.top =
              this.lastHorizontalScrollY + 'px';
            this.previewBackgroundDiv.style.height = window.innerHeight + 'px';
          }, 100);
        }
      });

      document
        .querySelector('form')
        ?.addEventListener('submit', async (event) => {
          event.preventDefault();
          const form = event.target;
          const formData = new FormData(form);
          const searchParams = new URLSearchParams(formData);
          // await fetch('http://localhost:3000/portfolio/contact', {
          await fetch('https://lidobix.alwaysdata.net/portfolio/contact', {
            method: 'POST',
            body: searchParams.toString(),

            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
          })
            .then((r) => {
              this.buildFormModal(
                this,
                this.siteElements.modal.success.title,
                this.siteElements.modal.success.message
              );
              form.reset();
            })
            .catch((e) => {
              this.buildFormModal(
                this,
                this.siteElements.modal.error.title,
                this.siteElements.modal.error.message
              );
            });
        });
    },

    buildFormModal: (levelUp, title, message) => {
      const titleContainer = DomCreator.div(['modalTitleContainer'], title);
      const messageContainer = DomCreator.div(['modalMessageContainer']);
      const modalContainer = DomCreator.div(['modalContainer']);
      const text = DomCreator.p(message);
      const closeButton = DomCreator.button('FERMER');

      DomCreator.appendChilds(messageContainer, [text, closeButton]);
      DomCreator.appendChilds(modalContainer, [
        titleContainer,
        messageContainer,
      ]);
      DomCreator.appendChilds(levelUp.body, [modalContainer]);

      closeButton.addEventListener('click', () => {
        modalContainer.remove();
      });
    },

    closePreview: (levelUp) => {
      document.getElementById('preview').remove();

      levelUp.projectPreview = false;

      levelUp.section.style.paddingRight = levelUp.sectionPaddingRight + 'px';
      levelUp.header.style.paddingRight = levelUp.headerPaddingRight + 'px';
      levelUp.navToggle.style.right = levelUp.navToggleRight + 'px';

      levelUp.body.classList.remove('notScrollable');
    },

    buildHeader: (headerElements) => {
      const header = document.querySelector('header');

      const pageTitle = DomCreator.h1(headerElements.title);
      const subTitle = DomCreator.h2(headerElements.subtitle);

      DomCreator.appendChilds(header, [pageTitle, subTitle]);

      if (headerElements.socials.length) {
        const socialContainer = DomCreator.div(['socialContainer']);

        headerElements.socials.forEach((element) => {
          const a = DomCreator.a(element.url);
          const picto = DomCreator.img(element.picto);
          a.appendChild(picto);
          socialContainer.appendChild(a);
        });

        header.appendChild(socialContainer);
      }
    },

    buildSection: (levelUp, sectionElements) => {
      const section = document.querySelector('section');
      sectionElements.forEach((sectionElement) => {
        if (sectionElement.display) {
          const title = document.createElement('h3');
          title.innerText = sectionElement.name;

          const anchorCalc = sectionElement.name
            .toLowerCase()
            .split(' ')
            .sort((a, b) => b.length - a.length)[0];
          title.id = anchorCalc;

          levelUp.siteElements.nav.push({
            name: sectionElement.name,
            anchor: `#${anchorCalc}`,
          });
          section.appendChild(title);

          if (sectionElement.text) {
            const content = document.createElement('p');
            content.innerText = sectionElement.text;
            section.appendChild(content);
          }

          if (
            sectionElement.illustrations &&
            sectionElement.illustrations.length !== 0
          ) {
            const imagesContainer = document.createElement('div');
            imagesContainer.classList.add('imagesContainer');
            sectionElement.illustrations.forEach((imageUrl) => {
              const image = document.createElement('img');
              image.src = imageUrl;
              imagesContainer.appendChild(image);
            });
            section.appendChild(imagesContainer);
          }

          if (sectionElement.projectList) {
            section.appendChild(
              levelUp.buildProjects(sectionElement.projectList, levelUp)
            );
          }

          if (sectionElement.htmlForm) {
            section.appendChild(levelUp.buildForm(sectionElement.htmlForm));
          }
        }
      });

      return section;
    },

    buildNav: (navElements) => {
      const ul = document.createElement('ul');
      const nav = document.querySelector('nav');

      navElements.forEach((element) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = element.anchor;
        a.innerText = element.name;
        li.appendChild(a);
        ul.appendChild(li);
        nav.appendChild(ul);
      });
    },

    buildNavToggle: () => {
      const navToggle = document.createElement('div');

      navToggle.id = 'navToggle';
      navToggle.classList.add('mobile', 'navTrigger');

      for (let i = 0; i < 3; i++) {
        const bullet = document.createElement('div');
        bullet.classList.add('navTrigger');
        navToggle.appendChild(bullet);
      }

      return navToggle;
    },

    buildForm: (htmlForm) => {
      const form = document.createElement('form');
      form.id = 'formulaire';

      form.innerHTML = htmlForm;
      form.method = 'POST';
      const formContainer = document.createElement('div');
      formContainer.classList.add('formContainer');

      formContainer.appendChild(form);
      return formContainer;
    },

    buildProjects: (projects, levelUp) => {
      const container = document.createElement('div');
      container.id = 'projectList';
      projects.forEach((project) => {
        if (project.display) {
          const card = document.createElement('div');
          card.classList.add('card');

          if (project.image) {
            const figure = document.createElement('figure');

            const view = document.createElement('img');

            view.src = project.image;
            figure.appendChild(view);

            card.appendChild(figure);
          }
          const description = document.createElement('div');
          description.classList.add('cardDescription');

          const projectTitle = document.createElement('h4');
          projectTitle.innerText = `${project.title}`;

          description.appendChild(projectTitle);

          const type = document.createElement('p');
          type.innerText = `${project.type}`;
          description.appendChild(type);

          const aHref = document.createElement('a');
          aHref.innerText = 'Visiter';
          aHref.id = 'projectLink';
          description.appendChild(aHref);
          if (project.link) {
            aHref.href = project.link;
            aHref.classList.add('enabledLink');
          } else {
            aHref.classList.add('disabledLink');
          }

          const summary = document.createElement('p');
          summary.innerText = `${project.description}`;
          description.appendChild(summary);

          if (project.technos?.length) {
            const technoListContainer = document.createElement('div');
            technoListContainer.classList.add('technoListContainer');
            const technoList = document.createElement('div');
            technoList.classList.add('technoList');
            project.technos?.forEach((techno) => {
              const logo = document.createElement('img');

              logo.src = `assets/images/${techno.toLowerCase()}.png`;

              technoList.appendChild(logo);
            });
            technoListContainer.appendChild(technoList);
            description.appendChild(technoListContainer);
            card.appendChild(description);
          }

          levelUp.buildCardEvents(card, project, levelUp);

          container.appendChild(card);
        }
      });
      return container;
    },

    buildCardEvents: (card, project, levelUp) => {
      console.log('clic card');
      card.addEventListener('click', (e) => {
        const targetEvent = e.target;
        if (!targetEvent.classList.contains('enabledLink')) {
          this.setTimeout(() => {
            levelUp.projectPreview = true;
          }, 300);
          const previewBackground = document.createElement('div');

          previewBackground.id = 'preview';
          previewBackground.classList.add('previewBackground');
          previewBackground.style.top = window.scrollY + 'px';

          previewBackground.style.height = window.innerHeight + 'px';
          levelUp.previewBackgroundDiv = previewBackground;

          const bodyStyle = window.getComputedStyle(levelUp.body);

          const scrollBarWidth =
            this.window.innerWidth - parseInt(bodyStyle.width);

          levelUp.sectionPaddingRight = parseInt(
            this.window.getComputedStyle(document.querySelector('section'))
              .paddingRight
          );

          levelUp.headerPaddingRight = parseInt(
            this.window.getComputedStyle(document.querySelector('header'))
              .paddingRight
          );
          levelUp.navToggleRight = parseInt(
            this.window.getComputedStyle(document.getElementById('navToggle'))
              .right
          );

          levelUp.section.style.paddingRight =
            levelUp.sectionPaddingRight + scrollBarWidth + 'px';

          levelUp.header.style.paddingRight =
            levelUp.headerPaddingRight + scrollBarWidth + 'px';

          levelUp.navToggle.style.right =
            levelUp.navToggleRight + scrollBarWidth + 'px';

          levelUp.body.classList.add('notScrollable');

          const previewContainer = document.createElement('div');
          previewContainer.classList.add('previewContainer');
          const titleContainer = document.createElement('div');
          const title = DomCreator.h2(project.title);
          const summary = document.createElement('div');

          const descriptionContainer = document.createElement('div');
          const description = document.createElement('p');
          description.innerText = project.description;
          descriptionContainer.appendChild(description);
          summary.classList.add('previewSummary');

          titleContainer.appendChild(title);
          summary.appendChild(titleContainer);
          summary.appendChild(descriptionContainer);
          const imageContainer = document.createElement('div');
          imageContainer.classList.add('previewImage');

          imageContainer.style.backgroundImage = `url(${project.image})`;
          previewContainer.appendChild(imageContainer);
          previewContainer.appendChild(summary);

          previewBackground.appendChild(previewContainer);

          levelUp.body.appendChild(previewBackground);
        }
      });
    },

    fetchElements: () => {
      return fetch('https://lidobix.alwaysdata.net/portfolio/home', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => {
          return result.json();
        })
        .then((datas) => {
          site.siteElements = datas[0];
          return datas[0];
        });
    },
  };

  site.buildSite();
});
