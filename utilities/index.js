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

module.exports = Util //end function started on line 7