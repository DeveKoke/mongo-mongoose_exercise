const mongoose = require('mongoose');
require('../utils/db_mongo') // Conexión a BBDD MongoDB  

const Provider = require('./schemas/providers_schema');
const Product = require('./schemas/products_schema');


// Insertar un producto nuevo a un proveedor existente.

const insertProductFromProvider = async (providerName, productData) =>{ 
    try{
        await Provider.findOne({ company_name: providerName }) // Buscamos proveedor por nombre
        .then((providerData) => {
            console.log('Proveedor encontrado en la base de datos');

            if (providerData) {
                const { provider, ...productDataDetails } = productData;  //productDataDetails = todas las claves de info del producto menos provider. Vienen del parámetro productData
                // Creamos producto asignando un id de proveedor
                const product = new Product({ 
                    ...productDataDetails,
                    provider: providerData._id
                  });
    
                console.log('Producto añadido satisfactoriamente');
                // Guardamos el producto en la base de datos
                return product.save();
            } else {
                throw new Error("Proveedor no encontrado");
            }
        })
        .then((productData) => {
            console.log(productData); 
        })
        .catch((err) => {
            console.log(err); 
        });
        
    }catch (err) {
        console.log(err);
        throw err;
    } 
}

// const productData = {
//     id: 2,
//     title: "Super López XXL: La isla de basura",
//     price: 16.90,
//     description: "La isla de basura, el la que Superlópez se las verá con un malvado delincuente que ha dado vida, cual doctor Frankenstein, a una isla de basura en pleno mar con intención de utilizarla para sus malvados fines. ",
//     image: "https://www.superhumor/superlopezXXL/collection/vol5/a9wifnsre23.jpg"
//   };
  
//   insertProductFromProvider("Friki Madrid", productData);

  module.exports = insertProductFromProvider;


    // use local
    // db.products.insertOne({
    //     "title": "The amazing Spiderman. Vuelta a los orígenes",
    //     "price": 4.90,
    //     "description": "Spiderman volverá a sus esencias en esta nueva aventura donde se enfretará a... sí mismo?.",
    //     "provider": ObjectId("64874823ccf91a787a2e353f")
    // })

    // const createEntry = async (entry) => { // entry es por donde llega el objeto queries de queries
    //     const { title, content, email, category } = entry;
    //     let client, result;
    //     try {
    //         client = await pool.connect(); // Espera a abrir conexion
    //         const data = await client.query(entryQueriesDoc.createEntry,[title, content, email, category])
    //         result = data.rowCount
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     } finally {
    //         client.release();
    //     }
    //     return result
    // }