export class domCreator {
  constructor() {}

  createNodeAppended(type, classArray = [], attributes = {}, parent) {
    const node = document.createElement(type);

    if (classArray.length) {
      classArray.forEach((style) => {
        node.classList.add(style);
      });
    }

    const attributesArray = Object.entries(attributes);
    attributesArray.forEach((attribute) => {
      node[attribute[0]] = attribute[1];
    });
    parent.appendChild(node);
  }

  createNode(type, classArray = [], attributes = {}) {
    const node = document.createElement(type);

    if (classArray.length) {
      classArray.forEach((style) => {
        node.classList.add(style);
      });
    }

    const attributesArray = Object.entries(attributes);
    attributesArray.forEach((attribute) => {
      node[attribute[0]] = attribute[1];
    });

    return node;
  }

  appendChilds(parent, childs = []) {
    if (childs.length) {
      childs.forEach((child) => {
        parent.appendChild(child);
      });
    }
  }
}
