class DatasManager {
  constructor() {}

  async fetchElements() {
    // return fetch('https://lidobix.alwaysdata.net/portfolio/home', {
    return fetch('http://localhost:3000/portfolio/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        if (result.status === 400) {
          throw new Error();
        }
        return result.json();
      })
      .then((datas) => {
        this.header = datas[0].structure.header;
        this.section = datas[0].structure.section;
        this.modal = datas[0].modal;
        this.name = datas[0].name;
        this.nav = datas[0].structure.nav;
        this.projects = datas[0].projects;
        this.stack = datas[0].stack;
        this.socials = datas[0].socials;
      })
      .catch((e) => {
        alert('Un problème est survenu à la récupération des données');
        console.error(e);
      });
  }
}
const datasManager = new DatasManager();
export default datasManager;
