console.log('JS lancé');
const bouton: HTMLButtonElement | null = document.querySelector('button');
const projectList: HTMLElement | null = document.getElementById('projectList');

type Type = 'Projet perso' | "projet d'études";
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
  title: string;
  type: Type;
  status: Status;
  description: string;
  technos?: Techno[];
  image?: string;
  link?: string;
};

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
const callProjects = async (): Promise<void> => {
  fetch(`http://127.0.0.1:1234/api`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((formattedResult) => {
      const allProjects: Project[] = formattedResult;
      allProjects.forEach((project) => {
        const container: HTMLDivElement = document.createElement('div');

        const title: HTMLHeadElement = document.createElement('h3');
        title.innerText = `${project.title}`;
        container.appendChild(title);

        const status: HTMLParagraphElement = document.createElement('p');
        status.innerText = `${project.type} - ${project.status}`;
        container.appendChild(status);

        const description: HTMLParagraphElement = document.createElement('p');
        description.innerText = `${project.description}`;
        container.appendChild(description);

        if (project.technos?.length) {
          const technoList: HTMLDivElement = document.createElement('div');
          project.technos?.forEach((techno) => {
            const logo: HTMLImageElement = document.createElement('img');
            logo.src = `assets/images/${techno.toLowerCase()}.png`;
            technoList.appendChild(logo);
            console.log(techno);
          });
          container.appendChild(technoList);
        }

        projectList?.appendChild(container);
      });
    });
};

bouton?.addEventListener('click', callProjects);
