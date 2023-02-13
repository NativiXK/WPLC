// https://icon-icons.com/pt/pack/Basic-user-interface-vol-7/3812

const toolbox = [
    "Aberto",
    "Fechado",
    "Pulso subida",
    "Pulso descida"
];


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
    
    // Inserindo objetos na linha
    if (dragObj.classList.contains('tool') && e.target.classList.contains('code-line'))
    {
        let tool = e.dataTransfer.getData('text/html');

        e.target.append(setCodeObj(dragObj));
        
        dragObj = null;
        return false;
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

        console.log(e.target);
    }

    if (dragObj.classList.contains('tool') && e.target.parentElement.classList.contains('code-obj')) {
        
        let obj = e.dataTransfer.getData('text/html');

        if (e.target.classList.contains('rightDrop')) {
            e.target.parentElement.after(setCodeObj(dragObj));
        }

        if (e.target.classList.contains('leftDrop')) {
            e.target.parentElement.before(setCodeObj(dragObj));
        }
    }
    // console.log(dragObj);
    
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

    let txt = document.createElement('div');
    txt.className = 'text';
    txt.innerHTML = tool.innerHTML;

    let div = document.createElement('div');
    div.draggable = true;
    div.classList.add('container', 'code-obj');
    div.appendChild(leftDrop);
    div.appendChild(txt);
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
    // "<div class=\"container code-line\" id=\"drop-target\"></div>"
    let div = document.createElement('div');
    div.className = 'container code-line';
    div.id = 'drop-target';
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('dragenter', handleDragEnter);
    div.addEventListener('dragleave', handleDragLeave);
    div.addEventListener('drop', handleDrop);
    div.addEventListener('click', objClicked);

    if (selectedObj) {
        selectedObj.parentElement.insertBefore(div, selectedObj);
    }
    else
    {
        document.querySelector('.container.code').append(div);
    }
}

function removeLine(e) {
    if (selectedObj) {
        selectedObj.remove();
    }

    selectedObj = null;
}

function deleteObj(e) {
    console.log('delete');
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

// Adiciona ferramentas de edição das linhas
// Ferramentas de edição e manuseio das linhas de código
const lineTools = {
    "add"   : addLine,
    "remove": removeLine,
    "delete": deleteObj,
};

for(const [key, value] of Object.entries(lineTools)) {
    console.log(key);
    tool  = document.querySelector(".line-tool." + key);
    console.log(tool);
    tool.addEventListener('click', value);
};

document.body.addEventListener('click', function(e) {
    if (selectedObj) {
        selectedObj.classList.remove('selected');
    }
    selectedObj = null;
});

addLine();