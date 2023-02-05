window.addEventListener('DOMContentLoaded', function () {
  console.log('JS lancé');

  const script: HTMLScriptElement | null = document.querySelector('script');

  const body: HTMLBodyElement | null = document.querySelector('body');

  type ProjectSubtype = 'Projet perso' | "projet d'études";

  type Header = {
    title: string;
    subtitle: string;
  };
  type Nav = { title: string };
  type SiteElements = {
    header: Header;
    section: Section[];
    nav: Nav;
  };

  type Section = {
    id: number;
    name: string;
    type: 'text' | 'projectList' | 'contactForm';
    text?: string;
    projectList?: Project[];
    contactForm?: boolean;
    display: boolean;
    form?: string;
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
    // type?: 'project';
    type: string;
    subtype: ProjectSubtype;
    status: Status;
    description: string;
    technos?: Techno[];
    image?: string;
    link?: string;
  };
  console.log('lancement fetch');

  ///////////// COUCOU SERVEUR /////////////////////////
  fetch(`http://127.0.0.1:1234/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((r) => {
      return r.json();
    })
    .then((r) => {
      console.log(r);
    });
  ///////////////////////////////////////////

  function buildPage(siteElements: SiteElements): void {
    body?.insertBefore(buildHeader(siteElements.header), script);

    body?.insertBefore(buildSection(siteElements.section), script);

    // body?.insertBefore(
    //   buildForm(
    //     siteElements.section[
    //       siteElements.section.findIndex(
    //         (element) => element.contactForm != null
    //       )
    //     ]
    //   ),
    //   script
    // );
  }

  function buildForm(): HTMLElement {
    const form: HTMLElement = document.createElement('form');

    console.log('form:', form);
    return form;
  }

  function buildHeader(headerElements: Header): HTMLElement {
    const header: HTMLElement = document.createElement('header');

    const pageTitle: HTMLHeadingElement = document.createElement('h1');
    pageTitle.innerText = headerElements.title;
    const subTitle: HTMLHeadingElement = document.createElement('h2');
    subTitle.innerText = headerElements.subtitle;

    header.appendChild(pageTitle);
    header.appendChild(subTitle);

    return header;
  }

  function buildSection(sectionElements: Section[]): HTMLElement {
    const section: HTMLElement = document.createElement('section');

    sectionElements.forEach((sectionElement) => {
      if (sectionElement.display) {
        const title: HTMLHeadingElement = document.createElement('h3');
        title.innerText = sectionElement.name;
        section.appendChild(title);

        if (sectionElement.text) {
          const content: HTMLParagraphElement = document.createElement('p');
          content.innerText = sectionElement.text;
          section.appendChild(content);
        }

        if (sectionElement.projectList) {
          section.appendChild(buildProjects(sectionElement.projectList));
        }
        if (sectionElement.contactForm) {
          section.appendChild(buildForm());
        }
      }
    });

    return section;
  }

  function buildProjects(projects: Project[]): HTMLElement {
    const container: HTMLDivElement = document.createElement('div');
    container.id = 'projectList';
    projects.forEach((project) => {
      const card: HTMLDivElement = document.createElement('div');
      card.classList.add('projectCard');

      const projectTitle: HTMLHeadElement = document.createElement('h3');
      projectTitle.innerText = `${project.title}`;
      card.appendChild(projectTitle);

      const quickDescription: HTMLDivElement = document.createElement('div');
      quickDescription.classList.add('quickDescription');

      const type: HTMLParagraphElement = document.createElement('p');
      type.innerText = `${project.type}`;
      quickDescription.appendChild(type);
      // card.appendChild(type);

      const status: HTMLParagraphElement = document.createElement('p');
      status.innerText = `${project.subtype} - ${project.status}`;
      quickDescription.appendChild(status);
      card.appendChild(quickDescription);

      const view: HTMLImageElement = document.createElement('img');
      view.classList.add('view');
      view.src = 'assets/screen.png';
      card.appendChild(view);

      if (project.technos?.length) {
        const technoList: HTMLDivElement = document.createElement('div');
        project.technos?.forEach((techno) => {
          const logo: HTMLImageElement = document.createElement('img');
          logo.classList.add('logoTechno');
          logo.src = `assets/images/${techno.toLowerCase()}.png`;
          technoList.appendChild(logo);
        });
        card.appendChild(technoList);
      }
      container.appendChild(card);
    });
    return container;
  }

  const callSiteContent = async (): Promise<void> => {
    fetch(`http://127.0.0.1:1234/api`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((datas) => {
        buildPage(datas[0]);
      });
  };

  callSiteContent();
});
