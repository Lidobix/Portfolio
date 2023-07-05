var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener('DOMContentLoaded', function () {
    const site = {
        body: document.querySelector('body'),
        projectPreview: false,
        sectionPaddingRight: 0,
        headerPaddingRight: 0,
        navToggleRight: 0,
        lastVerticalScrollY: 0,
        lastHorizontalScrollY: 0,
        previewBackgroundDiv: {},
        header: {},
        section: {},
        navToggle: {},
        script: document.querySelector('script'),
        siteElements: {},
        navToggled: false,
        buildSite: function () {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                yield this.fetchElements();
                this.body.insertBefore(this.buildHeader(this.siteElements.header), this.script);
                this.header = document.querySelector('header');
                this.body.insertBefore(this.buildSection(this, this.siteElements.section), this.script);
                this.section = document.querySelector('section');
                document
                    .querySelector('header')
                    .appendChild(this.buildNav(this.siteElements.nav));
                if (document.querySelector('header')) {
                    (_a = document.querySelector('header')) === null || _a === void 0 ? void 0 : _a.appendChild(this.buildNavToggle());
                    this.navToggle = document.getElementById('navToggle');
                }
                document.addEventListener('click', (e) => {
                    const nav = document.querySelector('nav');
                    const targetEvent = e.target;
                    if (targetEvent.classList.contains('navTrigger') && !this.navToggled) {
                        nav.style.transform = 'translate(-15rem)';
                        this.navToggled = true;
                    }
                    else {
                        nav.style.transform = 'translate(15rem)';
                        this.navToggled = false;
                    }
                    if (this.projectPreview) {
                        this.closePreview(this);
                    }
                });
                document.addEventListener('keydown', (e) => {
                    if (e.code === 'Escape' && this.projectPreview) {
                        this.closePreview(this);
                    }
                });
                window.addEventListener('orientationchange', () => {
                    if (window.orientation === 0) {
                        // Appareil en position portrait
                        this.lastHorizontalScrollY = window.scrollY;
                        setTimeout(() => {
                            window.scroll(0, this.lastVerticalScrollY);
                            this.previewBackgroundDiv.style.top =
                                this.lastVerticalScrollY + 'px';
                            this.previewBackgroundDiv.style.height = window.innerHeight + 'px';
                        }, 100);
                    }
                    else if (window.orientation === 90 || window.orientation === -90) {
                        // Appareil en position paysage
                        this.lastVerticalScrollY = window.scrollY;
                        setTimeout(() => {
                            window.scroll(0, this.lastHorizontalScrollY);
                            this.previewBackgroundDiv.style.top =
                                this.lastHorizontalScrollY + 'px';
                            this.previewBackgroundDiv.style.height = window.innerHeight + 'px';
                        }, 100);
                    }
                });
                (_b = document
                    .querySelector('form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    const form = event.target;
                    const formData = new FormData(form);
                    const searchParams = new URLSearchParams(formData);
                    // await fetch('http://localhost:3000/portfolio/contact', {
                    yield fetch('https://lidobix.alwaysdata.net/portfolio/contact', {
                        method: 'POST',
                        body: searchParams.toString(),
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }),
                    })
                        .then((r) => {
                        this.buildFormModal(this, this.siteElements.modal.success.title, this.siteElements.modal.success.message);
                        form.reset();
                    })
                        .catch((e) => {
                        this.buildFormModal(this, this.siteElements.modal.error.title, this.siteElements.modal.error.message);
                    });
                }));
            });
        },
        buildFormModal: (levelUp, title, message) => {
            const modalContainer = document.createElement('div');
            const titleContainer = document.createElement('div');
            const messageContainer = document.createElement('div');
            const text = document.createElement('p');
            const closeButton = document.createElement('button');
            titleContainer.innerText = title;
            text.innerText = message;
            closeButton.innerText = 'FERMER';
            modalContainer.classList.add('modalContainer');
            titleContainer.classList.add('modalTitleContainer');
            messageContainer.classList.add('modalMessageContainer');
            messageContainer.appendChild(text);
            messageContainer.appendChild(closeButton);
            modalContainer.appendChild(titleContainer);
            modalContainer.appendChild(messageContainer);
            levelUp.body.appendChild(modalContainer);
            closeButton.addEventListener('click', () => {
                modalContainer.remove();
            });
        },
        closePreview: (levelUp) => {
            var _a;
            (_a = document.getElementById('preview')) === null || _a === void 0 ? void 0 : _a.remove();
            levelUp.projectPreview = false;
            levelUp.section.style.paddingRight = levelUp.sectionPaddingRight + 'px';
            levelUp.header.style.paddingRight = levelUp.headerPaddingRight + 'px';
            levelUp.navToggle.style.right = levelUp.navToggleRight + 'px';
            levelUp.body.classList.remove('notScrollable');
        },
        buildHeader: (headerElements) => {
            const header = document.createElement('header');
            const pageTitle = document.createElement('h1');
            pageTitle.innerText = headerElements.title;
            const subTitle = document.createElement('h2');
            subTitle.innerText = headerElements.subtitle;
            header.appendChild(pageTitle);
            header.appendChild(subTitle);
            if (headerElements.socials.length) {
                const socialContainer = document.createElement('div');
                socialContainer.classList.add('socialContainer');
                headerElements.socials.forEach((element) => {
                    const a = document.createElement('a');
                    a.href = element.url;
                    const picto = document.createElement('img');
                    picto.src = element.picto;
                    a.appendChild(picto);
                    socialContainer.appendChild(a);
                });
                header.appendChild(socialContainer);
            }
            return header;
        },
        buildSection: (levelUp, sectionElements) => {
            const section = document.createElement('section');
            sectionElements.forEach((sectionElement) => {
                if (sectionElement.display) {
                    const title = document.createElement('h3');
                    title.innerText = sectionElement.name;
                    const anchorCalc = sectionElement.name
                        .toLowerCase()
                        .split(' ')
                        .sort((a, b) => b.length - a.length)[0];
                    title.id = anchorCalc;
                    levelUp.siteElements.nav.push({
                        name: sectionElement.name,
                        anchor: `#${anchorCalc}`,
                    });
                    section.appendChild(title);
                    if (sectionElement.text) {
                        const content = document.createElement('p');
                        content.innerText = sectionElement.text;
                        section.appendChild(content);
                    }
                    if (sectionElement.illustrations &&
                        sectionElement.illustrations.length !== 0) {
                        const imagesContainer = document.createElement('div');
                        imagesContainer.classList.add('imagesContainer');
                        sectionElement.illustrations.forEach((imageUrl) => {
                            const image = document.createElement('img');
                            image.src = imageUrl;
                            imagesContainer.appendChild(image);
                        });
                        section.appendChild(imagesContainer);
                    }
                    if (sectionElement.projectList) {
                        section.appendChild(levelUp.buildProjects(sectionElement.projectList, levelUp));
                    }
                    if (sectionElement.htmlForm) {
                        section.appendChild(levelUp.buildForm(sectionElement.htmlForm));
                    }
                }
            });
            return section;
        },
        buildNav: (navElements) => {
            const ul = document.createElement('ul');
            const nav = document.createElement('nav');
            navElements.forEach((element) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = element.anchor;
                a.innerText = element.name;
                li.appendChild(a);
                ul.appendChild(li);
                nav.appendChild(ul);
            });
            return nav;
        },
        buildNavToggle: () => {
            const navToggle = document.createElement('div');
            navToggle.id = 'navToggle';
            navToggle.classList.add('mobile', 'navTrigger');
            for (let i = 0; i < 3; i++) {
                const bullet = document.createElement('div');
                bullet.classList.add('navTrigger');
                navToggle.appendChild(bullet);
            }
            return navToggle;
        },
        buildForm: (htmlForm) => {
            const form = document.createElement('form');
            form.id = 'formulaire';
            form.innerHTML = htmlForm;
            form.method = 'POST';
            const formContainer = document.createElement('div');
            formContainer.classList.add('formContainer');
            formContainer.appendChild(form);
            return formContainer;
        },
        buildProjects: (projects, levelUp) => {
            const container = document.createElement('div');
            container.id = 'projectList';
            projects.forEach((project) => {
                var _a, _b;
                if (project.display) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    if (project.image) {
                        const figure = document.createElement('figure');
                        const view = document.createElement('img');
                        view.src = project.image;
                        figure.appendChild(view);
                        card.appendChild(figure);
                    }
                    const description = document.createElement('div');
                    description.classList.add('cardDescription');
                    const projectTitle = document.createElement('h4');
                    projectTitle.innerText = `${project.title}`;
                    description.appendChild(projectTitle);
                    const type = document.createElement('p');
                    type.innerText = `${project.type}`;
                    description.appendChild(type);
                    const aHref = document.createElement('a');
                    aHref.innerText = 'Visiter';
                    aHref.id = 'projectLink';
                    description.appendChild(aHref);
                    if (project.link) {
                        aHref.href = project.link;
                        aHref.classList.add('enabledLink');
                    }
                    else {
                        aHref.classList.add('disabledLink');
                    }
                    const summary = document.createElement('p');
                    summary.innerText = `${project.description}`;
                    description.appendChild(summary);
                    if ((_a = project.technos) === null || _a === void 0 ? void 0 : _a.length) {
                        const technoListContainer = document.createElement('div');
                        technoListContainer.classList.add('technoListContainer');
                        const technoList = document.createElement('div');
                        technoList.classList.add('technoList');
                        (_b = project.technos) === null || _b === void 0 ? void 0 : _b.forEach((techno) => {
                            const logo = document.createElement('img');
                            logo.src = `assets/images/${techno.toLowerCase()}.png`;
                            technoList.appendChild(logo);
                        });
                        technoListContainer.appendChild(technoList);
                        description.appendChild(technoListContainer);
                        card.appendChild(description);
                    }
                    levelUp.buildCardEvents(card, project, levelUp);
                    container.appendChild(card);
                }
            });
            return container;
        },
        buildCardEvents: (card, project, levelUp) => {
            card.addEventListener('click', (e) => {
                const targetEvent = e.target;
                if (!targetEvent.classList.contains('enabledLink')) {
                    this.setTimeout(() => {
                        levelUp.projectPreview = true;
                    }, 300);
                    const previewBackground = document.createElement('div');
                    previewBackground.id = 'preview';
                    previewBackground.classList.add('previewBackground');
                    previewBackground.style.top = window.scrollY + 'px';
                    previewBackground.style.height = window.innerHeight + 'px';
                    levelUp.previewBackgroundDiv = previewBackground;
                    const bodyStyle = window.getComputedStyle(levelUp.body);
                    const scrollBarWidth = this.window.innerWidth - parseInt(bodyStyle.width);
                    levelUp.sectionPaddingRight = parseInt(this.window.getComputedStyle(document.querySelector('section'))
                        .paddingRight);
                    levelUp.headerPaddingRight = parseInt(this.window.getComputedStyle(document.querySelector('header'))
                        .paddingRight);
                    levelUp.navToggleRight = parseInt(this.window.getComputedStyle(document.getElementById('navToggle'))
                        .right);
                    levelUp.section.style.paddingRight =
                        levelUp.sectionPaddingRight + scrollBarWidth + 'px';
                    levelUp.header.style.paddingRight =
                        levelUp.headerPaddingRight + scrollBarWidth + 'px';
                    levelUp.navToggle.style.right =
                        levelUp.navToggleRight + scrollBarWidth + 'px';
                    levelUp.body.classList.add('notScrollable');
                    const previewContainer = document.createElement('div');
                    previewContainer.classList.add('previewContainer');
                    const titleContainer = document.createElement('div');
                    const title = document.createElement('h2');
                    title.innerText = project.title;
                    const summary = document.createElement('div');
                    const descriptionContainer = document.createElement('div');
                    const description = document.createElement('p');
                    description.innerText = project.description;
                    descriptionContainer.appendChild(description);
                    summary.classList.add('previewSummary');
                    titleContainer.appendChild(title);
                    summary.appendChild(titleContainer);
                    summary.appendChild(descriptionContainer);
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('previewImage');
                    imageContainer.style.backgroundImage = `url(${project.image})`;
                    previewContainer.appendChild(imageContainer);
                    previewContainer.appendChild(summary);
                    previewBackground.appendChild(previewContainer);
                    levelUp.body.appendChild(previewBackground);
                }
            });
        },
        fetchElements: () => {
            return fetch('https://lidobix.alwaysdata.net/portfolio/home', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((result) => {
                return result.json();
            })
                .then((datas) => {
                site.siteElements = datas[0];
                return datas[0];
            });
        },
    };
    site.buildSite();
});
export {};
