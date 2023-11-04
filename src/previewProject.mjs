import siteBuilder from './site.mjs';
import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

export class PreviewProject {
  constructor() {
    this.project;
    this.body = siteBuilder.body;
    this.background;
    this.imageIndex;
    this.leftArrow;
    this.rightArrow;
    this.image;
  }

  open(project) {
    this.project = project;
    this.imageIndex = 0;
    this.build();
  }

  build() {
    this.background = DomCreator.createNode('div', ['previewBackground'], {
      id: 'preview',
    });

    this.updateBackgroundCss();

    const previewWindow = DomCreator.createNode('div', ['previewWindow']);

    const titleContainer = DomCreator.createNode('div');
    const title = DomCreator.createNode('h2', [], {
      innerText: this.project.name,
    });
    const summary = DomCreator.createNode('div', ['previewSummary']);

    const descriptionContainer = DomCreator.createNode('div');

    const description = DomCreator.createNode('p', [], {
      innerText: this.project.description,
    });
    descriptionContainer.appendChild(description);

    titleContainer.appendChild(title);

    DomCreator.appendChilds(summary, [titleContainer, descriptionContainer]);

    const previewContainer = DomCreator.createNode('div', [], {
      id: 'previewContainer',
    });

    this.rightArrow = DomCreator.createNode('div', ['switchPreview'], {
      id: 'previewRightArrow',
    });
    this.leftArrow = DomCreator.createNode('div', ['switchPreview'], {
      id: 'previewLefttArrow',
    });
    this.image = DomCreator.createNode('div', ['previewImage']);

    DomCreator.appendChilds(previewContainer, [
      this.leftArrow,
      this.image,
      this.rightArrow,
    ]);

    DomCreator.appendChilds(previewWindow, [previewContainer, summary]);

    this.background.appendChild(previewWindow);
    this.updateImage();

    this.body.appendChild(this.background);
  }

  updateBackgroundCss() {
    this.background.style.height = window.getComputedStyle(this.body).height;
  }

  updateImage(offset = 0) {
    this.imageIndex = this.imageIndex + offset;

    this.checkImageIndex();
    this.updateArrows();

    this.image.style.backgroundImage = `url(${
      this.project.images[this.imageIndex]
    })`;
  }

  checkImageIndex() {
    if (this.imageIndex < 0) {
      this.imageIndex = 0;
    }
    if (this.imageIndex === this.project.images.length) {
      this.imageIndex = this.project.images.length - 1;
    }
  }

  updateArrows() {
    if (this.project.images.length > 1) {
      if (this.imageIndex === 0) {
        this.leftArrow.style.backgroundImage = ``;
        this.rightArrow.style.backgroundImage = `url(assets/images/right_arrow.png)`;
      }
      if (this.imageIndex > 0 && this.imageIndex < this.project.images.length) {
        this.leftArrow.style.backgroundImage = `url(assets/images/left_arrow.png)`;
        this.rightArrow.style.backgroundImage = `url(assets/images/right_arrow.png)`;
      }
      if (this.imageIndex === this.project.images.length - 1) {
        this.leftArrow.style.backgroundImage = `url(assets/images/left_arrow.png)`;
        this.rightArrow.style.backgroundImage = ``;
      }
    }
  }

  close() {
    document.getElementById('preview').remove();
  }
}
