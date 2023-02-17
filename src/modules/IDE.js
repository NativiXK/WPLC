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
        this.environment = new Environment();
        this.header = null;
    }

    buildHeader() {
        /**
         * Constrói o header da página com os Menus/botões declarados atribuindo o evento de clique 
         * com os respectivos callbacks
         */
        let buttons = {
            'Arquivo' : [
                {'callback' : this.openFileMenu},
                {'Novo' : this.environment.newProject},
                {'Abrir' : this.environment.openProject},
                {'Fechar' : this.environment.closeProject}
            ]
        };

        let header = document.createElement('div');
        header.className = 'container header-bar';
        
        header.innerHTML += '<div class="container header-logo">\n\t<img src="src/imgs/logo.png" alt="logo" draggable="false">\n</div>'

        // Itera sobre a lista de botões do header para construí-lo
        for(const [key, value] of Object.entries(buttons)) {
            let button = document.createElement('div');
            button.className = "header-btn";
            button.innerHTML = key;
            
            // Se o indice do header for um array considera como um dropdown 
            if (value instanceof Array) {
                let menu = this.createDropdownMenu(value);
                button.appendChild(menu);
                button.addEventListener('click', value[0]['callback']);
            }

            header.appendChild(button);


        }


        return header;
    }

    createDropdownMenu(menu) {
        /**
         * Create dropdown element
         */
        
        let drop = document.createElement('div');
        drop.className = 'header-dropdown';
        
        menu.forEach(
            function(item, index) {
                let text, callback = Object.entries(item)[0];

                let btn = document.createElement('div');
                btn.className = 'dropdown-btn';
                btn.innerHTML = text;
                btn.addEventListener('click', callback);

                drop.appendChild(btn);
            }
        );

        return drop;
    }

    openFileMenu() {

    }

    updateIDE() {

    }

    renderIDE() {

        this.header = this.buildHeader();
        console.log(this.header);
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

class Environment {

    constructor () {
        this.project = null;
    }

    newProject() {
        this.project = new Project();
    }

    openProject() {
        console.log('Abrir projeto');
    }

    closeProject() {
        console.log('Fechar projeto');
    }

}

class Sidebar {

    constructor() {
        this.element = this.createElement();
    }

    createElement() {
        let tab = document.createElement('div');
        tab.className = 'side-bar-tabs';

        let div = document.createElement('div');
        div.className = 'container side-bar'

    }

    addTab(tab) {
    /*
        Espera um dicionário da seguinte maneira:
        {
            "title" : "nome",
            "callback" : function
        }
    */
        let div = document.createElement('div');
        div.className = '';


    }

}

export {
    Controller

};