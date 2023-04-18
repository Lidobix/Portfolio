// import {
//   Header,
//   Site,
//   SiteElements,
//   SectionElement,
//   NavElement,
//   Project,
// } from './types';

type ProjectSubtype = 'Projet perso' | "Projet d'études" | 'Projet pro';

type Header = {
  title: string;
  subtitle: string;
};

type NavElement = { name: string; anchor: string };

type SiteElements = {
  header: Header;
  section: SectionElement[];
  nav: NavElement[];
};

type SectionElement = {
  id: number;
  name: string;
  text?: string;
  projectList?: Project[];
  display: boolean;
  htmlForm?: string;
};

type Techno =
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'WebSocket'
  | 'Angular'
  | 'React'
  | 'NODE_JS';

type Project = {
  id: number;
  title: string;
  type: string;
  subtype: ProjectSubtype;
  status: 'Fini' | 'En cours' | 'Stand-By';
  description: string;
  technos?: Techno[];
  image?: string;
  link?: string;
  display: boolean;
};

type Site = {
  body: HTMLElement;
  script: HTMLScriptElement;
  siteElements: SiteElements;
  navToggled: boolean;
  buildSite: Function;
  fetchElements: Function;
  buildHeader: Function;
  buildSection: Function;
  buildNav: Function;
  buildNavToggle: Function;
  buildForm: Function;
  buildProjects: Function;
  scrollEvent?: Function;
};

window.addEventListener('DOMContentLoaded', function () {
  const site: Site = {
    body: this.document.querySelector('body')!,
    script: this.document.querySelector('script')!,
    siteElements: {} as SiteElements,
    navToggled: false,
    buildSite: async function (): Promise<void> {
      await this.fetchElements();

      this.body.insertBefore(
        this.buildHeader(this.siteElements.header),
        this.script
      );

      this.body.insertBefore(
        this.buildSection(this, this.siteElements.section),
        this.script
      );
      // this.body.insertBefore(this.buildNav(this.siteElements.nav), this.script);
      document
        .querySelector('header')!
        .appendChild(this.buildNav(this.siteElements.nav));
      if (document.querySelector('header')) {
        document.querySelector('header')?.appendChild(this.buildNavToggle());
      }
      const nav: HTMLElement = document.querySelector('nav')!;
      const h2: HTMLHeadingElement = document.querySelector('h2')!;
      const headerStyle = window.getComputedStyle(
        document.querySelector('header')!
      );
      // h2.addEventListener('animationstart', () => {
      //   nav.style.top =
      //     parseFloat(headerStyle.height) +
      //     parseFloat(headerStyle.marginBottom) +
      //     parseFloat(headerStyle.marginTop) +
      //     parseFloat(headerStyle.paddingBottom) +
      //     parseFloat(headerStyle.paddingTop) +
      //     'px';
      // });
      // document.addEventListener('scroll', () => {
      // const ypos: number = window.scrollY;
      // const h2: HTMLHeadingElement = document.querySelector('h2')!;
      // const nav: HTMLElement = document.querySelector('nav')!;
      // const headerStyle = window.getComputedStyle(
      //   document.querySelector('header')!
      // );

      // if (ypos > 100) {
      // h2.style.fontSize = '0.9em';
      // nav.style.top =
      //   parseFloat(headerStyle.height) +
      //   parseFloat(headerStyle.marginBottom) +
      //   parseFloat(headerStyle.marginTop) +
      //   parseFloat(headerStyle.paddingBottom) +
      //   parseFloat(headerStyle.paddingTop) +
      // ('px');
      // } else {
      // h2.style.fontSize = '1.4em';
      // nav.style.top =
      //   parseFloat(headerStyle.height) +
      //   parseFloat(headerStyle.marginBottom) +
      //   parseFloat(headerStyle.marginTop) +
      //   parseFloat(headerStyle.paddingBottom) +
      //   parseFloat(headerStyle.paddingTop) +
      //   'px';
      // }
      // console.log(
      //   `header height: ${
      //     parseFloat(headerStyle.height) +
      //     parseFloat(headerStyle.marginBottom) +
      //     parseFloat(headerStyle.marginTop) +
      //     parseFloat(headerStyle.paddingBottom) +
      //     parseFloat(headerStyle.paddingTop) +
      //     'px'
      //   }, nav top: `
      // );
      // });

      document.addEventListener('click', (e) => {
        const nav: HTMLElement = document.querySelector('nav')!;
        const targetEvent: HTMLElement = e.target as HTMLElement;

        if (targetEvent.classList.contains('navTrigger') && !this.navToggled) {
          this.navToggled = true;
          nav.style.display = 'block';
        } else {
          this.navToggled = false;
          nav.style.display = 'none';
        }
      });
    },

    buildHeader: (headerElements: Header): HTMLElement => {
      const header: HTMLElement = document.createElement('header');

      const pageTitle: HTMLHeadingElement = document.createElement('h1');
      pageTitle.innerText = headerElements.title;
      const subTitle: HTMLHeadingElement = document.createElement('h2');
      subTitle.innerText = headerElements.subtitle;

      header.appendChild(pageTitle);
      header.appendChild(subTitle);

      return header;
    },

    buildSection: (
      levelUp: Site,
      sectionElements: SectionElement[]
    ): HTMLElement => {
      const section: HTMLElement = document.createElement('section');
      sectionElements.forEach((sectionElement) => {
        if (sectionElement.display) {
          const title: HTMLHeadingElement = document.createElement('h3');
          title.innerText = sectionElement.name;

          const anchorCalc: string = sectionElement.name
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
            const content: HTMLParagraphElement = document.createElement('p');
            content.innerText = sectionElement.text;
            section.appendChild(content);
          }

          if (sectionElement.projectList) {
            section.appendChild(
              levelUp.buildProjects(sectionElement.projectList)
            );
          }

          if (sectionElement.htmlForm) {
            section.appendChild(levelUp.buildForm(sectionElement.htmlForm));
          }
        }
      });

      return section;
    },

    buildNav: (navElements: NavElement[]): HTMLElement => {
      const ul: HTMLUListElement = document.createElement('ul');

      const nav: HTMLElement = document.createElement('nav');

      navElements.forEach((element) => {
        const li: HTMLLIElement = document.createElement('li');
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = element.anchor;
        a.innerText = element.name;
        li.appendChild(a);
        ul.appendChild(li);
        nav.appendChild(ul);
      });

      return nav;
    },

    buildNavToggle: (): HTMLElement => {
      const navToggle: HTMLElement = document.createElement('div')!;

      const nav: HTMLElement = document.querySelector('nav')!;
      navToggle.classList.add('navToggle');

      navToggle.addEventListener('click', (e) => {
        // const targetEvent: HTMLElement = e.target as HTMLElement;
        // if (targetEvent.classList.contains('navToggle')) {
        // }
        // if (!site.navToggled) {
        //   site.navToggled = true;
        //   nav.style.display = 'block';
        // }
        // nav.style.display === 'none' || nav.style.display === ''
        //   ? (nav.style.display = 'block')
        //   : (nav.style.display = 'none');
      });

      for (let i = 0; i < 3; i++) {
        const bullet: HTMLElement = document.createElement('div');
        bullet.classList.add('navTrigger');
        navToggle.appendChild(bullet);
      }

      return navToggle;
    },

    buildForm: (htmlForm: string): HTMLElement => {
      const form: HTMLFormElement = document.createElement('form');
      form.classList.add('card');
      form.innerHTML = htmlForm;
      form.method = 'POST';

      return form;
    },

    buildProjects: (projects: Project[]): HTMLElement => {
      const container: HTMLDivElement = document.createElement('div');
      container.id = 'projectList';
      projects.forEach((project) => {
        if (project.display) {
          const card: HTMLDivElement = document.createElement('div');
          card.classList.add('card');

          if (project.image) {
            const figure: HTMLElement = document.createElement('figure');

            const view: HTMLImageElement = document.createElement('img');

            view.src = project.image;
            figure.appendChild(view);

            card.appendChild(figure);
          }
          const description: HTMLDivElement = document.createElement('div');
          description.classList.add('cardDescription');

          const projectTitle: HTMLHeadElement = document.createElement('h4');
          projectTitle.innerText = `${project.title}`;

          description.appendChild(projectTitle);

          const type: HTMLParagraphElement = document.createElement('p');
          type.innerText = `${project.type}`;
          description.appendChild(type);

          if (project.technos?.length) {
            const technoList: HTMLDivElement = document.createElement('div');
            technoList.classList.add('technoList');
            project.technos?.forEach((techno) => {
              const div: HTMLElement = document.createElement('div');
              const logo: HTMLImageElement = document.createElement('img');
              div.classList.add('logoTechno');

              logo.src = `assets/images/${techno.toLowerCase()}.png`;

              div.appendChild(logo);
              technoList.appendChild(div);
            });
            description.appendChild(technoList);
            card.appendChild(description);
          }
          if (project.link) {
            card.addEventListener('click', (e) => {
              window.location.href = project.link!;
            });
          }

          container.appendChild(card);
        }
      });
      return container;
    },
    fetchElements: (): Promise<SiteElements> => {
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
