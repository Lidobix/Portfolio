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

  a(href, text = null, id = null, classArray = []) {
    const a = document.createElement('a');
    a.href = href;
    a.innerText = text;
    a.id = id;
    if (classArray.length) {
      classArray.forEach((style) => {
        a.classList.add(style);
      });
    }
    return a;
  }

  div(classArray = [], text = null, id = null) {
    const div = document.createElement('div');
    if (classArray.length) {
      classArray.forEach((style) => {
        div.classList.add(style);
      });
    }
    div.innerText = text ?? text;
    div.id = id ?? id;
    return div;
  }

  form(id, html, method) {
    const form = document.createElement('form');
    form.id = id;
    form.innerHTML = html;
    form.method = method;
    return form;
  }

  hX(hType, text) {
    const hX = document.createElement('h' + hType);
    hX.innerText = text;
    return hX;
  }

  img(src) {
    const img = document.createElement('img');
    img.src = src;
    return img;
  }

  p(text) {
    const p = document.createElement('p');
    p.innerText = text;
    return p;
  }

  button(text) {
    const button = document.createElement('button');
    button.innerText = text;
    return button;
  }

  appendChilds(parent, childs = []) {
    if (childs.length) {
      childs.forEach((child) => {
        parent.appendChild(child);
      });
    }
  }
}
