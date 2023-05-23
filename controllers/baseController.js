const utilities = require("../utilities/") //imports an index.js from utilities
const baseController = {} //empty object

baseController.buildHome = async function(req, res){ //creates an anonymous, asychrounous functin assigns the function to buildHome (a method of baseController object)
    const nav = await utilities.getNav() //calls a getNav()
    res.render("index", {title: "Home", nav}) //is the Express command to use EJS to send view back to client using the response object.
}

module.exports = baseController