const express = require('express');
const app = express();
const port = 3000;
const apiRoutes = require('./routes/apiRoutes');
require('./utils/db_mongo');

app.use(express.json()); 
app.use(express.urlencoded ({extended: true}));

app.use('/api',apiRoutes);


app.listen(port, () => console.info(`>listening at ${port}`))