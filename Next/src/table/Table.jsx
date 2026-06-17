import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Données fictives pour les transactions 
const transactions = [
  {
    id: 12342,
    product: 'Acer Nitro 5',
    image: 'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=40&h=40&fit=crop&crop=center',
    client: 'Adji Aissatou Wade Samb',
    date: '15 Juin',
    amount: 120000,
    payment: 'Paiement à la livraison',
    status: 'Approuvé'
  },
  {
    id: 123932,
    product: 'Acer Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=40&h=40&fit=crop&crop=center',
    client: 'Aby LY',
    date: '16 Juin',
    amount: 150000,
    payment: 'Paiement en ligne',
    status: 'Approuvé'
  },
  {
    id: 1231242,
    product: 'Play Station 5',
    image:  'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=40&h=40&fit=crop&crop=center',
    client: 'Alphonse Désiré Haba',
    date: '14 Juin',
    amount: 250000,
    payment: 'Paiement en ligne',
    status: 'En attente'
  },
  {
    id: 32342,
    product: 'SanDisk Drive',
    image: 'https://images.unsplash.com/photo-1541648303585-40dcca52add0?w=40&h=40&fit=crop&crop=center',
    client: 'Birane LY',
    date: '16 Juin',
    amount: 50000,
    payment: 'En ligne',
    status: 'En attente'
  },
  {
    id: 99342,
    product: 'Acer Nitro 7',
    image: 'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=40&h=40&fit=crop&crop=center',
    client: 'Bassirou Dièye',
    date: '14 Juin',
    amount: 350000,
    payment: 'En ligne',
    status: 'Approuvé'
  }
];

const TableComponent = () => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="table des transactions">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Identifiant</TableCell>
            <TableCell className="tableCell">Produit</TableCell>
            <TableCell className="tableCell">Client</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Montant</TableCell>
            <TableCell className="tableCell">Méthode de Paiement</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              
              {/* Cellule modifiée pour inclure l'image du produit */}
              <TableCell className="tableCell">
                <div className="cellWrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={row.image} 
                    alt={row.product} 
                    className="productImage" 
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span className="productName">{row.product}</span>
                </div>
              </TableCell>

              <TableCell className="tableCell">{row.client}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              
              {/* Utilisation de .toLocaleString() pour formater proprement le montant */}
              <TableCell className="tableCell">{row.amount.toLocaleString()} CFA</TableCell>
              
              <TableCell className="tableCell">{row.payment}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status.toLowerCase().replace('é', 'e').replace(' ', '')}`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
