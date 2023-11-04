import siteBuilder from './site.mjs';
import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

export class PreviewProject {
  constructor() {
    this.project;
    this.body = siteBuilder.body;
    this.previewBackground;
    this.imageIndex;
    this.previewLeftArrow;
    this.previewRightArrow;
    this.previewImage;
  }

  open(project) {
    this.project = project;
    this.imageIndex = 0;
    this.build();
  }

  build() {
    this.previewBackground = DomCreator.createNode(
      'div',
      ['previewBackground'],
      { id: 'preview' }
    );

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

    this.previewRightArrow = DomCreator.createNode('div', ['switchPreview'], {
      id: 'previewRightArrow',
    });
    this.previewLeftArrow = DomCreator.createNode('div', ['switchPreview'], {
      id: 'previewLefttArrow',
    });
    this.previewImage = DomCreator.createNode('div', ['previewImage']);

    DomCreator.appendChilds(previewContainer, [
      this.previewLeftArrow,
      this.previewImage,
      this.previewRightArrow,
    ]);

    DomCreator.appendChilds(previewWindow, [previewContainer, summary]);

    this.previewBackground.appendChild(previewWindow);
    this.updateImage();

    this.body.appendChild(this.previewBackground);
  }

  updateBackgroundCss() {
    this.previewBackground.style.height = window.getComputedStyle(
      this.body
    ).height;
  }

  updateImage(offset = 0) {
    this.imageIndex = this.imageIndex + offset;

    if (this.imageIndex < 0) {
      this.imageIndex = 0;
    }
    if (this.imageIndex === this.project.images.length) {
      this.imageIndex = this.project.images.length - 1;
    }

    if (this.project.images.length > 1) {
      if (this.imageIndex === 0) {
        this.previewLeftArrow.style.backgroundImage = ``;
        this.previewRightArrow.style.backgroundImage = `url(assets/images/right_arrow.png)`;
      }
      if (this.imageIndex > 0 && this.imageIndex < this.project.images.length) {
        this.previewLeftArrow.style.backgroundImage = `url(assets/images/left_arrow.png)`;
        this.previewRightArrow.style.backgroundImage = `url(assets/images/right_arrow.png)`;
      }
      if (this.imageIndex === this.project.images.length - 1) {
        this.previewLeftArrow.style.backgroundImage = `url(assets/images/left_arrow.png)`;
        this.previewRightArrow.style.backgroundImage = ``;
      }
    }
    this.previewImage.style.backgroundImage = `url(${
      this.project.images[this.imageIndex]
    })`;
  }

  close() {
    document.getElementById('preview').remove();
  }
}
