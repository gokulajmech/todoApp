import React,{useEffect,useContext,useState} from 'react';
import axios from 'axios';
import env from 'react-dotenv';
 import {todoContext} from '../App';
import { useNavigate,useParams } from 'react-router-dom';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

function List() {
    
    const params=useParams();
    const navigate=useNavigate();
    const [task,setTask]=useState([]);
    const [newtask,setNewtask]=useState('');
   const context=useContext(todoContext);
   

    let getData=async()=>{
                                let res=await axios({
                                        method:'get',
                                        url:`${env.API_URL}${context.token}`,
                                        responseType:'json'
                                    }).then((res)=>setTask(res.data.message))
                                
                               
                          }
  useEffect(()=>{
    getData();
   },[]);
   
    let logoutHandler=()=>{
        navigate('/');
    }
    let addHandler=async()=>{
        let res= await axios({
            method:'post',
            url:`${env.API_URL}add/${newtask}/${context.token}`,
            responseType:'json'
        })
     
        getData();
        setNewtask('');
    }
    let deleteHandler=async(e)=>{
        // console.log(e)
        let res = await axios({
            method:'put',
            url:`${env.API_URL}/delete/${e}/${context.token}`,
            responseType:'json'
        });
        // console.log(res);
        getData();     
    }
    window.onload=()=>{logoutHandler()};
 
    
        

    return <>
    
        <div className='back-ground'>
        <div className='header'><button className='btn btn-danger'  onClick={()=>{logoutHandler()}}>Log Out</button></div>

            <div >
        <div className='task-input'>
                <input type='text' placeholder='Enter the Task' size='60' onChange={(e)=>{setNewtask(e.target.value)}} value={newtask} required />
                &nbsp;&nbsp;<button className="btn btn-secondary" className='btn btn-primary' onClick={()=>{addHandler()}}>Add</button>
                
            </div>
            <div className="task-box">
                    {task.map((e,i)=>{
                        // console.log(e);
                        return <div className='task-list' key={i}>                              
                          <div className='text-area'>{e}</div>
                          <div><button  className="remove-button" onClick={()=>{deleteHandler(e)}}><HighlightOffOutlinedIcon/></button></div>
                        </div>
                    })} 
                
            
            
        </div>
        </div>
        </div>
    </>
}

export default List
