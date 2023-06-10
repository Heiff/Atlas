const fs = require('fs').promises

class Io {
    dir 
    constructor(dir){
        this.dir = dir;
    }
    async Read(){
      const data =  await fs.readFile(this.dir,{encoding:"utf-8"})
      return data ? JSON.parse(data) : []
    }
    async Write(data){
        await fs.writeFile(this.dir,JSON.stringify(data,null,2),{encoding:"utf-8"})
    }
}
module.exports = Io