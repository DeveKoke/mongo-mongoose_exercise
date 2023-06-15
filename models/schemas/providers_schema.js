const mongoose = require('mongoose');


// * ESTABLECEMOS VALIDACIÓN Y MODELO DE SCHEMA
const dataSchema = {
company_name:  { 
        type: String, 
        required: true,
        unique: true
    },
CIF: { 
    type: Number, 
    required: true, 
    unique: true
},
address: { 
    type: String, 
    required: true 
},
url_web: { 
    type: String, 
}
}
// * CREAMOS EL ESQUEMA
const providerSchema = mongoose.Schema(dataSchema);

// * CREAMOS COLECCIÓN CON MODEL
var Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;


// const providerData = new Provider({
//     _id: new mongoose.Types.ObjectId(),
//     company_name: "Friki Madrid",
//     CIF: 12345,
//     address: "Av. del Mediterráneo, 37, LOCAL, 28007 Madrid",
//     url_web: "http://www.frikimadrid.com/"
// });

// const providerData = new Provider({
//     _id: new mongoose.Types.ObjectId(),
//     company_name: "Tu Casa Friki",
//     CIF: 12369,
//     address: "C/ de Pedro Tezano, 17, Local B, 28039 Madrid",
//     url_web: "https://tucasafriki.es/"
// });
// const providerData = new Provider({
//     _id: new mongoose.Types.ObjectId(),
//     company_name: "Generación X",
//     CIF: 122569,
//     address: "C. de la Puebla, 15, 28004 Madrid",
//     url_web: "http://www.generacionx.es/"
// });
// const providerData = new Provider({
//     _id: new mongoose.Types.ObjectId(),
//     company_name: "Arte9",
//     CIF: 138569,
//     address: "C. de la Cruz, 37, 28012 Madrid",
//     url_web: "http://www.arte9cruz.es/"
// });
// const providerData = new Provider({
//     _id: new mongoose.Types.ObjectId(),
//     company_name: "Metrópolis",
//     CIF: 134999,
//     address: "C. de la Luna, 11, 28004 Madrid",
//     url_web: "http://www.metropoliscomicsmadrid.es/"
// });
// const providerData = new Provider({
//     _id: new mongoose.Types.ObjectId(),
//     company_name: "PoPland",
//     CIF: 171199,
//     address: "C. de Manuela Malasaña, 24, 28004 Madrid",
//     url_web: "http://www.popland.es/"
// });

//* Guardar en la BBDD
// providerData.save()
// .then((data)=>console.log(data))
// .catch(err=>console.log(err));