# Javascript-File-Server
<p>A file server running node js on the back end</p>
<p>View the server <a href="https://file-server-xp39.onrender.com"  target="_blank">here</a></p>

## Usage
<p>Once you visit <a href="https://file-server-xp39.onrender.com"  target="_blank">the web app</a>, the app routes to public/files which is the root path of the app.</p>
<img align="center" src="./documentation/img/first_page.png" alt="first page">
<p>Directories have a blue border and files have no border.</p>
<h3>Navigation</h3>
<p>Right below the title, the current working directory is displayed. This can be useful for navigation or for copying or moving files.</p>
<img align="center" src="./documentation/img/path_p.png" alt="path p">
<h3>Context menu</h3>
<p>To create a directory, or upload a file, right click anywhere on the body to get the context menu shown below:</p>
<img align="center" src="./documentation/img/context_menu.png" alt="context menu">
<p>From the context menu, it's possible to create a directory or upload a file.</p>
<h3>To create a directory:</h3>
<p>The dialog below will appear when you select the "Create folder" option</p>
<img align="center" src="./documentation/img/directory_creation.png" alt="directory creation">
<p>Just write the directory name on the dialog and press ok. The directory will be created in your current working directory</p>
<h3>To upload a file:</h3>
<p>Once you click on upload file, the following menu will appear</p>
<img align="center" src="./documentation/img/upload_menu.png" alt="upload menu">
<p>First click on the browse button, which should give you an option to select a file from your file system.  Once the file is loaded, click on upload to upload the file. Larger files may take some time to appear. Your connection speed may also affect the time taken.</p>
<h3>File options</h3>
<p>When you click on a file, the following menu will show up:</p>
<img align="center" src="./documentation/img/file_menu.png" alt="file menu">
<p>It has the options to:</p>
<ul>
<li>Download</li>
<li>Renane</li>
<li>Move</li>
<li>Copy</li>
<li>Delete</li>
</ul>
<h3>To download a file:</h3>
<p>Simply click on the download button. The download will start automatically</p>
<h3>To rename a file:</h3>
<p>Once you click on the "Rename" option, the following dialog will be shown:</p>
<img align="center" src="./documentation/img/file_rename.png" alt="file rename">
<p>Enter the name you would like to rename the file to. Then click ok. The file should now appear with the new name.</p>
<h3>To move a file</h3>
<p>When you click on the "Move" option, the following dialog will be displayed</p>
<img align="center" src="./documentation/img/move_file.png" alt="move file">
<p>You will be required to write the full path you would wish to move the file to, as shown in the above image, ending the path with the name and extension of the file.<br>Once you click ok. The file will be moved. Larger files may take some time to appear in the new location.</p>
<h3>To copy a file</h3>
<p>Once you click on the "Copy" option, the dialog below will be shown:</p>
<img align="center" src="./documentation/img/copy_file.png" alt="copy file">
<p>This is similar to the move function, but the original file is not altered.<br>All the move steps apply here too.</p>
<h3>To delete a file:</h3>
<p>BE CAREFUL WITH DELETING FILES, THEY WILL NOT BE RECOVERABLE AFTER DELETION</p>
<p>Once you click on the delete option, the dialog below will appear:</p>
<img align="center" src="./documentation/img/delete_dialog.png" alt="delete dialog">
<p>This is a dialog to confirm that you want to delete the file. Type "y" for yes and "n" for no.<br>Be VERY sure you want to delete that file.</p>

## IMPORTANT
<p>As this file server is currently in development, there exists an error, whereby it is possible to navigate back from the root of the file system to the html,css and javascript for the server client side logic. Please DO NOT alter anything in this directory as this will break the website.<br>This issue will be resolved in future updates.</p>
<img align="center" src="./documentation/img/error.png" alt="error">



## Contributions
<p>This is an open source project and all contribution is greatly appreciated. For more info, refer to the <a href="./documentation/CONTRIBUTION.md"> Contribution guide</a></p>