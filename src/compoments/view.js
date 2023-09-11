import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import logNil from './../asset/images/logoNil.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Sidebar";
import './style.css'




const View = () =>{
    const [user, setUser]=useState([]);
    const navigate = useNavigate();
    const {id}=useParams();
    
    useEffect(()=>{
        fetchview();
    }, [id])

    const fetchview =async ()=>{
        try{
            const result =await axios.get(`http://localhost:8000/api/recherchervendeur/${id}`);
        
            console.log(result.data);
            setUser(result.data);
           
        }
        catch(err){
            console.log("something wronng !!")
        }
    }
    const clickToBackHandler = ()=>{
        navigate('/Vendeur');
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

    if(user.status==1){
        statut="inactif"
    }else{
        statut="Actif"
    }


    return(
        <div className="container-fluid d-block view">
            
            
                
                    <div className="col-md-12">
                        <div className="d-flex justify-content-start ">
                            <img src={logNil} className="logo " />
                            </div>
                            <div className="d-flex justify-content-start pb-5">
                                <h1 className="pt-3 ps-5 position-absolute">Details du Vendeur</h1>

                            </div>
                        
                        
                        <Table className="mt-5">
                            <thead>
                                <tr>
                                    <th>No. Ident</th>
                                    <th>Nom complet</th>
                                    <th>Nom Boutique</th>
                                    <th>Lieu Boutique</th>
                                    <th>Quartier</th>
                                    <th>Ville</th>
                                    <th>Email</th>
                                    <th>Telephone</th>
                                    <th>Statut</th>
                                    <th>Ajouter le</th>
                                    <th>parrain</th>
                                    <th>code</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <th>{user.id}</th>
                                    <th>{user.nom}</th>
                                    <th> {user.boutique}</th>
                                    <th> {user.lieu}</th>
                                    <th> {user.quartier}</th>
                                    <th> {user.ville}</th>
                                    <th> {user.email}</th>
                                    <th> {user.phone}</th>
                                    <th> <button onClick={changeStatut} className="btn btn-success" id="bouton">{statut}</button></th>
                                    <th> {user.dateCreation}</th>
                                    <th> {user.parrain}</th>
                                    <th> {user.code}</th>

                                </tr>
                            </tbody>
                        </Table>
                    </div>
               
        
            <div className="container-fluid d-flex justify-content-end mt-5">
                
                    <button onClick={clickToBackHandler} className="btn button1">Retour</button>
                
                
            </div>
        </div>
       
    )
}

export default View;