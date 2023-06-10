class Model {
    constructor(id,user,pass){
        this.id = id;
        this.user = user;
        this.pass = pass
    }
}
class Products {
    constructor(id,title,image,price){
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
    }
}

class Comments {
    constructor(id,name,email,message){
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
    }
}

module.exports = {Model,Products,Comments}