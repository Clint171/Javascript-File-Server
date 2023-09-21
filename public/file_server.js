// Desc: File server for the public folder
var path;
function getFiles(url) {

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
window.onload = getFiles('/public'); 

function renderFileList(folders , files) {
    var list = document.getElementById('data_div');
    //Remove all child nodes
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    folders.forEach(function(file) {
        var li = document.createElement('button');
        li.classList.add("item");
        li.innerHTML = file;
        li.setAttribute("onclick",`getFiles("${file.replace(/\//g,"-")}")`);
        list.appendChild(li);
    });
    files.forEach(function(file) {
        var li = document.createElement('button');
        li.classList.add("item-file");
        li.innerHTML = file;
        li.setAttribute("onclick",`getFiles("${file.replace(/\//g,"-")}")`);
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