import datasManager from './datasManager.mjs';
import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

export class SiteBuilder {
  constructor() {}

  buildHeader() {
    if (datasManager.header !== null) {
      this.headerDatas = datasManager.header;
    } else {
      return;
    }

    const header = document.querySelector('header');
    const pageTitle = DomCreator.createNode('h1', [], {
      innerText: this.headerDatas.title,
    });

    const subTitle = DomCreator.createNode('h2', [], {
      innerText: this.headerDatas.subtitle,
    });

    DomCreator.appendChilds(header, [pageTitle, subTitle]);

    if (this.headerDatas.socials.length) {
      const socialContainer = DomCreator.createNode('div', ['socialContainer']);
      this.headerDatas.socials.forEach((element) => {
        const a = DomCreator.a(element.url);
        const picto = DomCreator.img(element.picto);
        a.appendChild(picto);
        socialContainer.appendChild(a);
      });

      header.appendChild(socialContainer);
    }
  }

  buildSection() {
    if (datasManager.section !== null) {
      this.sectionDatas = datasManager.section;
    } else {
      return;
    }
    const section = document.querySelector('section');
    console.log(this.sectionDatas);
    this.sectionDatas.forEach((sectionElement) => {
      if (sectionElement.display) {
        const title = DomCreator.hX(3, sectionElement.name);

        const anchorCalc = sectionElement.name
          .toLowerCase()
          .split(' ')
          .sort((a, b) => b.length - a.length)[0];
        title.id = anchorCalc;

        this.siteElements.nav.push({
          name: sectionElement.name,
          anchor: `#${anchorCalc}`,
        });
        section.appendChild(title);

        if (sectionElement.text) {
          const content = DomCreator.p(sectionElement.text);
          section.appendChild(content);
        }

        if (
          sectionElement.illustrations &&
          sectionElement.illustrations.length !== 0
        ) {
          const imagesContainer = DomCreator.div(['imagesContainer']);

          sectionElement.illustrations.forEach((imageUrl) => {
            const image = DomCreator.img(imageUrl);
            imagesContainer.appendChild(image);
          });
          section.appendChild(imagesContainer);
        }

        // if (this.sectionDatas.projectList) {
        //   section.appendChild(
        //     this.buildProjects(this.sectionDatas.projectList, this)
        //   );
        // }

        // if (this.sectionDatas.htmlForm) {
        //   section.appendChild(this.buildForm(this.sectionDatas.htmlForm));
        // }
      }
    });
  }
}
