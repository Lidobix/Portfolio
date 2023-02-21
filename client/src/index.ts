window.addEventListener('DOMContentLoaded', function () {
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

  type Status = 'Fini' | 'En cours' | 'Stand-By';

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
    status: Status;
    description: string;
    technos?: Techno[];
    image?: string;
    link?: string;
    display: boolean;
  };

  type Site = {
    objet: any;
    body: HTMLElement | null;
    script: HTMLScriptElement | null;
    siteElements: SiteElements;
    buildSite: Function;
    fetchElements: Function;
    buildHeader: Function;
    buildSection: Function;
    buildNav: Function;
    buildForm: Function;
    buildProjects: Function;
  };

  const site: Site = {
    objet: this,
    body: this.document.querySelector('body'),
    script: this.document.querySelector('script'),
    siteElements: {} as SiteElements,

    buildSite: async function (): Promise<void> {
      await this.fetchElements();
      console.log(this.siteElements);
      const headerWrapper: HTMLDivElement = document.createElement('div');
      headerWrapper.classList.add();
      headerWrapper.appendChild(this.buildHeader(this.siteElements.header));
      this.body?.insertBefore(headerWrapper, this.script);

      this.body?.insertBefore(
        this.buildSection(this, this.siteElements.section),
        this.script
      );

      this.body?.insertBefore(
        this.buildNav(this.siteElements.nav),
        document.querySelector('section')
      );
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
      const nav: HTMLElement = document.createElement('nav');
      const ul: HTMLUListElement = document.createElement('ul');

      navElements.forEach((element) => {
        const li: HTMLLIElement = document.createElement('li');
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = element.anchor;
        a.innerText = element.name;
        li.appendChild(a);
        ul.appendChild(li);
        nav.appendChild(ul);
      });

      const div: HTMLElement = document.createElement('div');

      for (let i = 0; i < 3; i++) {
        const bullet: HTMLElement = document.createElement('div');
        div.appendChild(bullet);
      }
      nav.appendChild(div);

      return nav;
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

          const titleContainer: HTMLElement = document.createElement('div');
          titleContainer.classList.add('projectTitleContainer');
          const projectTitle: HTMLHeadElement = document.createElement('h4');
          projectTitle.innerText = `${project.title}`;
          titleContainer.appendChild(projectTitle);
          card.appendChild(titleContainer);

          const quickDescription: HTMLDivElement =
            document.createElement('div');
          quickDescription.classList.add('quickDescription');

          const type: HTMLParagraphElement = document.createElement('p');
          type.innerText = `${project.type}`;
          quickDescription.appendChild(type);

          const status: HTMLParagraphElement = document.createElement('p');
          status.innerText = `${project.subtype} (${project.status})`;
          quickDescription.appendChild(status);
          card.appendChild(quickDescription);

          if (project.image) {
            const view: HTMLImageElement = document.createElement('img');
            view.classList.add('projectView');
            view.src = project.image;
            card.appendChild(view);
          }

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
            card.appendChild(technoList);
          }
          container.appendChild(card);
        }
      });
      return container;
    },
    fetchElements: (): Promise<SiteElements> => {
      return fetch(`http://127.0.0.1:1234/api`, {
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
