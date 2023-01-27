console.log('JS lancé');
const bouton: HTMLButtonElement | null = document.querySelector('button');
const projectLis: HTMLElement | null = document.getElementById('projectList');

type Type = 'Projet perso' | "projet d'études";
type Status = 'Fini' | 'En cours' | 'Stand-By';
type Techno =
  | 'HTML'
  | 'CSS'
  | 'JS'
  | 'TypeScript'
  | 'WebSocket'
  | 'Angular'
  | 'React'
  | 'NODE JS';

type Project = {
  title: string;
  type: Type;
  status: Status;
  description: string;
  techno1: Techno;
  techno2: Techno;
  techno3: Techno;
  image: string;
  link: string;
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

      // console.log(formattedResult);

      allProjects.forEach((e) => {
        console.log(e);
      });
      //   allProjects.forEach((project) => {
      // console.log(project);
      //pour chaque projet insérer une div dans la div globale et la remplir du titre ...
      //   });
    });
};

bouton?.addEventListener('click', callProjects);
