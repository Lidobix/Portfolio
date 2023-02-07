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
    console.log('JS lancé');
    const script = document.querySelector('script');
    const body = document.querySelector('body');
    // type FormField = {
    //   name: string;
    //   input: string;
    //   type: string;
    //   label: string;
    // };
    console.log('lancement fetch');
    ///////////// COUCOU SERVEUR /////////////////////////
    fetch(`http://127.0.0.1:1234/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((r) => {
        return r.json();
    })
        .then((r) => {
        console.log(r);
    });
    ///////////////////////////////////////////
    function buildPage(siteElements) {
        body === null || body === void 0 ? void 0 : body.insertBefore(buildHeader(siteElements.header), script);
        body === null || body === void 0 ? void 0 : body.insertBefore(buildSection(siteElements.section), script);
        // body?.insertBefore(
        //   buildForm(
        //     siteElements.section[
        //       siteElements.section.findIndex(
        //         (element) => element.contactForm != null
        //       )
        //     ]
        //   ),
        //   script
        // );
    }
    function buildForm(htmlForm) {
        const form = document.createElement('form');
        form.innerHTML = htmlForm;
        form.method = 'POST';
        // formElements.forEach((element) => {
        // const card: HTMLElement = document.createElement('div');
        // const label: HTMLLabelElement = document.createElement('label');
        // label.htmlFor = element.name;
        // label.innerText = element.label;
        // const input: HTMLInputElement = document.createElement(element.input);
        // input.type = element.type;
        // input.name = element.name;
        // input.required = true;
        // card.appendChild(label);
        // card.appendChild(input);
        // form.appendChild();
        // });
        return form;
    }
    function buildHeader(headerElements) {
        const header = document.createElement('header');
        const pageTitle = document.createElement('h1');
        pageTitle.innerText = headerElements.title;
        const subTitle = document.createElement('h2');
        subTitle.innerText = headerElements.subtitle;
        header.appendChild(pageTitle);
        header.appendChild(subTitle);
        return header;
    }
    function buildSection(sectionElements) {
        const section = document.createElement('section');
        sectionElements.forEach((sectionElement) => {
            if (sectionElement.display) {
                const title = document.createElement('h3');
                title.innerText = sectionElement.name;
                section.appendChild(title);
                if (sectionElement.text) {
                    const content = document.createElement('p');
                    content.innerText = sectionElement.text;
                    section.appendChild(content);
                }
                if (sectionElement.projectList) {
                    section.appendChild(buildProjects(sectionElement.projectList));
                }
                if (sectionElement.htmlForm) {
                    section.appendChild(buildForm(sectionElement.htmlForm));
                }
            }
        });
        return section;
    }
    function buildProjects(projects) {
        const container = document.createElement('div');
        container.id = 'projectList';
        projects.forEach((project) => {
            var _a, _b;
            if (project.display) {
                const card = document.createElement('div');
                card.classList.add('projectCard');
                const projectTitle = document.createElement('h4');
                projectTitle.innerText = `${project.title}`;
                card.appendChild(projectTitle);
                const quickDescription = document.createElement('div');
                quickDescription.classList.add('quickDescription');
                const type = document.createElement('p');
                type.innerText = `${project.type}`;
                quickDescription.appendChild(type);
                // card.appendChild(type);
                const status = document.createElement('p');
                status.innerText = `${project.subtype} - ${project.status}`;
                quickDescription.appendChild(status);
                // card.appendChild(status);
                card.appendChild(quickDescription);
                const view = document.createElement('img');
                view.classList.add('projectView');
                view.src = 'assets/screen.png';
                card.appendChild(view);
                if ((_a = project.technos) === null || _a === void 0 ? void 0 : _a.length) {
                    const technoList = document.createElement('div');
                    technoList.classList.add('technoList');
                    (_b = project.technos) === null || _b === void 0 ? void 0 : _b.forEach((techno) => {
                        const logo = document.createElement('img');
                        logo.classList.add('logoTechno');
                        logo.src = `assets/images/${techno.toLowerCase()}.png`;
                        technoList.appendChild(logo);
                    });
                    card.appendChild(technoList);
                }
                container.appendChild(card);
            }
        });
        return container;
    }
    const callSiteContent = () => __awaiter(this, void 0, void 0, function* () {
        fetch(`http://127.0.0.1:1234/api`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((result) => {
            return result.json();
        })
            .then((datas) => {
            buildPage(datas[0]);
        });
    });
    callSiteContent();
});
