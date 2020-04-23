const Heroes = require("../models/Heroes");

module.exports = {
  create: (req, res, next) => {
    Heroes.create(
    {
      name: req.body.name,
      born: req.body.born,
      dead: req.body.dead,
      description: req.body.description,
      establishment: req.body.establishment,
    },
    (err, result) => {
    if (err) next(err);
    else {
        res.json({ status: "success", data: result });
      }
    }
    );
},
createData: (req, res, next) => {
    Heroes.create(
    {
      name: req.body.name,
      born: req.body.born,
      dead: req.body.dead,
      description: req.body.description,
      establishment: req.body.establishment,
    }).then(result => res.json(result))
    .catch(err => res.json(err))
},
getData : (req, res, next) =>{
    Heroes.find({}).then(result => {
        res.json({status : "success", data : result })
    }).catch(err => (err))
},
getAllData : (req, res, next) =>{
    Heroes.find({},
    (err, result) => {
    if (err) next (err);
    else{
        res.json({status : "succes", data : result})
    }    
    })
    
},
getDatabyId: (req, res) => {
    Heroes.findById(req.param.heroesId)
    .then((result) =>res.json(result) )
    .catch((err) => res.json(err));

},
deleteById: (req, res) =>{
    Heroes.findByIdAndDelete(req.param.heroesId)
    .then((result)=> res.json())
    .catch((err)=> res.json(err))
},
editById: (req, res) =>{
    Heroes.findByIdAndUpdate(req.param.heroesId,
    {
      name: req.body.name,
      born: req.body.born,
      dead: req.body.dead,
      description: req.body.description,
      establishment: req.body.establishment,
    })
    .then((result)=> res.json(result))
    .catch((err)=> res.json(err))
}
};