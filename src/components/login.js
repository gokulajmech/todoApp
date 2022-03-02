import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';
 import {todoContext} from '../App';



function Login() {  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [authentication,setAuthentication]=useState('');

    const navigate=useNavigate();
   const context=useContext(todoContext);

    let submitHandler=async()=>{
        let res=await axios({
            method:'post',
            url:`${env.API_URL}`,
            data:{
                email:email,
                password:password
            },
            responseType: 'json'
        })
        // console.log(res.data.message);
        // console.log(res.data.token)
        if(res.data.message===true)
        {
           context.setToken(res.data.token);
        //   console.log(res.data.token);
            navigate('/List');
        }
        else{
            setEmail('');
            setPassword('');
            setAuthentication(false);
        }
    }

    return <>
    <div className='back-ground'>
        <div className='login-box'>
            {(authentication===false)?<h3 style={{'color':'red'}}>*Invalid Credentials</h3>:<></>}
            
               
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
                <button className='btn btn-primary' onClick={()=>{submitHandler()}}>Sign in</button>

            <Link to="/Create">
            &nbsp;&nbsp;&nbsp;<span className='create-link'>Crete new Account</span>
            </Link>
                

            </div>
        </div>

    </div>
    </>
}

export default Login
