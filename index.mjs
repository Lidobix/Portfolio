import { domCreator } from './src/domCreator.mjs';
const DomCreator = new domCreator();

import datasManager from './src/datasManager.mjs';
import { SiteBuilder } from './src/site.mjs';
const Site = new SiteBuilder();

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
      await datasManager.fetchElements();
      Site.buildHeader();
      Site.buildSection();
      this.section = document.querySelector('section');
      this.header = document.querySelector('header');

      // this.buildNav(this.siteElements.nav);

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

    // buildNav: (navElements) => {
    //   const ul = document.createElement('ul');
    //   const nav = document.querySelector('nav');

    //   navElements.forEach((element) => {
    //     const li = document.createElement('li');
    //     const a = DomCreator.a(element.anchor, element.name);

    //     li.appendChild(a);
    //     ul.appendChild(li);
    //     nav.appendChild(ul);
    //   });
    // },

    buildNavToggle: () => {
      const navToggle = DomCreator.div(
        ['mobile', 'navTrigger'],
        null,
        'navToggle'
      );

      for (let i = 0; i < 3; i++) {
        const bullet = DomCreator.div(['navTrigger']);
        navToggle.appendChild(bullet);
      }

      return navToggle;
    },

    buildForm: (htmlForm) => {
      const form = DomCreator.form('formulaire', htmlForm, 'POST');
      const formContainer = DomCreator.div(['formContainer']);

      formContainer.appendChild(form);
      return formContainer;
    },

    buildCardEvents: (card, project, levelUp) => {
      card.addEventListener('click', (e) => {
        const targetEvent = e.target;
        if (!targetEvent.classList.contains('enabledLink')) {
          this.setTimeout(() => {
            levelUp.projectPreview = true;
          }, 300);

          const previewBackground = DomCreator.createNode(
            'div',
            ['previewBackground'],
            { id: 'preview' }
          );

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

          const previewContainer = DomCreator.createNode('div', [
            'previewContainer',
          ]);

          const titleContainer = DomCreator.createNode('div');
          const title = DomCreator.hX(2, project.title);
          const summary = DomCreator.createNode('div', ['previewSummary']);

          const descriptionContainer = DomCreator.createNode('div');

          const description = DomCreator.createNode('p', [], {
            innerText: project.description,
          });
          descriptionContainer.appendChild(description);

          titleContainer.appendChild(title);

          DomCreator.appendChilds(summary, [
            titleContainer,
            descriptionContainer,
          ]);

          const imageContainer = DomCreator.createNode('div', ['previewImage']);

          imageContainer.style.backgroundImage = `url(${project.image})`;

          DomCreator.appendChilds(previewContainer, [imageContainer, summary]);

          previewBackground.appendChild(previewContainer);

          levelUp.body.appendChild(previewBackground);
        }
      });
    },
  };

  site.buildSite();
});
