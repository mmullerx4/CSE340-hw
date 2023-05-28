const invModel = require("../models/inventory-model") //brings inventory-model.js file into scope and stores into a invModel variable
const utilities = require("../utilities/") //brings the utilities > index.js file into scope 

const invCont = {} //creates empty object in invCont variable

/* ***************************
 * Build inventory by classification view
 * *************************** */
invCont.buildByClassificationId = async function (req, res, next) {   //creates async anonymous functipn which accepts request, response, next stored in buildByClassification method
    const classification_id = req.params.classificationId   //collects the classification_id as named parameter through URL and stores in classification_id variable
    const data = await invModel.getInventoryByClassificationId(classification_id) //calls the get... awaits return and stores in "data"
    const grid = await utilities.buildClassificationGrid(data) //calls utility function to build a grid for all vehicles
    let nav = await utilities.getNav()  //calls the function to build the nav bar for view and stores in "nav"
    const className = data[0].classification_name  //extracts the name of the classification from the data returned and stores in className
    res.render("./inventory/classification", {   //calls the Express render function to return a view named classification-view.
      title: className + " vehicles",  //build the "title" for dynamic head partial
      nav, //contains nav variable and will display nav bar
      grid, //contains the html string containing grid of inventory items
    }) //end the "render" function
}
 
invCont.buildbyInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data1 = await invModel.getInventoryByInvId(inv_id)
  const vehicleDetail = await utilities.buildVehicleDetail(data1)
  let nav = await utilities.getNav()
  const classMake = data1[0].inv_make
  const classModel = data1[0].inv_model
  res.render("./inventory/vehicle", {
    title: classMake + " " + classModel,
    nav,
    vehicleDetail,
  })
  
}




module.exports = invCont