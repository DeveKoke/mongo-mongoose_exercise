// Importar el modelo de la BBDD
const Provider = require ('../models/schemas/providers_schema');
require('../utils/db_mongo');


//*  GET ALL PROVIDER'S DATA
const getAllProviders = async (req, res) => {
  console.log('estamos en la función');
  try{ 
    const providers = await Provider.find({},  '-_id -__v');
  console.log('hemos encontrado los providers');
    res.status(200).json(providers);

  }catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


//* CREATE A PROVIDER
const createProvider = async (req, res) => {
    try {
      const { company_name, CIF, address, url_web } = req.body;
  
      const providerData = new Provider({
        company_name,
        CIF,
        address,
        url_web
      });
  
      const result = await providerData.save();
  
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports =  {
    getAllProviders,
    createProvider
  };

  
