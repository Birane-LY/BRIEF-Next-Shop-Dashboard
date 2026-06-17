import { useState } from "react"
import './ajoutProduit.scss'


function AjoutProduit({addProduit}){
   const initialFormState= {
       product:'',
       amount:'',
       description:'',
       stocks:'',
       category:'',
       img:'',

    }
   const [produit, setProduit]=useState(initialFormState)


   const handleInputChange=(e)=>{
       const {name, value}= e.target
       setProduit({...produit,[name]:value})}


   const handleSubmit = (e) => {
   e.preventDefault()
  
   if (produit.product && produit.amount && produit.stocks) {
     addProduit(produit)
     setProduit(initialFormState)
   } else {
     alert("Veuillez remplir tous les champs obligatoires (product, amount, stocks)")
   }
 }
    
   return(
       <div className="ajout-produit-container">
           <h2>Nouveau Produit</h2>
           <form onSubmit={handleSubmit} className="ajout-form">
               <div className="form-group">
                   <label>Product</label>
                   <input
                       type="text"
                       name="product"
                       value={produit.product}
                       onChange={handleInputChange}
                       placeholder="Nom du produit"
                       required
                   />
               </div>
              

                      
               <div className="form-group">
                   <label>Prix</label>
                   <input
                       type="number"
                       name="amount"
                       value={produit.amount}
                       onChange={handleInputChange} 
                       required
                       placeholder="Ex: 1000"




                   />
               </div>

               <div className="form-group">
                   <label>description</label>
                   <input
                       type="text"
                       name="description"
                       value={produit.description}
                       onChange={handleInputChange} 
                       
                       placeholder="donner plus de details"

                   />
               </div>

              
               <div className="form-group">
                   <label>Stocks</label>
                   <input
                       type="number"
                       name="stocks"
                       value={produit.stocks}
                       onChange={handleInputChange} 
                       required
                       placeholder="Ex: 10"/>
                 </div>

                <div className="form-group">
                   <label>Categorie</label>
                   <input
                       type="text"
                       name="category"
                       value={produit.category}
                       onChange={handleInputChange} 
                       required
                       placeholder="nom de la categorie"

                   />
               </div>



                    <div className="form-group">
                   <label>Image URL</label>
                   <input
                       type="file"
                       name="img"
                       value={produit.img}
                       onChange={handleInputChange}
                       placeholder="televerser l'image"
                   />
               </div>

              
               <button type="submit" className="submit-btn">Ajouter</button>  
           </form>
           
       </div>
   )
}
export default AjoutProduit

