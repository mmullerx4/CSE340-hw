/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/ //imports
const express = require("express")
//const expressEjsLayouts = require("express-ejs-layouts")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const baseController = require("./controllers/baseController") 
const utilities = require("./utilities/")
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
//app.get("/", baseController.buildHome)
app.get("/", utilities.handleErrors(baseController.buildHome)) //Express route handler watching for the base route "/", with no other URL elements.
 //res.render("index", {title: "Home"}) //the middleware function that catches errors & sends to Express Error Handler.
//Inventory routes
app.use("/inv", require("./routes/inventoryRoute")) //app.use() Express function that directs app to use resources for parameters
//"/inv" is a keyword in app to work with enventory-related
//"require..." is command to bring inventoryRoute file into scope of the server.js (anthing that starts with "/inv")
/* */
//File Not Found Route - must be last route in list
app.use(async (req, res, next) => { //the Express use function containing an asynchrounous arrow function
  next({status: 404, message: 'Sorry, we appear to have lost that page.'}) // the next function to pass control to the next function in the processing chain
}) //ends the arrow and use functions.
/* ***********************
 * Express Error Handler
 * Place after all other Middleware
 * Unit 3 basic error handling activity
 *************************/
app.use(async (err, req, res, next) => { //Express function accepts the default Express arrow function to be used with errors
  let nav = await utilities.getNav()  //builds the navigation bar for the error view
  console.error('Error at: "${req.originalUrl}": ${err.message}') //a console statement to show the route and error
  if(err.status == 404) { message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", { //calls the "error.ejs" view
    title: err.status || 'Server Error', //sets the value of the "title" for the view. It will use the status code or "Server Error" if not status code is set.
    message, //only generic message in line 8 sent.
    nav //sets the navigation bar for use in the error view
  }) //ends the render function
}) //ends the arrow and app.use functions.
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
