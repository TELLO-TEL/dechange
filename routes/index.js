
var User = require('../Schema/User')
var mongoose = require('mongoose')
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var rn = require('random-number');
var oxrTransform = require('oxr-to-linear-presets');
const https = require('https');

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

      rateData.push({
        "name": "Zimbabwean Dollar",
        "symbol": "ZWL",
        "buy": 1 / zimbabwe,
        "selling":zimbabwe,
        "flag": 'zw'
    
      })
    
        rateData.push({
          "name": "Botswana Pula",
          "symbol": "BWP",
          "buy": 1 / oxr.rates.BWP,
          "selling": oxr.rates.BWP,
          "flag": 'bw'
    
        })
    
        rateData.push({
          "name": "Canadian Dollar",
          "symbol": "CAD",
          "buy": 1 / oxr.rates.CAD,
          "selling": oxr.rates.CAD,
          "flag": 'ca'
    
        })
    
        rateData.push({
          "name": "Chinese Yuan",
          "symbol": "CNY",
          "buy": 1 / oxr.rates.CNY,
          "selling": oxr.rates.CNY,
          "flag": 'cn'
    
        })
    
    
        rateData.push({
          "name": "Euro",
          "symbol": "EUR",
          "buy": 1 / oxr.rates.EUR,
          "selling": oxr.rates.EUR,
          "flag": 'gb'
    
        })
    
        rateData.push({
          "name": "British Pound",
          "symbol": "GBP",
          "buy": 1 / oxr.rates.GBP,
          "selling": oxr.rates.GBP,
          "flag": 'gb'
    
        })
    
    
        rateData.push({
          "name": "South African Rand",
          "symbol": "ZAR",
          "buy": 1 / oxr.rates.ZAR,
          "selling": oxr.rates.ZAR,
          "flag": 'za'
    
        })
    
        rateData.push({
          "name": "Zambian Kwacha",
          "symbol": "ZMW",
          "buy": 1 / oxr.rates.ZMW,
          "selling": oxr.rates.ZMW,
          "flag": 'zm'
    
        })
    
      rateData.push({
          "name": "Kenyan Shilling",
          "symbol": "KES",
          "buy": 1 / oxr.rates.KES,
          "selling": oxr.rates.KES,
          "flag": 'ke'
    
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
