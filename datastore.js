var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "dtbs.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE usertbl (
            username VARCHAR PRIMARY KEY, password VARCHAR, hush VARCHAR)`,(err)=>{
                if (err){
                    console.log("user table found")
                }
                else{
                    
                    var insert = 'INSERT INTO usertbl VALUES (?,?,?)'
                    db.run(insert,["admin",md5("admin"),"admin"+md5("admin")])
                }
            });

            db.run(`CREATE TABLE remotekeytbl (
                brand VARCHAR, start VARCHAR, key VARCHAR, stop VARCHAR, function VARCHAR, id VARCHAR PRIMARY KEY)`,(err)=>{
                    if (err){
                        console.log("remote code table found")
                    }
                    else{
                        var insert = 'INSERT INTO remotekeytbl VALUES (?,?,?,?,?,?)'
                        db.run(insert,["custom","0x00","0x20","0xFF","test",("custom"+"_"+"test")])
                    }
                });
    }  
    
});


module.exports = db

