// in an M-V-C approach, the "Model" is where all data interactions are stored.
//Our inventory-model.js document is where we'll write all the functions to interact
//with the classification and inventory tables of the database, since they are integral to our inventory.

const pool = require("../database/") //imports the database connection file index.js.....could add index.js on 

/* ***************************
 * Get all classification data
 * *************************** */
async function getClassifications() {  //creates asynchrounous function(that returns promise)
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name") //returns the SQL query
}

module.exports = {getClassifications} //exports the function for use elsewhere.