// Desc: File server for the public folder
//DOM elements
let menuFile = document.getElementById("menu");
let uploadDiv = document.getElementById("uploadDiv");

var path;

function getFiles(url) {
    //clear file input
    document.getElementById("file").value = "";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        let data = JSON.parse(xhr.responseText);
        renderFileList(data.directories, data.files);
        document.getElementById('path_p').innerHTML = url.replace(/-/g,"/");
        path = url;
    };
    xhr.send();
}
window.onload = getFiles('public-files'); 

function renderFileList(folders , files) {
    var list = document.getElementById('data_div');
    //Remove all child nodes
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    folders.forEach(function(file) {
        var li = document.createElement('button');
        li.classList.add("item");
        let filename = file.split("/");
        li.innerHTML = filename[filename.length - 1];
        file = file.replace(/\s/g,"_");
        li.setAttribute("onclick",`getFiles("${file.replace(/\//g,"-")}")`);
        //add right click menu
        li.setAttribute("oncontextmenu",`showMenu(event)`);
        list.appendChild(li);
    });
    files.forEach(function(file) {
        var li = document.createElement('button');
        li.classList.add("item-file");
        let filename = file.split("/");
        li.innerHTML = filename[filename.length - 1];
        li.setAttribute("id" , file.replace(/\//g,"-"));
        file = file.replace(/\s/g,"_");
        //li.setAttribute("onclick",`downloadFiles("${file.replace(/\//g,"-")}")`);
        li.setAttribute("onclick",`showMenuFile(event , "${file.replace(/\//g,"-")}")`);
        //add right click menu
        li.setAttribute("oncontextmenu",`showMenuFile(event , "${file.replace(/\//g,"-")}")`);
        list.appendChild(li);
    });
}
function back(){
    //convert to array
    var urlArray = path.split("-");
    //remove last element
    urlArray.pop();
    //convert back to string
    path = urlArray.join("-");
    getFiles(path);
}
//function to create a file
function createFile(name){
    if(name == null || name == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/create/${name}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("File created successfully");
            getFiles(path);
        }
        else{
            alert("Error creating file");
        }
    }
    xhr.send(name);
}
//function to download a file
function downloadFiles(url){
    window.open(`/download/${url}`);
}
//function to create a directory
function createDirectory(){
    var name = prompt("Enter directory name");
    if(name == null || name == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    let form = new FormData();
    form.append("name" , name);
    xhr.open('POST', `/create/${url+"-"+name}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("Directory created successfully");
            getFiles(path);
        }
        else{
            alert("Error creating directory");
        }
    }
    xhr.send(form);
    hideMenuFile();
}
//function to delete a directory
function deleteDirectory(name){
    if(name == null || name == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/delete/${name}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("Directory deleted successfully");
            getFiles(path);
        }
        else{
            alert("Error deleting directory");
        }
    }
    xhr.send(name);
}
//function to delete a file
function deleteFile(name){
    let confirm = prompt("Are you sure? Y/n");
    if(confirm == "Y" || confirm == "y"){
        if(name == null || name == ""){
            return;
        }
        var url = path;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `/delete/${name}`);
        xhr.onload = function() {
            if(xhr.responseText == "success"){
                alert("File deleted successfully");
                getFiles(path);
            }
            else{
                alert("Error deleting file");
            }
        }
        xhr.send(name);
    }
    
}
//function to rename a file
function renameFile(name){
    if(name == null || name == ""){
        return;
    }
    var newName = prompt("Enter new name");
    if(newName == null || newName == ""){
        return;
    }
    var url = path;
    let form = new FormData();
    newName = newName.replace(/\s/g,"_");
    newName = newName.replace(/\//g,"-");
    form.append("name" , name);
    form.append("newName" , newName);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/rename/${url}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("File renamed successfully");
            getFiles(path);
        }
        else{
            alert("Error renaming file");
        }
    }
    xhr.send(form);
}
//function to rename a directory
function renameDirectory(name){
    if(name == null || name == ""){
        return;
    }
    var newName = prompt("Enter new name");
    if(newName == null || newName == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    let form = new FormData();
    newName = newName.replace(/\s/g,"_");
    newName = newName.replace(/\//g,"-");
    form.append("name" , name);
    form.append("newName" , newName);
    xhr.open('POST', `/rename/${url}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("Directory renamed successfully");
            getFiles(path);
        }
        else{
            alert("Error renaming directory");
        }
    }
    xhr.send(form);
}
//function to move a file
function moveFile(name){
    if(name == null || name == ""){
        return;
    }
    var newName = prompt("Enter new path");
    if(newName == null || newName == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/move/${name}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("File moved successfully");
            getFiles(path);
        }
        else{
            alert("Error moving file");
        }
    }
    xhr.send(`${name} ${newName}`);
}
//function to move a directory
function moveDirectory(name){
    if(name == null || name == ""){
        return;
    }
    var newName = prompt("Enter new path");
    if(newName == null || newName == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/move/${name}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("Directory moved successfully");
            getFiles(path);
        }
        else{
            alert("Error moving directory");
        }
    }
    xhr.send(`${name} ${newName}`);
}
//function to copy a file
function copyFile(name){
    if(name == null || name == ""){
        return;
    }
    var newName = prompt("Enter new path");
    if(newName == null || newName == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/copy/${url}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("File copied successfully");
            getFiles(path);
        }
        else{
            alert("Error copying file");
        }
    }
    xhr.send(`${name} ${newName}`);
}
//function to copy a directory
function copyDirectory(name){
    if(name == null || name == ""){
        return;
    }
    var newName = prompt("Enter new path");
    if(newName == null || newName == ""){
        return;
    }
    var url = path;
    let form = new FormData();
    form.append("name" , name);
    form.append("newName" , newName);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/copy/${url}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("Directory copied successfully");
            getFiles(path);
        }
        else{
            alert("Error copying directory");
        }
    }
    xhr.send(form);
}
//function to download a directory
function downloadDirectory(name){
    if(name == null || name == ""){
        return;
    }
    var url = path;
    window.open(`/download/${url}`);
}
//function to download a file
function downloadFile(name){
    if(name == null || name == ""){
        return;
    }
    var url = path;
    window.open(`/download/${url}`);
}
//function to upload a file
function uploadFile(){
    var file = document.getElementById("file").files[0];
    var url = path;
    //create form data
    var formData = new FormData();
    //append file to form data
    formData.append("file",file);
    alert("Uploading file");
    //send file
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/upload/${url}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("File uploaded successfully");
            getFiles(path);
        }
        else{
            alert("Error uploading file");
        }
    }
    xhr.send(formData);
}
//function to upload a directory
function uploadDirectory(){
}
//Override default right click menu
document.addEventListener('contextmenu', event => {
    event.preventDefault();
    contextmenu();
});

//function to show menu for files
function showMenuFile(event , path){
    var menu = menuFile;
    menu.innerHTML = "";
    menu.style.display = "block";
    menu.style.top = event.clientY + "px";
    menu.style.left = event.clientX + "px";
    let downloadBtn = document.createElement("button");
    downloadBtn.classList.add("upload");
    downloadBtn.setAttribute("onclick" , `downloadFiles("${path}")`);
    downloadBtn.innerText = "Download";
    menu.appendChild(downloadBtn);
    let renameBtn = document.createElement("button");
    renameBtn.classList.add("upload");
    renameBtn.setAttribute("onclick" , `renameFile("${path}")`);
    renameBtn.innerText = "Rename";
    menu.appendChild(renameBtn);
    let moveBtn = document.createElement("button");
    moveBtn.classList.add("upload");
    moveBtn.setAttribute("onclick" , `moveFile("${path}")`);
    moveBtn.innerText = "Move";
    menu.appendChild(moveBtn);
    let copyBtn = document.createElement("button");
    copyBtn.classList.add("upload");
    copyBtn.setAttribute("onclick" , `copyFile("${path}")`);
    copyBtn.innerText = "Copy";
    menu.appendChild(copyBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("upload");
    deleteBtn.setAttribute("onclick" , `deleteFile("${path}")`);
    deleteBtn.innerText = "Delete";
    menu.appendChild(deleteBtn);
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("upload");
    closeBtn.setAttribute("onclick" , `hideMenuFile()`);
    closeBtn.innerText = "Close";
    menu.appendChild(closeBtn);

}
//function to hide right click menu for files
function hideMenuFile(){
    var menu = menuFile;
    menu.innerHTML = "";
    menu.style.display = "none";
}

function contextmenu(){
    var menu = menuFile;
    menu.innerHTML = "";
    let folderBtn = document.createElement("button");
    folderBtn.classList.add("upload");
    folderBtn.setAttribute("onclick" , `createDirectory()`);
    folderBtn.innerText = "Create Folder";
    menu.appendChild(folderBtn);
    let fileBtn = document.createElement("button");
    fileBtn.classList.add("upload");
    fileBtn.setAttribute("onclick" , `showUpload(event)`);
    fileBtn.innerText = "Upload File";
    menu.appendChild(fileBtn);
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("upload");
    closeBtn.setAttribute("onclick" , `hideMenuFile()`);
    closeBtn.innerText = "Close";
    menu.appendChild(closeBtn);
    menu.style.display = "block";
    menu.style.top = event.clientY + "px";
    menu.style.left = event.clientX + "px";
}

function showUpload(){
    uploadDiv.style.display = "block";
    uploadDiv.style.left = (event.clientX-100)+"px";
    uploadDiv.style.top = (event.clientY)+"px";
    hideMenuFile();
    hideMenu();
}

function hideUpload(){
    uploadDiv.style.display = "none";
}