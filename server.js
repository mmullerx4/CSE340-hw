/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
//const expressEjsLayouts = require("express-ejs-layouts")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const baseController = require("./controllers/baseController") //crashed

/* *************************
 * View Engine and Templates
 ***************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root


/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
 
app.get("/", baseController.buildHome)
 //res.render("index", {title: "Home"})
//Inventory routes
 app.use("/inv", require("./routes/inventoryRoute")) //app.use() Express function that directs app to use resources for parameters
//"/inv" is a keyword in app to work with enventory-related
//"require..." is command to bring inventoryRoute file into scope of the server.js (anthing that starts with "/inv")

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
