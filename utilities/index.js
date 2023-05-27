const invModel = require("../models/inventory-model") //requires inventory-model to get data from db
const Util = {} //creates empty Util object

/* *************************
 * Constructs the nav HTML unordered list
 *************************** */
Util.getNav = async function (req, res, next) { //creates asynch function that excepts methods as parameters(in getNav)
    let data = await invModel.getClassifications() //calls the getClassifications function and stores in "data"
    let list = "<ul>" //creates variable list..note will change
    list += '<li><a href="/" title="Home page">Home</a></li>' //+= means append
    data.rows.forEach((row) => {
        list += "<li>" //appends an opening list item to string in "list"
        list += //appends code from lines 14-20 as a string to "list"
        '<a href="/inv/type/' +
        row.classification_id + //value found in array added to link route
        '"title="See our inventory of ' + //string that includes beginning of HTML anchor
        row.classification_name +
        ' vehicles">' + //attribute of the anchor
        row.classification_name +  //value from array
        "</a>"
    list += "</li>" //classification name
  })
  list += "</ul>"   //the closing list item being added to the "list"
  return list
}

/* *************************************
* Build the classification view HTML
* ************************************** */
Util.buildClassificationGrid = async function(data){ //delares function as asynch & expects a data array as parameter
  let grid     //variable to hold string
  if(data.length > 0){   //if to see if array is not empty
    grid = '<ul id="inv-display">' //creates unordered list element & adds it to the grid variable
    data.forEach(vehicle => {   //forEAch loop to break each element of the data array into vehicle object
      grid += '<li>'  //lines 9-25 builds single HTML <li>
      grid += '<a href="../../inv/detail/'+ vehicle.inv_id //surrounds <img>
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">' //div for horizontal rul
      grid += '<hr />'
      grid += '<h2>'  //contains a <a> with make & model
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View '
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' //<span> contains a formatted price in US dollars
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid +='</li>'
    })  //closes forEach loop
    grid += '</ul>' //closes unordered list
  } else {  //ends if and opens else for if data array is empty
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>' //stores <p> with a message

  } //ends the else
  return grid //returns the variable to the calling location
} //ends the function

/* *******************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 * ******************************* */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next) //this is one function
//"Util.handleErros" delcares the property which is appended to the "Util" object.
//"fn => (req, res, next) =>" is an arror function named "fn" which accepts reques, response and next parameters along with another arrow function.
// "Promise.resolve(fn(req, res, next)" is a "wrapper" that accepts a function as a parameter of the "Promise.reslove" function...see more
//".catch(next) is if there is an error, then the Promise "fails", the error that caused the failure is "caught" and forwarded to the next process in the app. chain.
//via the "next" function the Express Error Handler will catch the error and then build and deliver the error view to the client.




module.exports = Util //end function started on line 7