import React,{useState,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';


function Create() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [authentication,setAuthentication]=useState('');
    const navigate=useNavigate();
    let submitHandler=async()=>{
       let res= await axios({
            method:'post',
            url:`${env.API_URL}create-user`,
            data:{
                email:email,
                password:password,
                list:[]
            },
            responseType:'json'
        });
        // console.log(res);
        if(res.data.statusCode===409)
        {
            // window.alert("User Already exists");
            setEmail('');
            setPassword('');
            setAuthentication(false);
        }
        else if(res.data.statusCode===200)
        {
            // window.alert("Account created successfully");
            setEmail('');
            setPassword('');
            setAuthentication(true);
            window.setTimeout(()=>{navigate('/');},2000);
            
        }
    }
  
    return <>
        <div className='back-ground'> 
        <div className='login-box'>
            {   (authentication===false)?<h3 style={{color:'red'}}>*User Already exists</h3>:<></> }
            {   (authentication===true)?<h3 style={{color:'blue'}}>Account Created</h3>:<></> }
            <div>
                <label htmlFor="id">Email/UserID</label><br></br>
                <input type='text' className="email-input" id="id" placeholder='Enter Valid ID' onChange={(e)=>{setEmail(e.target.value)}} value={email} required />
            </div><br></br>
            <div>
                <label htmlFor="password">Password</label><br></br>
                <input type='password' className="password-input" id="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
            </div>
            <br></br>
            <div>
                <button className='btn btn-primary' onClick={()=>{submitHandler()}}>Sign up</button>
                <Link to='/'>
                &nbsp;&nbsp;&nbsp;<span className='create-link'>Home</span>
                    </Link>
                    
            </div>
        </div>

    </div>
    </>
}

export default Create
