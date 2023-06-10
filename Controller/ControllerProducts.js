const Io = require('../Io');
const Data = new Io('./Database/Data.json');
const Comment = new Io('./Database/Comments.json')
const { Products } = require('../Model/adminModel')
const {v4:uuid} = require('uuid')

const getProducts = async(req,res) => {
    const data = await Data.Read()
    res.status(200).json(data)
}

const postProducts = async (req,res) => {
    const data = await Data.Read()
    const { title,price } = req.body;
    const { image } = req.files;
    let yes = true;
    const id = (data[data.length - 1]?.id || 0) + 1;
    for (let i = 0; i < data.length; i++) {
        if (data.length == 0) {
            const imageName = `${uuid()}.${
                image.name.split(".")[image.name.split(".").length - 1]
              }`;
            const newData = new Products(
                id,
                title,
                imageName,
                price
            )
            image.mv(process.cwd() + `/images/${imageName}`);
            
            await Data.Write([newData])
            res.status(200).json({message:"succes"})
        }
        else if(data[i].title == title){
           yes = false
           res.status(200).json({message:"product bor"})
        }
        
    }
    if (yes) {
        const imageName = `${uuid()}.${
            image.name.split(".")[image.name.split(".").length - 1]
          }`;
        const newData = new Products(
            id,
            title,
            imageName,
            price
        )
        image.mv(process.cwd() + `/images/${imageName}`);
        data.push(newData)
        await Data.Write(data)
        res.status(200).json({message:"succes"})
    }
}

const ProductsUpdate = async(req,res) => {
    const { image } = req.files;
    const {id,title ,price} = req.body;
    const data = await Data.Read();
    const imageName = `${uuid()}.${
        image.name.split(".")[image.name.split(".").length - 1]
      }`;
      const userID = data[id - 1]
    image ? (userID.image = imageName) : el.image 
           title ? (userID.title = title) : el.title
           price ? (userID.price = price) : el.price
           image.mv(process.cwd() + `/images/${imageName}`);
           await Data.Write(data)
           res.status(200).json({updated:data[id - 1]})
}   

const ProductDelete = async (req,res) => {
    const { id } = req.params;
    console.log(id);
    const data = await Data.Read();
    const DataFilter = data.filter((el) => el.id != id)
    await Data.Write(DataFilter)
    res.status(200).json('succes deleting')
}


const LoginEjs = async (req,res) => {
    res.render('Login')
}
const SigninEjs = async (req,res) => {
    res.render('Register')
}
const Home = async(req,res) => {
    const data = await Data.Read()
    res.render('Home',{
        data
    })
}
const AdminEjs = async(req,res) => {
    res.render('Admin')
}

const CommentsEjs = async(req,res) => {
    const comment = await Comment.Read()
    const data = await Data.Read()
    res.render('Comments',{
        comment,
        data

    })
}

module.exports = {
Home,
getProducts,
LoginEjs,
SigninEjs,
postProducts,
AdminEjs,
ProductsUpdate,
ProductDelete,
CommentsEjs
}