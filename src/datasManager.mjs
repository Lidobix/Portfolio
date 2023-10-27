class DatasManager {
  constructor() {}

  async fetchElements() {
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
        this.header = datas[0].header;
        this.section = datas[0].section;
        this.modal = datas[0].modal;
        this.name = datas[0].name;
        this.nav = datas[0].nav;
      });
  }
}
const datasManager = new DatasManager();
export default datasManager;
