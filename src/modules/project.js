
class Project {

    constructor(name = "Novo", description = "", creationDate = "") {
        this.element = this.createElement();
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.toolbox = []; // List of toolboxes used in the project
        this.globalVars = [];
        this.consts = [];
        this.pages = [new Page()];
    }

    createElement() {
        let div = document.createElement('div');
        div.className = 'container project';
        
        return div;
    }

}

// Default HTML for page container
const pageHTML = '';

class Page {

    constructor(name = "") {
        this.name = name;
        this.index = 0;
        this.description = "";
        this.localVars = [];
        this.localConsts = [];
        this.codes = [new Code()];
    }

}

// Default HTML for code container
const codeHTML = '<div class="container code"></div>';

class Code {
    
    constructor() {
        this.index = 0;
        this.comment = "";
        this.lines = [];
        this.element = codeHTML;
    }

    addLineBefore(obj) {

    }

    addLine() {
        this.lines.push(new Line());
    }

    removeLine() {

    }

}

class Line {

    constructor() {
        this.index = 0;
        this.comment = "";
    }
}

class CodeObj {

    constructor(name = "", ) {

    }

}

export {
    Project,
    Code,
    Line,
};
// {
//     "header" :
//     {
//         "name" : "",
//         "description" : "",
//         "creationDate" : ""
//     },

//     "toolboxes" :
//     [
//         "default"

//     ],
    
//     "global_const" : [],
//     "global_vars" : [],

//     "pages" : 
//     {
//         "0" : {
//             "name" : "",
//             "code" : {}
//         }

//     } 
// }
