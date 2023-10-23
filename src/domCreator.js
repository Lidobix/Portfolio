export class domCreator {
  constructor() {}

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

  div(classArray = [], text = null) {
    const div = document.createElement('div');
    if (classArray.length) {
      classArray.forEach((style) => {
        div.classList.add(style);
      });
    }

    // const typeChildren = typeof children;
    // switch (typeof children) {
    //   case string:
    // }

    div.innerText = text;

    return div;
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
