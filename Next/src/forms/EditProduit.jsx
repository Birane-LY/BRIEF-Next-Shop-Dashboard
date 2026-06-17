// src/forms/EditProduit.jsx
import { useState } from "react";
import { useProducts } from '../context/ProductContext';
import './ajoutProduit.scss';

function EditProduit({ product, onClose }) {
  const { updateProduit, produits } = useProducts();
  
  const categories = [...new Set(produits.map(p => p.category))];
  
  const [produit, setProduit] = useState({
    product: product.product || '',
    amount: product.amount || '',
    description: product.description || '',
    stocks: product.stocks || '',
    category: product.category || categories[0] || '',
    image: product.image || '',
  });
  
  const [errors, setErrors] = useState({});

  // 1. UNIQUE POUR LE TEXTE ET LES NOMBRES (Plus de finalValue)
  const handleChange = (e) => {
    setProduit({ ...produit, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // 2. UNIQUE POUR L'IMAGE : Une seule ligne magique très simple
  const handleFileChange = (e) => {
    setProduit({ ...produit, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleCategorySelect = (category) => {
    setProduit({ ...produit, category });
    if (errors.category) {
      setErrors({ ...errors, category: '' });
    }
  };

  // Conservation stricte de votre méthode de validation
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

  // 3. SOUMISSION : Plus de finalImage complexe, on utilise directement produit.image
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    const productData = {
      product: produit.product,
      amount: produit.amount,
      description: produit.description || '',
      stocks: produit.stocks,
      category: produit.category,
      image: produit.image || 'https://placeholder.com', 
    };
    
    updateProduit(product.id, productData);
    onClose();
  };

  return (
    <div className="ajout-produit-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ajout-produit-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <h2>Modifier le produit</h2>
        
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
              onChange={handleFileChange} // Branché sur la fonction dédiée
              accept="image/*"
              className="file-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Modifier</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduit;
