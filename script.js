
let names = [];
let titles = [];
let textAreas = [];
let prioArrey =[];

let d = new Date();
let date = d.getDate();
let month = d.getMonth()+1;
let year = d.getFullYear();
let f_date = date + `.` + month + `.` + year;

let namesDelete = [];
let titlesDelete = [];
let textAreasDelete = [];
let prioDeleteArrey =[];


loadBasisArray();



function openCloseNote(){
    document.getElementById(`notebar`).classList.toggle(`noteTransform`);
}


function createPost(){
    let name = document.getElementById(`creater`).value;
    let title = document.getElementById(`title`).value;
    let prio = document.getElementById(`prioInput`).value;
    
    let textAreaInput = document.getElementById(`textArea`).value;
    let textArea = textAreaInput.replace(/\n/g, '<br>');

    if(name && title && textArea && prio != ``){
        if(prio <= 3 && prio >= 1){    
            names.push(name);
            titles.push(title);
            textAreas.push(textArea);
            prioArrey.push(prio);
            
            getPost();
            saveBasisArray();
 
            name = document.getElementById(`creater`).value = ``;
            title = document.getElementById(`title`).value = ``;
            textArea = document.getElementById(`textArea`).value = ``;
            prio = document.getElementById(`prioInput`).value = ``;
        }
        else{alert(`Werte nur zwischen 1 und 3 erlaubt!`);}
    }
    else{alert(`Fülle die Felder aus!`);}
}

// ................................................... Rendern ................................................
function getPost(){

    let post = document.getElementById(`post`);
    post.innerHTML = ``;


    for(i=0; i<names.length; i++){
    post.innerHTML +=`<div class="postDesigne">
    <div id="postHead">
    <div id ="${i}" class="">${prioArrey[i]}</div><div>${f_date}</div><div>${names[i]}</div>
    </div>
    <div id="titlePost"><b>${titles[i]}<b></div>
    ${textAreas[i]}
        <div id="postTrash">
        <a onclick="deletePost(${i})" href="#"><img id="trash" src="./icons/trash-can-arrow-up-solid.svg" alt=""></a>
        </div>
    </div>`;
    prioColor(i);
}
}

function prioColor(prio){
    if(prioArrey[i] == 1){
        document.getElementById(i).classList.add(`prioHigh`);
    }
    if(prioArrey[i] == 2){
        document.getElementById(i).classList.add(`prioMid`);
    }
    if(prioArrey[i] == 3){
        document.getElementById(i).classList.add(`prioLow`);
    }
}

function createTrashPost(){
    let trashPost = document.getElementById(`trashPost`);
    trashPost.innerHTML =``;
    
    
    for(i=0; i<namesDelete.length; i++){
    trashPost.innerHTML +=`<div class="postDesigne">
    <div id="postHead">
    <div id ="${i}" class="">${prioDeleteArrey[i]}</div><div>${f_date}</div> <div>${namesDelete[i]}</div>
    </div>
    <div id="titlePost"><b>${titlesDelete[i]}<b></div>
    ${textAreasDelete[i]}
        <div id="postTrashRefresh">
        <a onclick="deleteTrashArray(${i})" href="#"><img id="refresh" src="./img/cross.png" alt=""></a>
        <a onclick="refreshPost(${i})" href="#"><img id="refresh" src="./icons/wiederherstellen.png" alt=""></a>
        </div>
    </div>`;
    prioColorTrash(i);
    }
}

function prioColorTrash(i){
    if(prioDeleteArrey[i] == 1){
        document.getElementById(i).classList.add(`prioHigh`);
    }
    if(prioDeleteArrey[i] == 2){
        document.getElementById(i).classList.add(`prioMid`);
    }
    if(prioDeleteArrey[i] == 3){
        document.getElementById(i).classList.add(`prioLow`);
    }
}

// ....................................... Arrays Übertragen und löschen ................................

function deletePost(i){
    transferArraysToDeleteArrays(i);
    getPost();
    createTrashPost();
}

function transferArraysToDeleteArrays(i){
    namesDelete.push(names[i]);
    titlesDelete.push(titles[i]);
    textAreasDelete.push(textAreas[i]);
    prioDeleteArrey.push(prioArrey[i]);

    deleteBasisArrays(i);
    saveDeleteArray();
    getPost();

}

function deleteBasisArrays(i){
    names.splice(i,1);
    titles.splice(i,1);
    textAreas.splice(i,1);
    prioArrey.splice(i,1);

    saveBasisArray();
}

function deleteTrashArray(i){
    namesDelete.splice(i,1);
    titlesDelete.splice(i,1);
    textAreasDelete.splice(i,1);
    prioDeleteArrey.splice(i,1);

    if(namesDelete && titlesDelete && textAreasDelete && prioDeleteArrey){
    saveDeleteArray();
    createTrashPost();
}
}

function refreshPost(i){
    names.push(namesDelete[i]);
    titles.push(titlesDelete[i]);
    textAreas.push(textAreasDelete[i]);
    prioArrey.push(prioDeleteArrey[i]);


    saveBasisArray();
    deleteTrashArray(i);
}
// ....................................... Loakl Speichern & Laden ....................................

function saveBasisArray(){
    let namesSave = JSON.stringify(names);
    let titlesSave = JSON.stringify(titles);
    let textAreasSave = JSON.stringify(textAreas);
    let prioArreySave = JSON.stringify(prioArrey);

    localStorage.setItem(`names`, namesSave);
    localStorage.setItem('titles', titlesSave);
    localStorage.setItem('textAreas', textAreasSave);
    localStorage.setItem('prioArrey', prioArreySave);
}

function loadBasisArray(){
    let namesSave = localStorage.getItem(`names`);
    let titlesSave = localStorage.getItem('titles');
    let textAreasSave = localStorage.getItem('textAreas');
    let prioArreySave = localStorage.getItem('prioArrey');

if(namesSave && titlesSave && textAreasSave && prioArreySave){
    names = JSON.parse(namesSave);
    titles = JSON.parse(titlesSave);
    textAreas = JSON.parse(textAreasSave);
    prioArrey = JSON.parse(prioArreySave);
}
}

// ....................................................................................................

function saveDeleteArray(){
    let namesDeleteSave = JSON.stringify(namesDelete);
    let titlesDeleteSave = JSON.stringify(titlesDelete);
    let textAreasDeleteSave = JSON.stringify(textAreasDelete);
    let prioSaveArrey = JSON.stringify(prioDeleteArrey);

    localStorage.setItem(`namesDelete`, namesDeleteSave);
    localStorage.setItem('titlesDelete', titlesDeleteSave);
    localStorage.setItem('textAreasDelete', textAreasDeleteSave);
    localStorage.setItem('prioDeleteArrey', prioSaveArrey);
}

function loadDeleteArray(){
    let namesDeleteSave = localStorage.getItem(`namesDelete`);
    let titlesDeleteSave = localStorage.getItem('titlesDelete');
    let textAreasDeleteSave = localStorage.getItem('textAreasDelete');
    let prioSaveArrey = localStorage.getItem('prioDeleteArrey');

if(namesDeleteSave && titlesDeleteSave && textAreasDeleteSave && prioSaveArrey ){
    namesDelete = JSON.parse(namesDeleteSave);
    titlesDelete = JSON.parse(titlesDeleteSave);
    textAreasDelete = JSON.parse(textAreasDeleteSave);
    prioDeleteArrey = JSON.parse(prioSaveArrey);
}
}




