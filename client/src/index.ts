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
    // type?: 'project';
    type: string;
    subtype: ProjectSubtype;
    status: Status;
    description: string;
    technos?: Techno[];
    image?: string;
    link?: string;
    display: boolean;
  };

  // type FormField = {
  //   name: string;
  //   input: string;
  //   type: string;
  //   label: string;
  // };

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

  function buildForm(htmlForm: string): HTMLElement {
    const form: HTMLFormElement = document.createElement('form');
    form.innerHTML = htmlForm;
    form.method = 'POST';

    // formElements.forEach((element) => {
    // const card: HTMLElement = document.createElement('div');
    // const label: HTMLLabelElement = document.createElement('label');
    // label.htmlFor = element.name;
    // label.innerText = element.label;
    // const input: HTMLInputElement = document.createElement(element.input);
    // input.type = element.type;
    // input.name = element.name;
    // input.required = true;

    // card.appendChild(label);
    // card.appendChild(input);
    // form.appendChild();
    // });

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
        if (sectionElement.htmlForm) {
          section.appendChild(buildForm(sectionElement.htmlForm));
        }
      }
    });

    return section;
  }

  function buildProjects(projects: Project[]): HTMLElement {
    const container: HTMLDivElement = document.createElement('div');
    container.id = 'projectList';
    projects.forEach((project) => {
      if (project.display) {
        const card: HTMLDivElement = document.createElement('div');
        card.classList.add('projectCard');

        const titleContainer: HTMLElement = document.createElement('div');
        titleContainer.classList.add('projectTitleContainer');
        const projectTitle: HTMLHeadElement = document.createElement('h4');
        projectTitle.innerText = `${project.title}`;
        titleContainer.appendChild(projectTitle);
        card.appendChild(titleContainer);

        const quickDescription: HTMLDivElement = document.createElement('div');
        quickDescription.classList.add('quickDescription');

        const type: HTMLParagraphElement = document.createElement('p');
        type.innerText = `${project.type}`;
        quickDescription.appendChild(type);
        // card.appendChild(type);

        const status: HTMLParagraphElement = document.createElement('p');
        status.innerText = `${project.subtype} - ${project.status}`;
        quickDescription.appendChild(status);
        // card.appendChild(status);
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
