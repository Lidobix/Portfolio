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
console.log('coucou');
const bouton = document.querySelector('button');
const callProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = fetch(`http://127.0.0.1:1234/api`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((r) => {
            console.log(r.body);
        });
        // const jsonResult: any = await result.json();
        // console.log(jsonResult);
        // jsonResult = await resultValue.json();
    }
    catch (error) {
        console.log(error);
    }
});
bouton === null || bouton === void 0 ? void 0 : bouton.addEventListener('click', callProjects);
