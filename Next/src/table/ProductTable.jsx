import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductTable = ({produits}) => {

  return (
    <>
    <TableContainer component={Paper} className="table productsTable">
      <Table sx={{ minWidth: 650 }} aria-label="table des produits">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Identifiant</TableCell>
            <TableCell className="tableCell">Produit</TableCell>
            <TableCell className="tableCell">Catégorie</TableCell>
            <TableCell className="tableCell">Prix (CFA)</TableCell>
            <TableCell className="tableCell">Stock</TableCell>
            <TableCell className="tableCell">Statut</TableCell>
            <TableCell className="tableCell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produits.map((product) => {
            let stockStatus = 'stock-high';
            let stockLabel = 'En stock';
            
            if (product.stocks <= 5) {
              stockStatus = 'stock-low';
              stockLabel = 'Stock faible';
            } else if (product.stocks <= 10) {
              stockStatus = 'stock-medium';
              stockLabel = 'Stock limité';
            }

            return (
              
              <TableRow key={product.id}>
                <TableCell className="tableCell">{product.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img 
                      src={product.image} 
                      alt={product.product} 
                      className="productImage" 
                    />
                    <span className="productName">{product.product}</span>
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="category">{product.category}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="price">{product.amount.toLocaleString()}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className="stockQuantity">{product.stocks}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${stockStatus}`}>
                    {stockLabel}
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <Link to={`/produits/${product.id}`} className="detailLink">
                    <VisibilityIcon className="eyeIcon" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
      </>
  );
};

export default ProductTable;
