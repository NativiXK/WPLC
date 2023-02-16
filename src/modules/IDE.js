// Ferramentas de edição e manuseio das linhas de código
import { Project } from "./project.js";

class Controller {
    
    constructor(){

        this.lineTools = {
            "add"   : this.addLine,
            "remove": this.removeLine,
            "delete": this.deleteObj,
        };
        this.selectedObj = null;
        this.draggedObj = null;
        this.project = null;
        this.sidebar = new Sidebar();

    }

    newProject() {
        this.project = new Project();
    }

    openProject() {

    }

    closeProject() {
        
    }

    updateIDE() {

    }

    renderIDE() {

        // Evento para desselecionar elemento
        document.body.addEventListener('click', function(e) {
            if (this.selectedObj) {
                selectedObj.classList.remove('selected');
            }
            this.selectedObj = null;
        });

        
    }

    openPage(e) {

        e.target.classList.add("open");
        let pageId = e.target.id;

        document.querySelectorAll(".open").forEach(
            function(item) {
                if (item !== e.target) {
                    item.classList.remove("open");
                }
            }
        );

        document.querySelectorAll('.page').forEach(
            function(item) {
                if (item.id == pageId) {
                    item.classList.remove('hide');
                }
                else {
                    item.classList.add('hide');
                }
            }
        );

    }

}

class Sidebar {

    constructor() {

    }

}

export {
    Controller

};