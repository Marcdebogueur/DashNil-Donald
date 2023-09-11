import React from "react";
import Sidebar from './Sidebar';
import Home from './Home';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";


// const [admin, setAdmin]=useState([]);
// 

// 

// 
//       setAdmin(result.data);
//   }
//   





function General(){
 
      



  const [toggle, setToggle]=useState(true)
   const Toggle =()=>{
   setToggle(!toggle)
  }
   
    return(
        <div className='container-fluid bg- min-vh-100 general'>
      <div className='row'>
        {toggle &&<div className='col-2 p-0 postion-fixed'>
          <Sidebar/>
        </div>}
        <div className='col p-0'>
          
          <Home Toggle={Toggle} />
          <div className="container d-flex justify-content-center  card h-25 cadre shadow-sm">
            <p className="text-dark">
               <span className="w-100 text-center container-fluid fs-1 fw-bold contact"> Bienvenue</span> <br/>  sur la plateforme d administration de <span className="contact">  Nil   </span> 
               <span className="name"> Service </span>
              pour naviger veuillez choisi un onglet dans la barre lateral en cas de souci contactez le service informatique au: <span className="contact fw-bold">  680513385/683719943</span>  
            </p>
          </div>
          
        </div>
      </div>
    </div>
    );
}


export default General
