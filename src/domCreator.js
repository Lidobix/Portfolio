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

  divText(text, style) {
    const div = document.createElement('div');
    div.innerText = text;
    div.classList.add(style);
  }
}
