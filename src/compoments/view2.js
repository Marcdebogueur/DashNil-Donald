import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logNil from './../asset/images/logoNil.png';

import Sidebar from "./Sidebar";
import './style.css'




const View2 = () =>{
    const [user, setUser]=useState([]);
    const navigate = useNavigate();
    const {id}=useParams();
    
    useEffect(()=>{
        fetchview();
    }, [id])

    const fetchview =async ()=>{
        try{
            const result =await axios.get(`http://localhost:8000/api/rechercheprestataire/${id}`);
        
            // console.log(result.data);
            setUser(result.data);
        }
        catch(err){
            console.log("something wronng !!")
        }
    }
    const clickToBackHandler = ()=>{
        navigate('/Prestataire');
    }


    const changeStatut = async()=>{
        try{
            await axios.put(`http://localhost:8000/api/modifierstatutvendeur/${id}`);
            const user =await axios.get(`http://localhost:8000/api/recherchervendeur/${id}`);
            setUser(user.data)
          if(user.data.status==1){
            let button=document.getElementById("bouton");
            button.style.backgroundcolor ="red";
          }

           
        }
        catch(err){
            console.log("something wronng !!")
        }
       
    }
    let statut=""
    if(user.statut==0){
        statut="Descativé"
    }else{
        statut="Activé"
    }

    return(
        <div className="container-fluid d-block">
            
           
                
                    <div className="col-md-12">
                    <div className="d-flex justify-content-start ">
                            <img src={logNil} className="logo " />
                            </div>
                            <div className="d-flex justify-content-start pb-5">
                                <h1 className="pt-3 ps-5 position-absolute">Details du Prestataire</h1>

                            </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No. Ident</th>
                                    <th>Nom complet</th>
                                    <th>Email</th>
                                    <th>Telephone</th>
                                    <th>Quartier</th>
                                    <th>Ville</th>
                                    <th>Categorie</th>
                                    <th>description</th>
                                    <th>Statut</th>
                                    <th>Ajouter le</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <th>{user.id}</th>
                                    <th>{user.nom}</th>
                                    <th> {user.email}</th>
                                    <th> {user.phone}</th>
                                    <th> {user.quartier}</th>
                                    <th> {user.ville}</th>
                                    <th> {user.categorie}</th>
                                    <th> {user.description}</th>
                                    <th> <button onClick={changeStatut} className="btn btn-success" id="bouton">{statut}</button></th>
                                    <th> {user.dateCreation}</th>

                                </tr>
                            </tbody>
                        </table>
                    </div>
              
           
            <div className="container d-flex justify-content-center">
                <div >
                    <button onClick={clickToBackHandler} className="btn btn-primary">Liste Prestataire</button>
                    
                </div>
            </div>
        </div>
       
    )
}

export default View2;