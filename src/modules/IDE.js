// Ferramentas de edição e manuseio das linhas de código
import { Project } from "./project.js";

class Controller {
    
    constructor(){

        this.lineTools = {
            "add"   : this.addLine,
            "remove": this.removeLine,
            "delete": this.deleteObj,
        };

    }

    newProject() {

    }

    openProject() {

    }

    closeProject() {
        
    }

}

class Code {

    constructor() {

    }

}


export {
    Controller

};