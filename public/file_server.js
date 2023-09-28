// Desc: File server for the public folder
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
        li.setAttribute("onclick",`downloadFiles("${file.replace(/\//g,"-")}")`);
        //add right click menu
        li.setAttribute("oncontextmenu",`showMenuFile(event)`);
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
    xhr.open('POST', `/create/${url}`);
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
    xhr.open('POST', `/create/${url}`);
    xhr.onload = function() {
        if(xhr.responseText == "success"){
            alert("Directory created successfully");
            getFiles(path);
        }
        else{
            alert("Error creating directory");
        }
    }
    xhr.send(name);
}
//function to delete a directory
function deleteDirectory(name){
    if(name == null || name == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/delete/${url}`);
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
    if(name == null || name == ""){
        return;
    }
    var url = path;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `/delete/${url}`);
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
    xhr.send(`${name} ${newName}`);
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
    xhr.send(`${name} ${newName}`);
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
    xhr.open('POST', `/move/${url}`);
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
    xhr.open('POST', `/move/${url}`);
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
    xhr.send(`${name} ${newName}`);
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
function uploadDirectory(){}
//Override default right click menu
document.addEventListener('contextmenu', event => event.preventDefault());
//function to show right click menu
function showMenu(event){
    var menu = document.getElementById("menu");
    menu.style.display = "block";
    menu.style.top = event.clientY + "px";
    menu.style.left = event.clientX + "px";
}
//function to hide right click menu
function hideMenu(){
    var menu = document.getElementById("menu");
    menu.style.display = "none";
}
//function to show right click menu for files
function showMenuFile(event){
    var menu = document.getElementById("menu-file");
    menu.style.display = "block";
    menu.style.top = event.clientY + "px";
    menu.style.left = event.clientX + "px";
}
//function to hide right click menu for files
function hideMenuFile(){
    var menu = document.getElementById("menu-file");
    menu.style.display = "none";
}
