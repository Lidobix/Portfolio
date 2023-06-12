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
        body: this.document.querySelector('body'),
        script: this.document.querySelector('script'),
        siteElements: {},
        navToggled: false,
        buildSite: function () {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                yield this.fetchElements();
                this.body.insertBefore(this.buildHeader(this.siteElements.header), this.script);
                this.body.insertBefore(this.buildSection(this, this.siteElements.section), this.script);
                document
                    .querySelector('header')
                    .appendChild(this.buildNav(this.siteElements.nav));
                if (document.querySelector('header')) {
                    (_a = document.querySelector('header')) === null || _a === void 0 ? void 0 : _a.appendChild(this.buildNavToggle());
                }
                document.addEventListener('click', (e) => {
                    const nav = document.querySelector('nav');
                    const targetEvent = e.target;
                    const navStyle = window.getComputedStyle(nav);
                    if (targetEvent.classList.contains('navTrigger') && !this.navToggled) {
                        nav.style.left =
                            screen.width - parseFloat(navStyle.width) - 40 - 32 + 'px';
                        this.navToggled = true;
                    }
                    else {
                        nav.style.left = '100%';
                        this.navToggled = false;
                    }
                });
            });
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
                    if (sectionElement.projectList) {
                        section.appendChild(levelUp.buildProjects(sectionElement.projectList));
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
            navToggle.classList.add('mobile');
            for (let i = 0; i < 3; i++) {
                const bullet = document.createElement('div');
                bullet.classList.add('navTrigger');
                navToggle.appendChild(bullet);
            }
            return navToggle;
        },
        buildForm: (htmlForm) => {
            const form = document.createElement('form');
            form.innerHTML = htmlForm;
            form.method = 'POST';
            form.action = 'http://localhost:3000/portfolio/contact';
            const formContainer = document.createElement('div');
            formContainer.classList.add('formContainer');
            formContainer.classList.add('card');
            formContainer.appendChild(form);
            return formContainer;
        },
        buildProjects: (projects) => {
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
                    container.appendChild(card);
                }
            });
            return container;
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
