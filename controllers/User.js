const User = require ('../models/User')
const Bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const privateKey = 'secret'

module.exports = {
    // create : function (res,req,next){
    //     User.create({
    //         email : req.body.email,
    //         password : req.body.password,
    //     }).then (response => res.json(response))
    //     .catch (err => {
    //         throw (err)
    //     })
    // },
    createData: (req, res) => {
User.create({
    email: req.body.email,
    password: req.body.password
}).then(result => {
    res.json(result)
})
    },

    authenticated: function(req,res,next){
        User
        .findOne({email : req.body.email})
        .then ((response , err) => {
            if (err)
            next (err)
            else {
                console.log(response);
                
                if (response != null && Bcrypt.compareSync(req.body.password, response.password)){
                    jwt.sign({
                        id : response._id
                    }, privateKey, {expiresIn: 60 * 60}, (err, token) => {
                        res.json (token)
                        console.log(token);
                        
                    })
                }
                else {
                    res.json ({status:err})
                }
            }
        })
        .catch(err => {
            throw(err)
        })
    }
}