export class domCreator {
  constructor() {}

  a(href, text = null) {
    const a = document.createElement('a');
    a.href = href;
    a.innerText = text ?? text;
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

  h1(text) {
    const h1 = document.createElement('h1');
    h1.innerText = text;
    return h1;
  }

  h2(text) {
    const h2 = document.createElement('h2');
    h2.innerText = text;
    return h2;
  }

  h3(text) {
    const h3 = document.createElement('h3');
    h3.innerText = text;
    return h3;
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
