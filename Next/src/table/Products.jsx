import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { products } from './Mock';
import { useState } from 'react';
const Products = () => {
  const [produits, setProduits] = useState(products)
  const addProduit = (produit) => {
    produit.id=produits.length+1
    setProduits([...produits, produit])
  }

  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Identifiant</TableCell>
          <TableCell className="tableCell">Produit</TableCell>
          <TableCell className="tableCell">Prix (CFA)</TableCell>
          <TableCell className="tableCell">Stocks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            
            <TableCell className="tableCell">{product.id}</TableCell>
            <TableCell className="tableCell">
                <div className="cellWrapper">
                    <img src={product.img} alt={product.product} className="image" />
                    {product.product}
                </div>
            </TableCell>
            <TableCell className="tableCell">{product.amount}</TableCell>
            <TableCell className="tableCell">
                <span className={`status ${product.stocks}`}>{product.stocks}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Products