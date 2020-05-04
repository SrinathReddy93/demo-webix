const userModule = require("../modules/user");

module.exports = {
   configure : function(app){
        app.get('/getAllUser', (req, res)=>{
           console.log(req.url)
           try {
                let start = 0;
                if(req.query.start) {
                  start = parseInt(req.query.start);
                }
                userModule.getAll(start)
                .then(result => {
                        return res.json(result);					
                })
                .catch(err=>{
                        throw err
                });
           } catch(e) {
                console.log("Exception", e);
                return res.json({data : [], message : "Error"})
           }
        }); 
        app.get('/getlUsersForChart', (req, res)=>{
           console.log(req.url)
           try {
                userModule.getlUsersForChart()
                .then(result => {
                        return res.json(result);					
                }).catch(err=>{
                        throw err
                });
           } catch(e) {
                console.log("Exception", e);
                return res.json({data : [], message : "Error"})
           }
        }); 
        app.post('/addUser', (req,res)=>{
             console.log(req.url);
             try {
                 userModule.adduser(req.body)
                .then(value=>{
                        return res.json({success:1, message:"user added sucessfuly."})
                }).catch(err=>{
                        throw err
                });
             } catch(e) {
                return res.json({success:0, message:"user not added sucessfuly."})
             }   
        });   
        app.put('/updateUser/:id', (req,res)=>{
             console.log(req.url);
             try {
                 userModule.updateUser(req.body)
                .then(value=>{
                        return res.json({success:1, message:"user update sucessfuly."})
                }).catch(err=>{
                        throw err
                });
             } catch(e) {
                return res.json({success:0, message:"user not update sucessfuly."})
             }   
        });   
        app.delete('/removeUser/:id', (req, res)=> {
              console.log(req.url);
               try {
                   userModule.removeUser(req.body)
                        .then(value=>{
                                return res.json({success:1, message:"user removed sucessfuly."})
                        }).catch(err=>{
                                throw err
                        });
                } catch(e) {
                        return res.json({success:0, message:"user not removed sucessfuly."})
                } 
        });    
   }
}       