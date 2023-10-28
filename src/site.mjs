import datasManager from './datasManager.mjs';
import { domCreator } from './domCreator.mjs';
import { EventsManager } from './events.mjs';
const eventManager = new EventsManager();
const DomCreator = new domCreator();

class SiteBuilder {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('header');
    this.nav = document.querySelector('nav');
    this.section = document.querySelector('section');
    this.headerDatas = {};
    this.sectionDatas = {};
    this.navItems = [];
  }

  buildHeader() {
    if (datasManager.header !== null) {
      this.headerDatas = datasManager.header;
    } else {
      return;
    }
    DomCreator.appendChilds(this.header, [
      DomCreator.createNode('h1', [], {
        innerText: this.headerDatas.title,
      }),
      DomCreator.createNode('h2', [], {
        innerText: this.headerDatas.subtitle,
      }),
    ]);

    if (this.headerDatas.socials.length) {
      const socialContainer = DomCreator.createNode('div', ['socialContainer']);

      this.headerDatas.socials.forEach((element) => {
        const a = DomCreator.a(element.url);
        DomCreator.createNodeAppended('img', [], { src: element.picto }, a);
        socialContainer.appendChild(a);
      });

      this.header.appendChild(socialContainer);
    }
  }

  buildSection() {
    if (datasManager.section !== null) {
      this.sectionDatas = datasManager.section;
    } else {
      return;
    }
    this.sectionDatas.forEach((paragraph) => {
      if (paragraph.display) {
        this.buildSectionParagraph(paragraph);
      }
    });
  }

  buildSectionParagraph(paragraph) {
    const anchorCalc = paragraph.name
      .toLowerCase()
      .split(' ')
      .sort((a, b) => b.length - a.length)[0];

    const title = DomCreator.createNode('h3', [], {
      innerText: paragraph.name,
      id: anchorCalc,
    });

    this.navItems.push({
      name: paragraph.name,
      anchor: `#${anchorCalc}`,
    });

    this.section.appendChild(title);

    if (paragraph.text) {
      DomCreator.createNodeAppended(
        'p',
        [],
        { innerText: paragraph.text },
        this.section
      );
    }

    if (paragraph.illustrations && paragraph.illustrations.length !== 0) {
      const imagesContainer = DomCreator.div(['imagesContainer']);

      paragraph.illustrations.forEach((imageUrl) => {
        DomCreator.createNodeAppended(
          'img',
          [],
          { src: imageUrl },
          imagesContainer
        );
      });
      this.section.appendChild(imagesContainer);
    }
    // console.log('section datas', paragraph);
    if (paragraph.projectList) {
      this.buildProjects(paragraph.projectList);
    }

    if (paragraph.htmlForm) {
      this.buildForm(paragraph.htmlForm);
    }
  }

  // buildNav() {
  //   this.buildNavMenu();
  //   this.buildNavToggle();
  // }

  buildNavMenu() {
    const ul = document.createElement('ul');
    const nav = document.querySelector('nav');

    this.navItems.forEach((item) => {
      const li = document.createElement('li');
      const a = DomCreator.a(item.anchor, item.name);

      li.appendChild(a);
      ul.appendChild(li);
      nav.appendChild(ul);
    });
  }

  buildNavToggle() {
    const navToggle = DomCreator.createNode('div', ['mobile', 'navTrigger'], {
      id: 'navToggle',
    });

    // DomCreator.div(

    //   null,
    //   'navToggle'
    // );

    for (let i = 0; i < 3; i++) {
      const bullet = DomCreator.div(['navTrigger']);
      navToggle.appendChild(bullet);
    }

    this.header.appendChild(navToggle);
  }

  buildProjects(projects) {
    const container = DomCreator.div([], null, 'projectList');

    projects.forEach((project) => {
      if (project.display) {
        const card = DomCreator.div(['card']);

        if (project.image) {
          const figure = document.createElement('figure');
          const view = DomCreator.img(project.image);
          figure.appendChild(view);
          card.appendChild(figure);
        }
        const description = DomCreator.div(['cardDescription']);
        const projectTitle = DomCreator.hX(4, project.title);
        description.appendChild(projectTitle);

        const type = DomCreator.p(project.type);
        description.appendChild(type);

        let aHref;
        if (project.link) {
          aHref = DomCreator.a(project.link, 'Visiter', null, ['enabledLink']);
        } else {
          aHref = DomCreator.a(null, 'Visiter', null, ['disabledLink']);
        }
        description.appendChild(aHref);

        const summary = DomCreator.p(project.description);
        description.appendChild(summary);

        if (project.technos.length) {
          const technoListContainer = DomCreator.div(['technoListContainer']);
          const technoList = DomCreator.div(['technoList']);

          project.technos?.forEach((techno) => {
            const logo = DomCreator.img(
              `assets/images/${techno.toLowerCase()}.png`
            );

            technoList.appendChild(logo);
          });
          technoListContainer.appendChild(technoList);
          description.appendChild(technoListContainer);
          card.appendChild(description);
        }

        eventManager.clicCard(card, project, this);

        // this.buildCardEvents(card, project, this);

        container.appendChild(card);
      }
    });

    document.getElementById('projets').after(container);

    // return container;
  }
  buildForm(htmlForm) {
    const form = DomCreator.form('formulaire', htmlForm, 'POST');
    const formContainer = DomCreator.div(['formContainer']);

    formContainer.appendChild(form);

    document.getElementById('contact').after(formContainer);
  }
}
const siteBuilder = new SiteBuilder();
export default siteBuilder;
