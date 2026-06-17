import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './productDetail.scss';
import { productsMock } from '../../table/productsMock'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsMock.find((p) => p.id === Number(id));

  // Déterminer le statut du stock
  const getStockStatus = (stock) => {
    if (stock <= 3) return { class: 'critical', label: 'Stock critique' };
    if (stock <= 10) return { class: 'low', label: 'Stock faible' };
    if (stock <= 20) return { class: 'medium', label: 'Stock limité' };
    return { class: 'high', label: 'En stock' };
  };

  const stockInfo = getStockStatus(product?.stocks);

  if (!product) {
    return (
      <Layout>
        <div className="notFound">
          <h2>Produit non trouvé</h2>
          <button onClick={() => navigate('/produits')} className="backButton">
            <ArrowBackIcon /> Retour aux produits
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="productDetail">
        <div className="header">
          <button onClick={() => navigate('/produits')} className="backButton">
            <ArrowBackIcon className="backIcon" />
            Retour aux produits
          </button>
          <h2>Détail du produit</h2>
        </div>

        <div className="detailCard">
          <div className="detailHeader">
            <div className="productImageContainer">
              <img 
                src={product.image} 
                alt={product.product} 
                className="detailProductImage" 
              />
            </div>
            <div className="productTitle">
              <h1>{product.product}</h1>
              <span className={`stockStatus ${stockInfo.class}`}>
                {stockInfo.label} ({product.stocks} unités)
              </span>
            </div>
          </div>

          <div className="detailContent">
            <div className="detailItem">
              <span className="label">Identifiant</span>
              <span className="value">#{product.id}</span>
            </div>
            <div className="detailItem">
              <span className="label">Catégorie</span>
              <span className="value">{product.category}</span>
            </div>
            <div className="detailItem">
              <span className="label">Prix</span>
              <span className="value priceValue">{product.amount.toLocaleString()} CFA</span>
            </div>
            <div className="detailItem">
              <span className="label">Description</span>
              <span className="value description">{product.description || "Aucune description disponible"}</span>
            </div>
          </div>

          <div className="detailActions">
            <button className="editButton">
              Modifier le produit
            </button>
            <button className="deleteButton">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
