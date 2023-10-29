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
  }

  buildHeader() {
    const { header, socials } = datasManager;
    if (header !== null) {
      DomCreator.appendChilds(this.header, [
        DomCreator.createNode('h1', [], {
          innerText: header.title,
        }),
        DomCreator.createNode('h2', [], {
          innerText: header.subtitle,
        }),
      ]);
    }

    if (socials.length) {
      const socialContainer = DomCreator.createNode('div', ['socialContainer']);

      socials.forEach((social) => {
        const a = DomCreator.a(social.url);
        DomCreator.createNodeAppended('img', [], { src: social.picto }, a);
        socialContainer.appendChild(a);
      });

      this.header.appendChild(socialContainer);
    }
  }

  buildSection() {
    const { section, stack, projects } = datasManager;
    if (section !== null) {
      section.forEach((paragraph) => {
        if (paragraph.display) {
          this.buildSectionParagraph(paragraph);
        }
      });

      if (stack !== null) {
        this.buildIllustrations(stack, document.getElementById('pFormation'));
      }

      if (projects !== null) {
        this.buildProjects(projects);
      }
    }
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

    this.section.appendChild(title);

    if (paragraph.text) {
      DomCreator.createNodeAppended(
        'p',
        [],
        { id: `p${paragraph.name}`, innerText: paragraph.text },
        this.section
      );
    }

    if (paragraph.illustrations && paragraph.illustrations.length !== 0) {
      this.buildIllustrations(paragraph.illustration, this.section);
    }

    if (paragraph.htmlForm) {
      this.buildForm(paragraph.htmlForm);
    }
  }

  buildNav() {
    const { nav } = datasManager;

    if (nav !== null) {
      this.buildNavMenu(nav);
    }
    this.buildNavToggle();
  }

  buildIllustrations(illustrations, parent) {
    const imagesContainer = DomCreator.div(['imagesContainer']);

    illustrations.forEach((imageUrl) => {
      DomCreator.createNodeAppended(
        'img',
        [],
        { src: imageUrl },
        imagesContainer
      );
    });
    parent.after(imagesContainer);
  }

  buildNavMenu(nav) {
    const navItems = [];

    nav.forEach((navElement) => {
      navItems.push({
        name: navElement,
        anchor: `#${navElement.toLowerCase()}`,
      });
    });

    const ul = document.createElement('ul');

    navItems.forEach((item) => {
      const li = document.createElement('li');
      const a = DomCreator.a(item.anchor, item.name);

      li.appendChild(a);
      ul.appendChild(li);
      this.nav.appendChild(ul);
    });
  }

  buildNavToggle() {
    const navToggle = DomCreator.createNode('div', ['mobile', 'navTrigger'], {
      id: 'navToggle',
    });

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
        const card = DomCreator.createNode('div', ['card'], {
          id: `project${project.name}`,
        });

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

        // eventManager.clicCard(card, project);

        // this.buildCardEvents(card, project, this);

        container.appendChild(card);
      }
    });

    document.getElementById('projets').after(container);
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
