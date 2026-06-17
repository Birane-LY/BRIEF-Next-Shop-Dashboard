import { useState } from 'react';
import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductTable = ({ produits }) => {
  // État pour la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Gérer le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Gérer le changement du nombre de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculer les produits à afficher sur la page actuelle
const indexDebut = page * rowsPerPage;
const indexFin = indexDebut + rowsPerPage;

const currentProducts = produits.slice(indexDebut, indexFin);


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
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => {
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
                      <div className="action-buttons">
                        <Link to={`/produits/${product.id}`} className="detailLink" title="Voir le détail">
                          <VisibilityIcon className="action-icon" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="tableCell empty-state">
                  <div className="empty-message">
                    <span>📦</span>
                    <p>Aucun produit trouvé</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={produits?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} sur ${count}`
          }
          className="pagination"
        />
      </TableContainer>
    </>
  );
};

export default ProductTable;