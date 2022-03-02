
var express = require('express');
var router = express.Router();
const {mongodb,MongoClient,dbUrl}=require('../dbConfig');
const{hash,hashCompare,createJWT,authentication}=require('../library/auth');

/* GET users listing. */
router.get('/:token', async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);  
    try{
      const decode=await authentication(req.params.token);
      if(decode.verification===true)
      {
        const db=await client.db('ToDoApp');
        let user=await db.collection('login').findOne({email:decode.email})
        console.log("get works"+user)
        if(user)
        {
          res.send({
            message:user.list
          }) 
        }
        else{
          res.send({
            message:"no data"
          }) 
        }
          
      }
  
  else{
    res.send({
      message:"Session Expired"
    })
  }
    }
    catch(err){
      res.send({
        message:err
      })
    }
    finally{
      client.close();
    } 
});

router.post('/create-user',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);
  try{
    const db=await client.db('ToDoApp');
    let user=await db.collection('login').findOne({email:req.body.email});
    if(user)
    {
      res.send({
        message:"User Already Exists",
        statusCode:409
      })
    }
    else{
      if(req.body.email.length>0)
      {
        let hashValue=await hash(req.body.password);
        req.body.password=hashValue;
        let user=await db.collection('login').insertOne(req.body);
        res.send({
          message:"Account Created successfully",
          statusCode:200
        })
      }
      else
      {
        res.send({
          message:"Request body is empty"
        })
      }
     
    }
  }
  catch(err){
    res.send({
      message:err
    })
  }
  finally{
    client.close();
  }
})


router.post('/',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);
  try{
    let db=await client.db('ToDoApp');
    let user=await db.collection('login').findOne({email:req.body.email});
    if(user)
    { 
      let match=await hashCompare(req.body.password,user.password);
      if(match===true)
      {
        let token=await createJWT({email:req.body.email})
        res.send({
          message:true,
          statusCode:200,
          token:token
        
        })
      }
      else if(match===false){
        res.send({
          message:"Invalid user credentials"
        })
      }
    }
    else{
      res.send({
        message:"Invalid user credentials"
      })
    }
  }
  catch(err)
  {
    res.send({
      message:err
    })
  }
  finally{
     client.close()
  }
})

router.post('/add/:data/:token',async(req,res)=>{
  
  try{
   const client=await MongoClient.connect(dbUrl);
  const decode=await authentication(req.params.token);
   console.log(req.params.data)
 console.log(req.params.token)
  if(decode.verification===true)
  {
    
      const newTodo=req.params.data;
      console.log(newTodo)
      const db=await client.db('ToDoApp');
      const user=await db.collection('login').findOne({email:decode.email});
      let data=user.list;
      data.push(req.params.data)
      console.log(data)
      let doc=await db.collection('login').updateOne({email:decode.email},{$set:{list:data}});
      console.log(doc)
      res.send({
        message:"Task Added successfully"
      })
  }
  else
  {
    res.send({
      message:"Session Expired"
    })
  }
}
catch(err){
  res.send({
    mesage:err
  })
}
finally{
  client.close()
}
})


router.put('/delete/:data/:token',async(req,res)=>{
  
  try{
   const client=await MongoClient.connect(dbUrl);
  const decode=await authentication(req.params.token);
  // console.log(req.params.data)
  // console.log(req.params.token)
  if(decode.verification===true)
  {
    
      const newTodo=req.params.data;
      console.log(newTodo)
      const db=await client.db('ToDoApp');
      const user=await db.collection('login').findOne({email:decode.email});
      let data=user.list;
      data.splice(data.indexOf(req.params.data),1);
      console.log(data)
      let doc=await db.collection('login').updateOne({email:decode.email},{$set:{list:data}});
      console.log(doc)
      res.send({
        message:doc
      })
  
   
  }
  else
  {
    res.send({
      message:"Session Expired"
    })
  }
}
catch(err){
  res.send({
    mesage:err
  })
}
finally{
  client.close()
}
})



module.exports = router;
