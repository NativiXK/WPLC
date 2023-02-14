// https://icon-icons.com/pt/pack/Basic-user-interface-vol-7/3812

// const fs = require("fs");

const toolbox = [
    "Aberto",
    "Fechado",
    "Pulso subida",
    "Pulso descida"
];

/*
Project cookie structure:

cookie = {
    'header' : ----> Holds the project info
    {
        'name' : ----,
        'description' : ----,
        'creationDate' : ----,
    },

    'toolboxes' : ----> Stores used plugins in the project
    [
        'default', -----> Built-in blocks, functions, contacts and coils

    ],
    
    'global_const' : [],
    'global_vars' : [],

    'pages' : 
    {
        1 : {
            'name' : ----,
            'code' :
            {
                'local_const' : [],
                'local_vars' : [],
                'lines' : [
                    0 : [
                        def0
                    ] #line
                ] #lines
            } #code
        } #1

    } #pages
}


*/


codeJson = {}

let sideBar;    // Barra lateral de ferramentas
let codeHeader; // Barra de ferramentas de edição das linhas
let codeTools;  // Ferramentas de edição das linhas
let lines;
let dragObj = null;
let selectedObj = null;

function handleDragStart(e) {
    this.style.opacity = '1';

    dragObj = this;

    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
    // Remove efeito na linha depois de passar por cima
    document.querySelectorAll('.over').forEach(function(item) {
        item.classList.remove('over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDragEnter(e) {
    e.target.classList.add('over');
}

function handleDragLeave(e) {
    e.target.classList.remove('over');
}

function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
    console.log(e);

    // Salva posição de drop
    if (e.target.classList.contains('code-line')) {

    }

    // Reorganizando objetos na linha
    if (dragObj.classList.contains('code-obj'))
    {
        let obj = e.dataTransfer.getData('text/html');

        if (e.target.classList.contains('rightDrop')) {
            e.target.parentElement.after(dragObj);
        }

        if (e.target.classList.contains('leftDrop')) {
            e.target.parentElement.before(dragObj);
        }

        if (e.target.classList.contains('code-line')) {
            e.target.append(dragObj);
        }

    }

    // Adicionando um novo objeto a partir da barra de ferramentas
    if (dragObj.classList.contains('tool')) {
        
        let obj = e.dataTransfer.getData('text/html');

        // Adicionado depois de um objeto
        if (e.target.classList.contains('rightDrop')) {
            e.target.parentElement.after(setCodeObj(dragObj));
        }

        // Adicionado antes de um objeto
        if (e.target.classList.contains('leftDrop')) {
            e.target.parentElement.before(setCodeObj(dragObj));
        }

        // Adicionado direto na linha
        if (e.target.classList.contains('code-line')) {
            e.target.append(setCodeObj(dragObj));
        }
    }

    dragObj = null;
}

function objClicked(e) {
    // Adiciona o evento de clique no objeto da linha para edição

    e.target.classList.toggle("selected");

    document.querySelectorAll(".selected").forEach(
        function(item) {
            if (item !== e.target) {
                item.classList.remove("selected");
            }
        }
    );

    selectedObj = e.target;

    // Não permite propagar evento para elementos abaixo deste elemento
    e.stopPropagation();
}

function setCodeObj(tool) {
    let rightDrop = document.createElement('div');
    rightDrop.draggable = false;
    rightDrop.className = 'rightDrop';
    rightDrop.addEventListener('dragenter', handleDragEnter);
    rightDrop.addEventListener('dragleave', handleDragLeave);
    rightDrop.addEventListener('dragend', handleDragEnd);

    let leftDrop = document.createElement('div');
    leftDrop.draggable = false;
    leftDrop.className = 'leftDrop';
    leftDrop.addEventListener('dragenter', handleDragEnter);
    leftDrop.addEventListener('dragleave', handleDragLeave);
    leftDrop.addEventListener('dragend', handleDragEnd);

    let topDrop = document.createElement('div');
    topDrop.draggable = false;
    topDrop.className = 'topDrop';
    topDrop.addEventListener('dragenter', handleDragEnter);
    topDrop.addEventListener('dragleave', handleDragLeave);
    topDrop.addEventListener('dragend', handleDragEnd);
    
    let bottomDrop = document.createElement('div');
    bottomDrop.draggable = false;
    bottomDrop.className = 'bottomDrop';
    bottomDrop.addEventListener('dragenter', handleDragEnter);
    bottomDrop.addEventListener('dragleave', handleDragLeave);
    bottomDrop.addEventListener('dragend', handleDragEnd);

    let txt = document.createElement('div');
    txt.className = 'text';
    txt.innerHTML = tool.innerHTML;

    let div = document.createElement('div');
    div.draggable = true;
    div.classList.add('container', 'code-obj');

    div.appendChild(leftDrop);
    div.appendChild(topDrop);
    div.appendChild(txt);
    div.appendChild(bottomDrop);
    div.appendChild(rightDrop);
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragend', handleDragEnd);
    div.addEventListener('drop', handleDrop);

    div.addEventListener("click", objClicked);

    // Adiciona duplo clique para abrir popup de edição do objeto
    div.addEventListener("dblclick", function (e) {
        console.log(this);
    })

    return div;
}

function getParentLine(obj) {
    if (obj.parentElement.classList.contains('code-line')) {
        return obj.parentElement;
    }

}

// Adiciona linha acima da selecionada
function addLine(e) {
    let div = document.createElement('div');
    div.className = 'container code-line';
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('dragenter', handleDragEnter);
    div.addEventListener('dragleave', handleDragLeave);
    div.addEventListener('drop', handleDrop);
    div.addEventListener('click', objClicked);
    div.innerHTML += "<div class='line-header'> </div>"

    if (selectedObj) {
        selectedObj.parentElement.insertBefore(div, selectedObj);
    }
    else
    {
        document.querySelector('.container.code').append(div);
    }

    updateLineHeaders();
}

function removeLine(e) {
    if (selectedObj) {
        selectedObj.remove();
    }

    selectedObj = null;

    updateLineHeaders();
}

function deleteObj(e) {
    console.log(selectedObj.parentElement);
}

function updateLineHeaders() {
    let lines = document.querySelectorAll('.line-header');
    lines.forEach(function(item, index) {
        item.innerHTML = index;
        item.parentElement.id = "line-" + index;
    });
}

function loadToolbox() {
    let files = FileSystem.readdirSync();

    files.forEach(function(file) {
        console.log(file);
    });

    // let json = JSON.parse(fs.readFile('toolbox/default/default.json', function(err, data) {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write(data);
    //     res.end();
    //     })
    // );
    return tools;
}

// Adiciona as ferramentas disponíveis na barra lateral


// loadToolbox();

sideBar = document.querySelector(".side-bar");
toolbox.forEach(function(item) {

    let div = document.createElement("div");
    div.draggable = true;
    div.classList.add('box', 'tool');
    div.innerHTML = item;
    sideBar.append(div);
});

// Adiciona eventos de drag and drop para cada ferramenta na barra lateral
codeTools = document.querySelectorAll('.container .box');
codeTools.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
});

// Adiciona ferramentas de edição das linhas
// Ferramentas de edição e manuseio das linhas de código
const lineTools = {
    "add"   : addLine,
    "remove": removeLine,
    "delete": deleteObj,
};

for(const [key, value] of Object.entries(lineTools)) {
    tool  = document.querySelector(".line-tool." + key);
    tool.addEventListener('click', value);
};

document.body.addEventListener('click', function(e) {
    if (selectedObj) {
        selectedObj.classList.remove('selected');
    }
    selectedObj = null;
});

addLine();