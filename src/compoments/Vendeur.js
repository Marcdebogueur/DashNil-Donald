import React, {useState, useEffect} from "react";
import General from "./General";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Home from './Home';
import Button from 'react-bootstrap/Button';







function Vendeur() {
    const [userdata, setUserdata]=useState([]);

    useEffect(()=>{
        fetchdata();
    }, [])


    const fetchdata = async() =>{
      try{
        const result = await axios.get(`http://localhost:8000/api/listevendeur`);
        // console.log(result.data.results);
        setUserdata(result.data);
      }catch(err){
        console.log("something wronng !!")
      }
    }


    const deleteBoutique= async (id) =>{
      const isConfirm = await Swal.fire({
          title: 'Attention !!!',
          text:'Souhaitez vous vraiment supprimer definitivement ce vendeur?',
          icon:'warning',
          showCancelButton: true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor:'#d33',
          confirmButtonText:'Oui, Supprimer'
      }).then((result) => {
          return result.isConfirmed
      });
  
      if (!isConfirm) {
          return;
      }
  
      await axios.delete(`http://localhost:8000/api/supprimervendeur/${id}`).then(({data})=>{
          Swal.fire({
              icon:"success",
              text:data.message
          })
          fetchdata()
      }).catch(({response:{data}})=>{
          Swal.fire({
              text:data.message,
              icon:"error"
          })
      }
          
      )
    }
    

    
        

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
             <div className='col  p-0'>
               
               <Home Toggle={Toggle} />
               <div className="">
                <div className="d-flex w-100vh justify-content-center mt-5">
                <h2 className=""> Liste Vendeurs</h2>

                </div>
               <Table striped bordered hover className="table1 mt-2 ">
   
                   <thead>
                       <tr>
                       <th>#</th>
                       <th>Nom</th>
                       <th>Email</th>
                       <th>Boutique</th>
                       <th>Lieu Boutique</th>
                       <th>Telephone</th>
                       <th>Status</th>
                       <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                   {
                    
                      userdata.map((user,i)=>{
                          let statut=""
                          if(user.status==1){
                              statut="inactif"
                          }else{
                              statut="Actif"
                          }
                          return(
                              <tr key={i}>
                                  <td>{i+1}</td>
                                  <td>{user.nom}</td>
                                  <td>{user.email}</td>
                                  <td>{user.boutique}</td>
                                  <td>{user.lieu}</td>
                                  <td>{user.phone}</td>
                                  <td>{statut}</td>
                                 <td>
                                      <Button  className='btn btn-success cardre  ms-2'><i class="bi bi-pencil-square text-light"></i></Button>
                                      <Link to={`/view/${user.id}`} className="btn btn-primary cardre2 ms-2"><i class="bi bi-eye text-light"></i></Link> 
                                      <Button variant="danger" className='btn btn-danger ms-2' onClick={()=>deleteBoutique(user.id)}><i class="bi bi-trash3 text-light"></i></Button>
                                  </td>
                              </tr>
                          )
                      })
                  }
                  
              </tbody>
     
               </Table>
           </div>
   
             </div>
           </div>
         </div>
     
    )
}




export default Vendeur