import datasManager from './datasManager.mjs';
import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

export class SiteBuilder {
  constructor() {
    this.header = document.querySelector('header');
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

    // const header = document.querySelector('header');
    const pageTitle = DomCreator.createNode('h1', [], {
      innerText: this.headerDatas.title,
    });

    const subTitle = DomCreator.createNode('h2', [], {
      innerText: this.headerDatas.subtitle,
    });

    DomCreator.appendChilds(this.header, [pageTitle, subTitle]);

    if (this.headerDatas.socials.length) {
      const socialContainer = DomCreator.createNode('div', ['socialContainer']);
      this.headerDatas.socials.forEach((element) => {
        const a = DomCreator.a(element.url);
        const picto = DomCreator.img(element.picto);
        a.appendChild(picto);
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
    this.sectionDatas.forEach((sectionElement) => {
      if (sectionElement.display) {
        this.buildSectionItem(sectionElement);
      }
    });
  }

  buildSectionItem(paragraph) {
    const title = DomCreator.hX(3, paragraph.name);

    const anchorCalc = paragraph.name
      .toLowerCase()
      .split(' ')
      .sort((a, b) => b.length - a.length)[0];
    title.id = anchorCalc;

    this.navItems.push({
      name: paragraph.name,
      anchor: `#${anchorCalc}`,
    });

    this.section.appendChild(title);

    if (paragraph.text) {
      const content = DomCreator.p(paragraph.text);
      this.section.appendChild(content);
    }

    if (paragraph.illustrations && paragraph.illustrations.length !== 0) {
      const imagesContainer = DomCreator.div(['imagesContainer']);

      paragraph.illustrations.forEach((imageUrl) => {
        const image = DomCreator.img(imageUrl);
        imagesContainer.appendChild(image);
      });
      this.section.appendChild(imagesContainer);
    }

    // if (this.sectionDatas.projectList) {
    //   section.appendChild(
    //     this.buildProjects(this.sectionDatas.projectList, this)
    //   );
    // }

    // if (this.sectionDatas.htmlForm) {
    //   section.appendChild(this.buildForm(this.sectionDatas.htmlForm));
    // }}
  }
}
