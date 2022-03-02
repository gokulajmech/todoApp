const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const jwtd=require("jwt-decode");
const secret='546uydatsqwett6d@#$@$%kfjgiug87435';
const hash=async(password)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashValue=await bcrypt.hash(password,salt);
        return hashValue;
    }
    catch(err){
        return err;
    }
    
}

const hashCompare=async(password,hashValue)=>{
    try{
        return await bcrypt.compare(password,hashValue);  
    }
    catch(err){
        return err;
    }
}

const createJWT=async({email})=>{
    return await jwt.sign({email},secret,{expiresIn:"1hr"});
}

const authentication=async(token)=>{
    let decode=await jwtd(token);
    if (Math.round(new Date/1000) <=decode.exp)
    {
        return {verification:true,email:decode.email}
    }
    else{
        return {verification:false,email:decode.email}
    }
}

module.exports={hash,hashCompare,createJWT,authentication};