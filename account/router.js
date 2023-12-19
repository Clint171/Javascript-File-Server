import express from 'express';
import { urlencoded } from 'body-parser';
import { addUser, loginUser, changePassword, deleteUser } from './service.js';

const app = express();

app.use(urlencoded({
    extended : false
}));

app.post("/" , addUser);

app.post("/login"  ,loginUser);

app.put("/password" , changePassword);

app.delete("/" , deleteUser);

app.listen(port , ()=>{
    console.log(`Accounts running on port ${port}`);
});