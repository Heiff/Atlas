const express = require('express');
const app = express();
require('dotenv').config()
const cookie = require('cookie-parser')
const routers = require('./Router/Router')
const FileUpload = require('express-fileupload')
const PORT = process.env.PORT

app.use(express.json())
app.use(express.static(`${process.cwd()}/images`));
app.use(FileUpload());
app.use(express.urlencoded({ extended: true }))
app.set('views', './EJS');
app.set('view engine', 'ejs');
app.use(cookie())

app.use('/',routers)


app.listen(PORT,(req,res) => {
    console.log(PORT);
})