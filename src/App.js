import './App.css';
import React,{ useEffect, useState } from 'react';
import env from 'react-dotenv';
import axios from 'axios';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './components/login';
import Create from './components/create';
import List from './components/list';

 export const todoContext=React.createContext();

function App() {

 const [token,setToken]=useState('');
    // const [environment,setEnvironment]=useState('');
    // useEffect(()=>{
    //   getData();
    // },[]);
    // let getData=()=>{
    //   setEnvironment(env.API_URL);
    // }


  // console.log(env.API_URL);

  
  return (
 <todoContext.Provider value={{token,setToken}}>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Create' element={<Create/>}/>
          <Route path='/List' element={<List/>}/>
        </Routes>
      </Router>
    </todoContext.Provider>
  );
}

export default App;
