const Io = require('../Io')
const Data = new Io('./Database/Users.json')
const CommentsData = new Io('Database/Comments.json')
const Admin = new Io('./Database/Admin.json')
const { Model,Comments } = require('../Model/adminModel')
const jwt = require('jsonwebtoken')
const {v4:uuid} = require('uuid')
const Register = async(req,res) => {
    const data = await Data.Read()
    const { user,pass } = req.body;
    const id = uuid()
    for (let i = 0; i < data.length; i++) {
        if (data[i].user == user) {
            res.status(200).json({message:'user bor'})
        } 
    }
    if (data.length >= 0) {
        const token = jwt.sign(id,'@secret')
        const newData = new Model(
            id,
            user,
            pass
        )
        data.push(newData)
        res.cookie('token',token)
        await Data.Write(data)
        res.redirect('/log/ejs')
    }
    else {
        res.redirect('/auth/reg')
    }
}

const LoginAdmin = async(req,res)=>{
const {user,pass} = req.body;
const data = await Admin.Read()
let yes = true
for (let i = 0; i < data.length; i++) {
    if (data[i].user == user && data[i].pass == pass) {
        const id = data[i].id
        yes = false
        const token = jwt.sign(id,"@secret")
        res.cookie("token",token)
        res.redirect('/admin/comments')
    }
}
if (yes) {
    res.redirect('/home')
}

}
const Login = async(req,res) => {
const { user,pass } = req.body;
const data = await Data.Read()
let login = true 
for (let i = 0; i < data.length; i++) {
   if (data[i].user == user && data[i].pass == pass) {
    login = false
        const id = data[i].id
        const token = jwt.sign(id,"@secret")
        res.cookie("token",token)
        res.redirect('/home')
   } 
}
if (login) {
    res.redirect('/log/ejs')
}
}

const auth = async(req,res,next) => {
    const data = await Admin.Read()
    if (req.cookies.token) {
        const id = jwt.verify(req.cookies.token,"@secret")
    const FindData = data.find(el => el.id == id)
    console.log(FindData);
    if (FindData) {
        next()
    }
    else {
       res.status(403).redirect('/home')
    }
    }
    else{
        res.status(200).json({message:"login"})
    }
}

const ReadComments = async(req,res) => {
const {name,email,message} = req.body
const comment = await CommentsData.Read()
const id = (comment[comment.length - 1]?.id || 0) + 1;
let yes = true
if (comment.length === 0) {
    yes = false
    const newComment = new Comments(
        id,
        name,
        email,
        message
    )
    await CommentsData.Write([newComment])
    res.redirect('/home')
}
else if(yes) {
    const newComment = new Comments(
        id,
        name,
        email,
        message
    )
    comment.push(newComment)
    await CommentsData.Write(comment)
    res.redirect('/home')
}
}


module.exports = {Register,Login,auth,LoginAdmin,ReadComments}