const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'test'
})
db.connect()

router.get('/list',async(req,res)=>{
  db.query("SELECT * FROM test",(err,result)=>{
    if(err)throw err;
    try {
      res.status(200).json({
        data:result
      })
    }
    catch(err){
      res.status(400).json({
        message:'some error occured',
        err
      })
    }
  })
})
router.get('/number',async(req,res)=>{
  db.query("SELECT number FROM number",(err,result)=>{
    if(err)throw err;
    res.send(result)
  })
})

router.get('/:id',async(req,res)=>{
  let {id} = req.params;
  id = Number(id);
  db.query("SELECT * FROM test",(err,result)=>{
    if(err)throw err;
    try{
      let player = result.find(player => player._id === id)
      res.status(200).json({
        data:player
      });
    }catch(err){
      res.status(400).json({
        message:'some error occured',
        err
      })
    }
  })
})

//post example
// router.post('/post',(req,res)=>{
//   let ifm = {
//     name:req.body.name,
//     runs:req.body.runs
//   }
//   db.query("INSERT INTO test (name,runs) VALUES (?)",ifm,(err,result)=>{
//     if(err)throw err;
//     console.log(result)
//   })
//   res.send(ifm)
// })



router.post('/plus',(req,res)=>{
  db.query("UPDATE number SET number = number + 1 WHERE number = number ")
  db.query("SELECT number FROM number",(err,result)=>{
    if(err)throw err;
    console.log(result)
    res.send(result)
  })
})
router.post('/less',(req,res)=>{
  db.query("UPDATE number SET number = number - 1 WHERE number = number ")
  db.query("SELECT number FROM number",(err,result)=>{
    if(err)throw err;
    console.log(result)
    res.send(result)
  })
})

module.exports = router;