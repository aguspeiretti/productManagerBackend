import fs, { writeFile } from 'fs'

class ProductManager{
    constructor(){
        this.path = "./products.json" 
    }

    getProducts=async()=>{

        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(data)
            return products
        }else{
            return []
        }
    }
    
    getProductsById=async(id)=>{
        const products = await this.getProducts()
        const findProduct = products.find(p=> p.id === id)
        if(findProduct){
            // console.log(findProduct);
            return findProduct
        }else{
            console.log("invalid id");
        }
    }

    updateProduct=async(id,field)=>{

        const products = await this.getProducts()

        const newProduct = products.map(p=> p.id === id ? {...p , ...field } : p)

        await fs.promises.writeFile(this.path, JSON.stringify(newProduct,null,'\t'))
    }

    addProducts=async({title , description , price , thumnail , code , stock})=>{

        const products = await this.getProducts()

        if(!title||!description||!price||!thumnail||!code||!stock){
            console.log("please complete all the slots");
        }
        const product = {
            title : title,
            description: description,
            price: price,
            thumnail: thumnail,
            code: code,
            stock :stock
        }

        if(products.length===0){
            product.id=1
        }else{
            product.id=products[products.length -1].id +1 
        }

        products.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))

    }

    deleteProduct = async(id)=>{

        const products = await this.getProducts()

         products.splice(id-1 , 1)

        await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
    }
}

const productManager = new ProductManager

const remera = {
    title: "remera victorino",
    description: "remera de algodon",
    price:200,
    thumnail:"http://",
    code:1002,
    stock:20
}
const remera2 = {
    title: "remera jockey",
    description: "remera de algodon",
    price:200,
    thumnail:"http://",
    code:1002,
    stock:20
}



productManager.addProducts(remera2)

// productManager.updateProduct(3 ,  {title : "remera niños argentinos"} )


// productManager.deleteProduct(1)