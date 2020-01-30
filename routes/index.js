
var User = require('../schema/User')
var express = require('express');
var router = express.Router();


var oxr = require('open-exchange-rates');
oxr.set({ app_id: '2442753a9509483f995c8cccc7edf686' })

var options = {
  min: 0
  , max: 30
  , integer: true
}




/* fs.watchFile(path.join(__dirname, 'file.txt'),function( curr,prev,res){
  
  var speedData = fs.readFileSync(path.join(__dirname, 'file.txt'), 'utf8');
  console.log(speedData)
 // res.render('index', { speedData: speedData});  

}) */

/* GET home page. */
router.get('/', async function  (req, res, next) {

var rateData = [];


  User.find({})
    .then(docs => {
  


       zimbabwe = docs[0].sell
        oxr.latest( function () {
      console.log(oxr.rates)


      rateData.push({
        "name": "Zimbabwean Dollar",
        "symbol": "ZWL",
        "buy": parseFloat((1 / zimbabwe).toFixed(4)),
        "selling":zimbabwe,
        "flag": 'zw'
    
      })
    
        rateData.push({
          "name": "Botswana Pula",
          "symbol": "BWP",
          "buy": parseFloat((1 / oxr.rates.BWP).toFixed(4)),
          "selling":parseFloat(oxr.rates.BWP.toFixed(4)) ,
          "flag": 'bw'
    
        })
    
        rateData.push({
          "name": "Canadian Dollar",
          "symbol": "CAD",
          "buy": parseFloat((1 / oxr.rates.CAD).toFixed(4)),
          "selling": parseFloat(oxr.rates.CAD.toFixed(4)),
          "flag": 'ca'
    
        })
    
        rateData.push({
          "name": "Chinese Yuan",
          "symbol": "CNY",
          "buy": parseFloat((1 / oxr.rates.CNY).toFixed(4)),
          "selling": parseFloat(oxr.rates.CNY.toFixed(4)),
          "flag": 'cn'
    
        })
    
    
        rateData.push({
          "name": "Euro",
          "symbol": "EUR",
          "buy": parseFloat((1 / oxr.rates.EUR).toFixed(4)),
          "selling": parseFloat(oxr.rates.EUR.toFixed(4)),
          "flag": 'gb'
    
        })
    
        rateData.push({
          "name": "British Pound",
          "symbol": "GBP",
          "buy": parseFloat((1 / oxr.rates.GBP).toFixed(4)),
          "selling": parseFloat(oxr.rates.GBP.toFixed(4)),
          "flag": 'gb'
    
        })
    
    
        rateData.push({
          "name": "South African Rand",
          "symbol": "ZAR",
          "buy": parseFloat((1 / oxr.rates.ZAR).toFixed(4)),
          "selling": parseFloat(oxr.rates.ZAR.toFixed(4)),
          "flag": 'za'
    
        })
    
        rateData.push({
          "name": "Zambian Kwacha",
          "symbol": "ZMW",
          "buy": parseFloat((1 / oxr.rates.ZMW).toFixed(4)),
          "selling": parseFloat(oxr.rates.ZMW.toFixed(4)),
          "flag": 'zm'
    
        })
    
      rateData.push({
          "name": "Australian Dollar",
          "symbol": "AUD",
          "buy": parseFloat((1 / oxr.rates.AUD).toFixed(4)),
          "selling": parseFloat(oxr.rates.AUD.toFixed(4)),
          "flag": 'au'
    
        })
  
        var newData =  rateData.splice(0,9)
          
      res.render('index',{rateDatas:newData});
      
     
      }
      
      
      );
   

    })
    .catch(err => {
        console.log(err)
    });

});








/* send data */
router.get('/data', function (req, res, next) {
res.render('form')

});


router.post("/data", (req, res, next) => {

  
    User.updateOne({name:"Zim"},{$set:{sell:req.body.sell}})
     .then(resp =>{
       res.redirect('/')
     })

    }

);




module.exports = router;
