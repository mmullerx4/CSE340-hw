const { Pool } = require("pg") //imports the Pool functionality from the pg package. 
require("dotenv").config() //a package imported about database location
/* ***************
* Connection Pool
* SSL Object needed for local testing of app
* But will cause problems in production environment
* If - else will make determination which to use
* *************** */
let pool  //a variable to hold functionality
if (process.env.NODE_ENV == "development") {    //test to see if code exists...no value there yet
    pool = new Pool ({    //creates a new pool instance from imported pool classe
        connectionString: process.env.DATABASE_URL, //indicates how pool will connect to database
        ssl: {                          //how the Secure Socket Layer(ssl) is used w/database...only in remote connection & exists in dev. env.
            rejectUnauthorized: false,
        },
    })

// Added for troubleshooting queries
// during development
module.exports = {
    async query(text, params) {
        try {
            const res = await pool.query(text, params)
            console.log("executed query", { text })
            return res
        } catch (error) {
            console.error("error in query", { text })
            throw error
        }
    },
}
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    })
    module.exports =  pool
}


