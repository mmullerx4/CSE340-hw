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

/* ************************
 * Get all inventory items and classification_name by classification_id
 * ************************ */
async function getInventoryByClassificationId(classification_id) { //declares async function and passes variable containing classification parameter
    try {    //opens a try - catch block.
        const data = await pool.query(  //SQL query to read inventory and classification using INNER JOIN
            "SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1", //this is one string
            [classification_id] //this is part of the function
        )
        return data.rows //sends the data as an array back to controller (where function was called)
    } catch (error) {  //ends try and opens the catch with an error variable to store any error
        console.error("getclassficationsbyid error " + error)  //displays errors
    }
}

/* ****************************
 * Get data for specific vehicle
 ****************************** */
async function getInventoryByInvId(inv_id) {
    try {
        const data1 = await pool.query(
            "SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1",
            [inv_id]
        )
        return data1.rows //sends the data as an array back to controller (where function was called)
    } catch (error) {  //ends try and opens the catch with an error variable to store any error
        console.error("getinventorybyid error " + error)  //displays errors
    }
}




module.exports = {getClassifications, getInventoryByClassificationId} //exports the function for use elsewhere.
//module.exports = {getInventory, getInventoryByInvId}