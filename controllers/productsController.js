/**
 * @author JorgeBlas 
 * @exports controllers 
 * @namespace controllers 
 */

const Product = require('../models/schemas/products_schema'); // Importar el modelo de la BBDD
const Provider = require ('../models/schemas/providers_schema');


/** 
  * <pre>
  *  //* GET ONE PRODUCT BY ID (IF NOT, GET THEM ALL)
  * GET http://localhost:3000/api/:id? --> Conseguir un prdoducto por id.
  * GET http://localhost:3000/ --> Conseguir todos los productos.
  * </pre>
  * @memberof controllers 
  * @method getOneProduct 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {json} objeto con todas las entries encontradas
  * @throws {error} 
  */
const getOneProduct = async (req,res) => {
    if (req.params.id) { // con ID
        try {
            let products = await Product.find({id:req.params.id},'-_id -__v'); //[{}]
            res.status(200).json(products); // Respuesta de la API para 1 producto {}
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({
                msj: `ERROR: ${error}`
            });
        }
    } else { // sin ID --> TODOS los products
        try {
            const list = await Product  //llamamos a base de datos products y al schema
                .find({}, '-_id -__v' ) //decimos lo que queremos que no nos traiga de los datos de products
                .populate('provider', 'company_name address -_id')  //decimos los campos que queremos y no queremos de la segunda tabla.
            console.log(list); // []
            res.status(200).json(list); // Respuesta de la API para muchos productos
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({
                msj: `ERROR: ${error}`
            });
        }
    }
}



/** 
  * <pre>
  *  //* CREATE ONE PRODUCT FROM A COMANY NAME
  * POST  http://localhost:3000/api/products --> Crear un prdoducto asignándolo a un proveedor ya existente.
  * </pre>
  * @memberof controllers 
  * @method createProduct 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {json} objeto con mensaje json de confirmación de la creación de producto
  * @throws {error} 
  */
const createProduct = async (req, res) => {
    const { provider, ...newProduct } = req.body;
    console.log(provider);
    console.log('body request');
    try {
      const providerData = await Provider.findOne({ company_name: provider });
        console.log(providerData);
      if (providerData) {
        let response = await new Product({ ...newProduct, provider: providerData.id });
        console.log('provider encontrado');
        let answer = await response.save();
        res.status(201).json({
          msj: `Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`,
          product: answer
        });
      } else {
        res.status(400).json({
          msj: `El proveedor "${provider}" no existe en la base de datos.`
        });
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      res.status(400).json({
        msj: `ERROR: ${error}`
      });
    }
  };
  

  /** 
  * <pre>
  *  //* FIND ALL PRODUCTS FORM A SINGLE PROVIDER
  * POST  http://localhost:3000/api//products/:company_name --> Todos los productos de un proveedor
  * </pre>
  * @memberof controllers 
  * @method createProduct 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {json} todos los productos del proveedor asignado
  * @throws {error} 
  */
  const findProductFromProvider = async (req, res) => {
    const { company_name } = req.params;
    console.log(company_name);
    try {
      const providerData = await Provider.findOne({ company_name });
      console.log(providerData);
      if (providerData) {
        const response = await Product.find({ provider: providerData._id },'-_id -__v');
        console.log(`Productos de ${company_name} encontrados`);
        res.status(200).json(response);
      } else {
        res.status(400).json({
          msj: `El proveedor "${company_name}" no existe en la base de datos.`
        });
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      res.status(500).json({
        msj: `ERROR: ${error}`
      });
    }
  };
  





module.exports = {
    getOneProduct,
    createProduct,
    findProductFromProvider
}





// const productData = {
//     id: 2,
//     title: "Super López XXL: La isla de basura",
//     price: 16.90,
//     description: "La isla de basura, el la que Superlópez se las verá con un malvado delincuente que ha dado vida, cual doctor Frankenstein, a una isla de basura en pleno mar con intención de utilizarla para sus malvados fines. ",
//     image: "https://www.superhumor/superlopezXXL/collection/vol5/a9wifnsre23.jpg"
//   };
  
//   insertProductFromProvider("Friki Madrid", productData);


// use local
// db.products.insertOne({
//     "id": 13
//     "title": "Ultimate Comics X-Men By Nick Spencer - Volume 1",
//     "price": 12.00,
//     "description": "The biggest mutant cover-up has gone public as the true history of the X-Gene is revealed.",
//     "provider": "Generación X"
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