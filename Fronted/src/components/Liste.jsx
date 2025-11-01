import React, { useEffect, useState } from "react"
import axios from 'axios'
import { NavLink } from "react-router"


export function List (){

    console.log("ddddddd")
    
    
    const [dataP, setDataP] =useState({
        nomP:"",
        prix:"",
        stock:"",
        description:"",
        idC:""
    });

    

    const [image, setImage]=useState(null)

    const selectImage= (e) =>{
        if(e.target.files && e.target.files.length>0){
        setImage(
            e.target.files[0]
        )
    }
    }
    const HandleChange=(e) =>{
        setDataP({
            ...dataP,[e.target.name]:e.target.value
        }
        )
    }
    

    const rs= async(e) =>{
        e.preventDefault()
    const formdata= new FormData()
    formdata.append("nomP",dataP.nomP)
    formdata.append("prix",dataP.prix)
    formdata.append("stock",dataP.stock)
    formdata.append("imageP",image)
    formdata.append("description",dataP.description)
    formdata.append("idC",dataP.idC)
    console.log(formdata)

        try {
        await axios.post("http://localhost:8080/aa",formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }

        }
        )
        
        alert("mande3")
        } catch (err) {
            console.error(err)
        }
    }

   return (
       <div>
        <form onSubmit={rs}>
            <input type="text" value={dataP.nomP} name="nomP" placeholder="nom" onChange={HandleChange}/> <br />
            <input type="text" value={dataP.prix} name="prix" placeholder="prix" onChange={HandleChange}/> <br />
            <input type="text" value={dataP.stock} name="stock" placeholder="stock" onChange={HandleChange}/> <br/>
            <input type="text" value={dataP.description} name="description" placeholder="description" onChange={HandleChange}/> <br/>
            <input type="text" value={dataP.idC} name="idC" placeholder="categorie" onChange={HandleChange}/> <br/>
            <input type="file" onChange={selectImage}/> <br/>

            <button type="submit">Ajouter</button>

        </form>
       </div>
   )
}
