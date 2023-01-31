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
    // let onload: boolean = true;
    const bouton = document.querySelector('button');
    const header = document.querySelector('header');
    const section = document.querySelector('section');
    const body = document.querySelector('body');
    // const section: HTMLElement | null = document.querySelector('section');
    const storyTitle = 'Mon histoire';
    const projectsTitle = 'Mes projets';
    const contactTitle = 'Contact';
    const projectList = document.getElementById('projectList');
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
    // function buildPage(datas: (Element | Project)[]): void {
    //   buildProjects(datas);
    // }
    function buildPage(siteElements) {
        console.log(siteElements);
        // console.log(siteElements);
        // const pageTitle: HTMLHeadingElement = document.createElement('h1');
        // pageTitle.innerText = siteElements.pageTitle;
        // const subTitle: HTMLHeadingElement = document.createElement('h2');
        // subTitle.innerText = siteElements.subTitle;
        // siteElements.pageSections.forEach((paragraphe) => {
        //   const sectionTitle: HTMLHeadingElement = document.createElement('h3');
        // });
        // header?.appendChild(pageTitle);
        // header?.appendChild(subTitle);
    }
    function buildProjects(projects) {
        projects.forEach((project) => {
            var _a, _b;
            const container = document.createElement('div');
            const projectTitle = document.createElement('h3');
            projectTitle.innerText = `${project.title}`;
            container.appendChild(projectTitle);
            const status = document.createElement('p');
            status.innerText = `${project.subtype} - ${project.status}`;
            container.appendChild(status);
            const description = document.createElement('p');
            description.innerText = `${project.description}`;
            container.appendChild(description);
            const view = document.createElement('img');
            view.classList.add('view');
            view.src = 'assets/screen.png';
            container.appendChild(view);
            if ((_a = project.technos) === null || _a === void 0 ? void 0 : _a.length) {
                const technoList = document.createElement('div');
                (_b = project.technos) === null || _b === void 0 ? void 0 : _b.forEach((techno) => {
                    const logo = document.createElement('img');
                    logo.classList.add('logoTechno');
                    logo.src = `assets/images/${techno.toLowerCase()}.png`;
                    technoList.appendChild(logo);
                });
                container.appendChild(technoList);
            }
            projectList === null || projectList === void 0 ? void 0 : projectList.appendChild(container);
        });
    }
    const callProjects = () => __awaiter(this, void 0, void 0, function* () {
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
            console.log('data=', datas);
            buildPage(datas[0]);
            // buildProjects(datas.projects);
        });
    });
    // callSiteElements();
    callProjects();
});
