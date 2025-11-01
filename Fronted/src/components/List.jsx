import React, { useEffect, useState } from "react"
import axios from 'axios'
import { NavLink } from "react-router"


export function List (){
    const [tabP,setTab]=useState([])
    const [type, setType]= useState(true)
    const [idProuit,setIdProduit]=useState("")
    const url=`http://localhost:8080/aa/image/`
    const [dataP, setDataP] =useState({
        nomP:"",
        prix:"",
        stock:"",
        description:"",
        idC:""
    })
    useEffect(()=>{
        afficheP();
    },[])
    
    const [image, setImage]=useState(null)

    const afficheP=async()=>{
        const response= await axios.get("http://localhost:8080/aa")
        setTab(
            response.data
        )
        console.log(response.data)

    }
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
    const handleDelete = async (idP) =>{

        console.log(idP)
        await axios.delete("http://localhost:8080/aa/"+idP)
        const newProductData = tabP.filter((item)=>{
            return(
                item.idP !== idP
            )
        })
        setTab(newProductData)
    }

   

    const ajouterProduit= async(e) =>{
        e.preventDefault()
    const formdata= new FormData()
    formdata.append("nomP",dataP.nomP)
    formdata.append("prix",dataP.prix)
    formdata.append("stock",dataP.stock)
    formdata.append("imageP",image)
    formdata.append("description",dataP.description)
    formdata.append("idC",dataP.idC)
    console.log(formdata)
    
    if(type){
        try {
            await axios.post("http://localhost:8080/aa",formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            )
            
            } catch (err) {
                console.error(err)
            }
    }else{
        try {
            await axios.put("http://localhost:8080/aa/"+idProuit,formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
    
            }
            )
            
            } catch (err) {
                console.error(err)
            }
    }
        
    }
 const handleNatha=(nomp,prix,stock,desc,idc,img)=>{
     setDataP({
        nomP:nomp,
        prix:prix,
        description:desc,
        stock:stock,
        idC:idc
     })
     setImage(img);
 }

 const handleUpdate=(nomp,prix,stock,desc,idc,img,idP)=>{
    setDataP({
       nomP:nomp,
       prix:prix,
       description:desc,
       stock:stock,
       idC:idc,

    })
    setImage(img);
    setIdProduit(idP);
    setType(false);
}

   return (
       <div>
        <form onSubmit={ajouterProduit}>
            <img src={url+image} width={100} heigh={100}/> <br />
            <input type="text" value={dataP.nomP} name="nomP" placeholder="nom" onChange={HandleChange}/> <br />
            <input type="text" value={dataP.prix} name="prix" placeholder="prix" onChange={HandleChange}/> <br />
            <input type="text" value={dataP.stock} name="stock" placeholder="stock" onChange={HandleChange}/> <br/>
            <input type="text" value={dataP.description} name="description" placeholder="description" onChange={HandleChange}/> <br/>
            <input type="text" value={dataP.idC} name="idC" placeholder="categorie" onChange={HandleChange}/> <br/>
            <input type="file" onChange={selectImage}/> <br/>

            <button type="submit">Ajouter</button>

        </form>
       
       <h3>Liste des Produits</h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Categorie</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                     tabP.map((product, i) =>(
                            <tr key={i++}>
                                <td><img src={url+product.imageP} width={100} heigh={100}/></td>
                                <td>{product.nomP}</td>
                                <td>{product.description}</td>
                                <td>{product.prix}</td>
                                <td>{product.stock}</td>
                                <td>{product.categorie.nomC}</td>
                                <td>
                                <button 
                                className="btn btn-primary"
                                onClick={()=>handleNatha(product.nomP,product.prix,product.stock,product.description,product.categorie.idC,product.imageP)}>
                                    Detail
                                </button>
                                <button 
                                className="btn btn-primary"
                                onClick={()=>handleUpdate(product.nomP,product.prix,product.stock,product.description,product.categorie.idC,product.imageP,product.idP)}>
                                    Modifier
                                </button>
                                    <button onClick={()=>handleDelete(product.idP)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            )
                    )
                }
            </tbody>
        </table>
        </div>
   )
}
