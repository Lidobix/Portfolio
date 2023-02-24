"use strict";
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
        buildSite: function () {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                yield this.fetchElements();
                (_a = this.body) === null || _a === void 0 ? void 0 : _a.insertBefore(this.buildHeader(this.siteElements.header), this.script);
                if (document.querySelector('header')) {
                    // document
                    //   .querySelector('header')
                    //   ?.appendChild(this.buildNav(this.siteElements.nav));
                    (_b = document.querySelector('header')) === null || _b === void 0 ? void 0 : _b.appendChild(this.buildNavToggle());
                }
                // const headerWrapper: HTMLDivElement = document.createElement('div');
                // headerWrapper.id = 'headerWrapper';
                // headerWrapper.appendChild(this.buildHeader(this.siteElements.header));
                // this.body?.insertBefore(headerWrapper, this.script);
                (_c = this.body) === null || _c === void 0 ? void 0 : _c.insertBefore(this.buildSection(this, this.siteElements.section), this.script);
                (_d = this.body) === null || _d === void 0 ? void 0 : _d.insertBefore(this.buildNav(this.siteElements.nav), this.script);
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
            navToggle.classList.add('navToggle');
            for (let i = 0; i < 3; i++) {
                const bullet = document.createElement('div');
                navToggle.appendChild(bullet);
            }
            return navToggle;
        },
        buildForm: (htmlForm) => {
            const form = document.createElement('form');
            form.classList.add('card');
            form.innerHTML = htmlForm;
            form.method = 'POST';
            return form;
        },
        buildProjects: (projects) => {
            const container = document.createElement('div');
            container.id = 'projectList';
            projects.forEach((project) => {
                var _a, _b;
                if (project.display) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    const titleContainer = document.createElement('div');
                    titleContainer.classList.add('projectTitleContainer');
                    const projectTitle = document.createElement('h4');
                    projectTitle.innerText = `${project.title}`;
                    titleContainer.appendChild(projectTitle);
                    card.appendChild(titleContainer);
                    const quickDescription = document.createElement('div');
                    quickDescription.classList.add('quickDescription');
                    const type = document.createElement('p');
                    type.innerText = `${project.type}`;
                    quickDescription.appendChild(type);
                    const status = document.createElement('p');
                    status.innerText = `${project.subtype} (${project.status})`;
                    quickDescription.appendChild(status);
                    card.appendChild(quickDescription);
                    if (project.image) {
                        const view = document.createElement('img');
                        view.classList.add('projectView');
                        view.src = project.image;
                        card.appendChild(view);
                    }
                    if ((_a = project.technos) === null || _a === void 0 ? void 0 : _a.length) {
                        const technoList = document.createElement('div');
                        technoList.classList.add('technoList');
                        (_b = project.technos) === null || _b === void 0 ? void 0 : _b.forEach((techno) => {
                            const div = document.createElement('div');
                            const logo = document.createElement('img');
                            div.classList.add('logoTechno');
                            logo.src = `assets/images/${techno.toLowerCase()}.png`;
                            div.appendChild(logo);
                            technoList.appendChild(div);
                        });
                        card.appendChild(technoList);
                    }
                    container.appendChild(card);
                }
            });
            return container;
        },
        fetchElements: () => {
            return fetch(`http://127.0.0.1:1234/api`, {
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
