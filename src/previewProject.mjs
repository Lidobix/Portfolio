import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

export class PreviewProject {
  constructor() {
    this.project;
    this.body = document.querySelector('body');
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
    this.background = DomCreator.createNode(
      'div',
      ['previewBackground', 'transition100'],
      {
        id: 'preview',
      }
    );

    this.updateBackgroundCss();

    const previewWindow = DomCreator.createNode('div', ['previewWindow']);

    const closingCross = DomCreator.createNode(
      'div',
      ['closingCross', 'bg_image'],
      {}
    );
    closingCross.style.backgroundImage = `url(assets/images/cross.png)`;

    const title = DomCreator.createNode('h2', [], {
      innerText: this.project.name,
    });
    const summary = DomCreator.createNode('div', ['previewSummary']);

    const description = DomCreator.createNode('p', [], {
      innerText: this.project.description,
    });

    DomCreator.appendChilds(summary, [title, description]);

    const previewContainer = DomCreator.createNode('div', [], {
      id: 'previewContainer',
    });

    this.rightArrow = DomCreator.createNode(
      'div',
      ['switchPreview', 'bg_image'],
      {
        id: 'previewRightArrow',
      }
    );
    this.leftArrow = DomCreator.createNode(
      'div',
      ['switchPreview', 'bg_image'],
      {
        id: 'previewLefttArrow',
      }
    );

    this.image = DomCreator.createNode('div', ['previewImage', 'bg_image']);

    DomCreator.appendChilds(previewContainer, [
      this.leftArrow,
      this.image,
      this.rightArrow,
    ]);

    DomCreator.appendChilds(previewWindow, [
      previewContainer,
      summary,
      closingCross,
    ]);

    this.background.appendChild(previewWindow);
    this.updateImage();
    this.body.appendChild(this.background);

    setTimeout(() => {
      this.background.style.opacity = 1;
    }, 0);
  }

  updateBackgroundCss() {
    this.background.style.height = window.getComputedStyle(this.body).height;
  }

  updateImage(offset = 0) {
    this.imageIndex = this.imageIndex + offset;

    this.checkImageIndex();
    this.updateArrows();
    const _this = this;

    this.image.style.backgroundImage = `url(${
      this.project.images[this.imageIndex]
    })`;

    this.image.onload = function () {
      if (this.width > this.height) {
        _this.image.classList.add('landscape');
      } else {
        _this.image.classList.add('portrait');
      }
    };
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
