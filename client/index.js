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
console.log('JS lancé');
const bouton = document.querySelector('button');
const projectList = document.getElementById('projectList');
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
const callProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    fetch(`http://127.0.0.1:1234/api`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((result) => {
        return result.json();
    })
        .then((formattedResult) => {
        const allProjects = formattedResult;
        allProjects.forEach((project) => {
            var _a, _b;
            const container = document.createElement('div');
            const title = document.createElement('h3');
            title.innerText = `${project.title}`;
            container.appendChild(title);
            const status = document.createElement('p');
            status.innerText = `${project.type} - ${project.status}`;
            container.appendChild(status);
            const description = document.createElement('p');
            description.innerText = `${project.description}`;
            container.appendChild(description);
            if ((_a = project.technos) === null || _a === void 0 ? void 0 : _a.length) {
                const technoList = document.createElement('div');
                (_b = project.technos) === null || _b === void 0 ? void 0 : _b.forEach((techno) => {
                    const logo = document.createElement('img');
                    logo.classList.add('logoTechno');
                    logo.src = `assets/images/${techno.toLowerCase()}.png`;
                    technoList.appendChild(logo);
                    console.log(techno);
                });
                container.appendChild(technoList);
            }
            projectList === null || projectList === void 0 ? void 0 : projectList.appendChild(container);
        });
    });
});
bouton === null || bouton === void 0 ? void 0 : bouton.addEventListener('click', callProjects);
