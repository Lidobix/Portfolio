// import siteBuilder from './site.mjs';
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

    // const titleContainer = DomCreator.createNode('div');

    const title = DomCreator.createNode('h2', [], {
      innerText: this.project.name,
    });
    const summary = DomCreator.createNode('div', ['previewSummary']);

    // const descriptionContainer = DomCreator.createNode('div');

    const description = DomCreator.createNode('p', [], {
      innerText: this.project.description,
    });
    // descriptionContainer.appendChild(description);

    // titleContainer.appendChild(title);

    // DomCreator.appendChilds(summary, [titleContainer, descriptionContainer]);
    DomCreator.appendChilds(summary, [title, description]);

    const previewContainer = DomCreator.createNode('div', [], {
      id: 'previewContainer',
    });

    this.rightArrow = DomCreator.createNode(
      'img',
      [
        'switchPreview',
        // 'bg_image'
      ],
      {
        id: 'previewRightArrow',
      }
    );
    this.leftArrow = DomCreator.createNode(
      'img',
      [
        'switchPreview',
        //  'bg_image'
      ],
      {
        id: 'previewLefttArrow',
      }
    );

    // this.rightArrow = DomCreator.createNode(
    //   'div',
    //   ['switchPreview', 'bg_image'],
    //   {
    //     id: 'previewRightArrow',
    //   }
    // );
    // this.leftArrow = DomCreator.createNode(
    //   'div',
    //   ['switchPreview', 'bg_image'],
    //   {
    //     id: 'previewLefttArrow',
    //   }
    // );

    // this.image = DomCreator.createNode('div', ['previewImage', 'bg_image']);
    // const imageContainer = DomCreator.createNode('div', [
    //   'previewImage',
    //   'bg_image',
    // ]);
    // this.image = DomCreator.createNode('img', [], {});
    this.image = new Image();
    // this.image.style.width = 'inherit';
    // this.image.style.maxHeight = '300px';

    this.image.style.objectFit = 'contain';
    this.image.style.objectPosition = 'center';
    this.image.style.display = 'flex';
    this.image.style.flex = '1';
    this.image.style.width = '80%';
    // this.image.style.maxHeight = '-webkit-fill-available';
    // this.image.style.maxHeight = '30vh';
    console.log(this.image);
    // imageContainer.appendChild(this.image);
    // imageContainer.style.width = '100%';

    // width: 100%;
    // object-fit: contain;
    /* object-position: center center; */
    // max-height: -webkit-fill-available;

    // width: 100%;

    // object-fit: cover;
    // object-position: center;

    DomCreator.appendChilds(previewContainer, [
      this.leftArrow,
      this.image,
      // imageContainer,
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
    // this.image.src = this.project.images[this.imageIndex];
    // this.image.style.backgroundImage = `url(${
    //   this.project.images[this.imageIndex]
    // })`;
    this.image.src = this.project.images[this.imageIndex];
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
        this.leftArrow.src = ``;
        this.rightArrow.src = `assets/images/right_arrow.png`;
      }
      if (this.imageIndex > 0 && this.imageIndex < this.project.images.length) {
        this.leftArrow.src = `assets/images/left_arrow.png`;
        this.rightArrow.src = `assets/images/right_arrow.png`;
      }
      if (this.imageIndex === this.project.images.length - 1) {
        this.leftArrow.src = `assets/images/left_arrow.png`;
        this.rightArrow.src = ``;
      }
    }

    // if (this.project.images.length > 1) {
    //   if (this.imageIndex === 0) {
    //     this.leftArrow.style.backgroundImage = ``;
    //     this.rightArrow.style.backgroundImage = `url(assets/images/right_arrow.png)`;
    //   }
    //   if (this.imageIndex > 0 && this.imageIndex < this.project.images.length) {
    //     this.leftArrow.style.backgroundImage = `url(assets/images/left_arrow.png)`;
    //     this.rightArrow.style.backgroundImage = `url(assets/images/right_arrow.png)`;
    //   }
    //   if (this.imageIndex === this.project.images.length - 1) {
    //     this.leftArrow.style.backgroundImage = `url(assets/images/left_arrow.png)`;
    //     this.rightArrow.style.backgroundImage = ``;
    //   }
    // }
  }

  close() {
    document.getElementById('preview').remove();
  }
}
