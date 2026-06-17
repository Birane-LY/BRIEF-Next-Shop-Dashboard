import { useState } from "react";
import { useProducts } from '../context/ProductContext';
import './ajoutProduit.scss';

function AjoutProduit({ onClose }) {
  const { addProduit, produits } = useProducts();
  
  const categories = [...new Set(produits.map(p => p.category))];
  
  const [produit, setProduit] = useState({
    product: '',
    amount: '',
    description: '',
    stocks: '',
    category: categories[0] || '',
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit({ ...produit, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduit({ ...produit, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelect = (category) => {
    setProduit({ ...produit, category });
    if (errors.category) {
      setErrors({ ...errors, category: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!produit.product || produit.product.trim().length < 2) {
      newErrors.product = 'Nom trop court (min 2 caractères)';
    }
    
    if (!produit.amount) {
      newErrors.amount = 'Le prix est requis';
    } else if (parseFloat(produit.amount) < 0) {
      newErrors.amount = 'Le prix ne peut pas être négatif';
    } else if (produit.amount.toString().length < 3) {
      newErrors.amount = 'Prix minimum: 100 CFA';
    }
    
    if (!produit.stocks) {
      newErrors.stocks = 'Le stock est requis';
    } else if (parseInt(produit.stocks) < 0) {
      newErrors.stocks = 'Le stock ne peut pas être négatif';
    } else if (parseInt(produit.stocks) === 0) {
      newErrors.stocks = 'Le stock doit être supérieur à 0';
    }
    
    if (!produit.category) {
      newErrors.category = 'Sélectionnez une catégorie';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    
    try {
      const productData = {
        product: produit.product,
        amount: produit.amount,
        description: produit.description || '',
        stocks: produit.stocks,
        category: produit.category,
        image: imagePreview || 'https://via.placeholder.com/40',
      };
      
      const result = addProduit(productData);
      
      if (result && result.success) {
        setProduit({
          product: '',
          amount: '',
          description: '',
          stocks: '',
          category: categories[0] || '',
          image: null,
        });
        setImagePreview(null);
        onClose();
      }
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
    
    setLoading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="ajout-produit-overlay" onClick={handleOverlayClick}>
      <div className="ajout-produit-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <h2>Nouveau Produit</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.product ? 'error' : ''}`}>
            <label>Produit *</label>
            <input
              type="text"
              name="product"
              value={produit.product}
              onChange={handleChange}
              placeholder="Nom du produit"
            />
            {errors.product && <span className="error">{errors.product}</span>}
          </div>

          <div className={`form-group ${errors.amount ? 'error' : ''}`}>
            <label>Prix (CFA) *</label>
            <input
              type="number"
              name="amount"
              value={produit.amount}
              onChange={handleChange}
              placeholder="1000"
              min="100"
            />
            {errors.amount && <span className="error">{errors.amount}</span>}
          </div>

          <div className={`form-group ${errors.stocks ? 'error' : ''}`}>
            <label>Stocks *</label>
            <input
              type="number"
              name="stocks"
              value={produit.stocks}
              onChange={handleChange}
              placeholder="10"
              min="1"
            />
            {errors.stocks && <span className="error">{errors.stocks}</span>}
          </div>

          <div className={`form-group ${errors.category ? 'error' : ''}`}>
            <label>Catégorie *</label>
            <div className="category-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-btn ${produit.category === cat ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={produit.description}
              onChange={handleChange}
              placeholder="Description du produit"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Aperçu" />
                <button 
                  type="button" 
                  className="remove-image"
                  onClick={() => {
                    setImagePreview(null);
                    setProduit({ ...produit, image: null });
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Ajout...' : 'Ajouter'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjoutProduit;
// import { useState } from "react"
// import './ajoutProduit.scss'

// function AjoutProduit({ addProduit, onClose }) { // ← onClose est une nouvelle prop
//   const initialFormState = {
//     product: '',
//     amount: '',
//     description: '',
//     stocks: '',
//     category: '',
//     img: '',
//   }
//   const [produit, setProduit] = useState(initialFormState)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setProduit({ ...produit, [name]: value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
    
//     if (produit.product && produit.amount && produit.stocks) {
//       addProduit(produit)
//       setProduit(initialFormState)
//       onClose() // ← Ferme la popup après ajout
//     } else {
//       alert("Veuillez remplir tous les champs obligatoires (product, amount, stocks)")
//     }
//   }

//   // Fonction pour fermer en cliquant sur l'overlay
//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose()
//     }
//   }

//   return (
//     // OVERLAY (fond sombre)
//     <div className="ajout-produit-overlay" onClick={handleOverlayClick}>
//       {/* POPUP */}
//       <div className="ajout-produit-container">
//         {/* Bouton X pour fermer */}
//         <button className="close-btn" onClick={onClose}>✕</button>
        
//         <h2>Nouveau Produit</h2>
        
//         <form onSubmit={handleSubmit} className="ajout-form">
//           <div className="form-group">
//             <label>Product</label>
//             <input
//               type="text"
//               name="product"
//               value={produit.product}
//               onChange={handleInputChange}
//               placeholder="Nom du produit"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Prix</label>
//             <input
//               type="number"
//               name="amount"
//               value={produit.amount}
//               onChange={handleInputChange} 
//               required
//               placeholder="Ex: 1000"
//             />
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <input
//               type="text"
//               name="description"
//               value={produit.description}
//               onChange={handleInputChange} 
//               placeholder="Donner plus de détails"
//             />
//           </div>

//           <div className="form-group">
//             <label>Stocks</label>
//             <input
//               type="number"
//               name="stocks"
//               value={produit.stocks}
//               onChange={handleInputChange} 
//               required
//               placeholder="Ex: 10"
//             />
//           </div>

//           <div className="form-group">
//             <label>Catégorie</label>
//             <input
//               type="text"
//               name="category"
//               value={produit.category}
//               onChange={handleInputChange} 
//               required
//               placeholder="Nom de la catégorie"
//             />
//           </div>

//           <div className="form-group">
//             <label>Image URL</label>
//             <input
//               type="file"
//               name="img"
//               value={produit.img}
//               onChange={handleInputChange}
//               placeholder="Téléverser l'image"
//             />
//           </div>

//           <div className="form-actions">
//             <button type="submit" className="submit-btn">Ajouter</button>
//             <button type="button" className="cancel-btn" onClick={onClose}>Annuler</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AjoutProduit




// import { useState } from "react"
// import './ajoutProduit.scss'


// function AjoutProduit({addProduit}){
//    const initialFormState= {
//        product:'',
//        amount:'',
//        description:'',
//        stocks:'',
//        category:'',
//        img:'',

//     }
//    const [produit, setProduit]=useState(initialFormState)


//    const handleInputChange=(e)=>{
//        const {name, value}= e.target
//        setProduit({...produit,[name]:value})}


//    const handleSubmit = (e) => {
//    e.preventDefault()
  
//    if (produit.product && produit.amount && produit.stocks) {
//      addProduit(produit)
//      setProduit(initialFormState)
//    } else {
//      alert("Veuillez remplir tous les champs obligatoires (product, amount, stocks)")
//    }
//  }
    
//    return(
//        <div className="ajout-produit-container">
//            <h2>Nouveau Produit</h2>
//            <form onSubmit={handleSubmit} className="ajout-form">
//                <div className="form-group">
//                    <label>Product</label>
//                    <input
//                        type="text"
//                        name="product"
//                        value={produit.product}
//                        onChange={handleInputChange}
//                        placeholder="Nom du produit"
//                        required
//                    />
//                </div>
              

                      
//                <div className="form-group">
//                    <label>Prix</label>
//                    <input
//                        type="number"
//                        name="amount"
//                        value={produit.amount}
//                        onChange={handleInputChange} 
//                        required
//                        placeholder="Ex: 1000"




//                    />
//                </div>

//                <div className="form-group">
//                    <label>description</label>
//                    <input
//                        type="text"
//                        name="description"
//                        value={produit.description}
//                        onChange={handleInputChange} 
                       
//                        placeholder="donner plus de details"

//                    />
//                </div>

              
//                <div className="form-group">
//                    <label>Stocks</label>
//                    <input
//                        type="number"
//                        name="stocks"
//                        value={produit.stocks}
//                        onChange={handleInputChange} 
//                        required
//                        placeholder="Ex: 10"/>
//                  </div>

//                 <div className="form-group">
//                    <label>Categorie</label>
//                    <input
//                        type="text"
//                        name="category"
//                        value={produit.category}
//                        onChange={handleInputChange} 
//                        required
//                        placeholder="nom de la categorie"

//                    />
//                </div>



//                     <div className="form-group">
//                    <label>Image URL</label>
//                    <input
//                        type="file"
//                        name="img"
//                        value={produit.img}
//                        onChange={handleInputChange}
//                        placeholder="televerser l'image"
//                    />
//                </div>

              
//                <button type="submit" className="submit-btn">Ajouter</button>  
//            </form>
           
//        </div>
//    )
// }
// export default AjoutProduit

