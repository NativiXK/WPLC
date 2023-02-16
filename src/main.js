// https://icon-icons.com/pt/pack/Basic-user-interface-vol-7/3812

import * as IDE from "./modules/IDE.js";

const toolbox = [
    "Aberto",
    "Fechado",
    "Pulso subida",
    "Pulso descida"
];

let ide = new IDE.Controller();

let sideBar;    // Barra lateral de ferramentas
let codeHeader; // Barra de ferramentas de edição das linhas
let codeTools;  // Ferramentas de edição das linhas
let lines;
let dragObj = null;
let selectedObj = null;

function handleDragStart(e) {
    this.style.opacity = '1';

    ide.draggedObj = this;

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
    
    // Busca a linha de código usada
    let line = getParentLine(e.target);
    line.getBoundingClientRect();

    // Salva posição de drop
    if (e.target.classList.contains('code-line')) {

    }



    /*
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

            let tool = setCodeObj(dragObj);

            e.target.parentElement.after(tool);
        }

        // Adicionado antes de um objeto
        if (e.target.classList.contains('leftDrop')) {

            let tool = setCodeObj(dragObj);

            e.target.parentElement.before(tool);
        }

        // Adicionado direto na linha
        if (e.target.classList.contains('code-line')) {
            e.target.append(setCodeObj(dragObj));
        }
    }
    */

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

    ide.selectedObj = e.target;

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
    
    if (obj == null) {
        return null;
    }
    
    if (obj.classList.contains('code-line')) {
        return obj;
    }
    
    return getParentLine(obj.parentElement);

}

// Adiciona linha acima da selecionada
function addLine(e) {
    let canvas = document.createElement('canvas');
    canvas.className = "line-canvas";

    let div = document.createElement('div');
    div.className = 'container code-line';
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('dragenter', handleDragEnter);
    div.addEventListener('dragleave', handleDragLeave);
    div.addEventListener('drop', handleDrop);
    div.addEventListener('click', objClicked);
    div.append(canvas);
    div.innerHTML += "<div class='line-header'> </div>"

    // Não permite adicionar linha dentro da linha quando o objeto selecionado é uma ferramenta
    if (selectedObj && selectedObj.classList.contains("obj")) {
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


// Adiciona as ferramentas disponíveis na barra lateral
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

for(const [key, value] of Object.entries(ide.lineTools)) {
    let tool  = document.querySelector(".line-tool." + key);
    tool.addEventListener('click', value);
};


ide.renderIDE();

// Adiciona eventos nas tabs das páginas
document.querySelectorAll('.tab-title').forEach(
    function(item, index) {
        if (index === 0) {
            item.classList.add('open');
        }
        item.addEventListener('click', function(e) {ide.openPage(e)});
    }
)

ide.newProject();
console.log(JSON.stringify(ide.project));

addLine();