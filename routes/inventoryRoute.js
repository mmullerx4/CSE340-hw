//Needed Resources
const express = require("express") //brings Express into the scope of the file
const router = new express.Router() //uses Express to create a new Router object....using separate router files for specific elements keeps server.js file smaller
const invController = require("../controllers/invController") //brings in inventory controller into this router document's scope to be used.

//Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId); //the route divided into three elements: "get" that the route will listen for the GET, /type/:classificationId, invController.buildByClassification
router.get("/detail/:InvId", invController.buildbyInvId); //the route to InvId...links to the function on 


module.exports = router; //exports the router object for use elsewhere.

