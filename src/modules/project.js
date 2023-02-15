
class Project {

    constructor(name = "Novo", description = "", creationDate = "") {
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.toolbox = [];
        this.code = {};
    }

}

class Code {
    
    constructor() {

    }
}

class Line {

    constructor() {
        this.index = 0;
        this.comment = "";
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
