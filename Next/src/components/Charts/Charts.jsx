import './charts.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useProducts } from '../../context/ProductContext';

// Données pour le graphique en barres (par catégorie)
const categoryData = () => {
  const { produits } = useProducts();
  const categories = {};
  produits?.forEach(p => {
    if (categories[p.category]) {
      categories[p.category] += p.stocks;
    } else {
      categories[p.category] = p.stocks;
    }
  });
  return Object.keys(categories).map(key => ({
    category: key,
    stock: categories[key]
  }));
};

// Données pour le camembert (répartition par catégorie)
const pieData = () => {
  const { produits } = useProducts();
  const categories = {};
  produits?.forEach(p => {
    if (categories[p.category]) {
      categories[p.category] += 1;
    } else {
      categories[p.category] = 1;
    }
  });
  return Object.keys(categories).map(key => ({
    name: key,
    value: categories[key]
  }));
};

// Données pour le graphique des prix
const priceData = () => {
  const { produits } = useProducts();
  return produits?.map(p => ({
    product: p.product.length > 10 ? p.product.substring(0, 10) + '...' : p.product,
    Prix: p.amount / 1000,
    Stock: p.stocks
  }));
};

const COLORS = ['#646149', '#c8b89a', '#d4a853', '#5a8f5a', '#4a7c59', '#b8534a'];

const Charts = () => {
  const barData = categoryData();
  const pieChartData = pieData();
  const lineData = priceData();

  return (
    <div className="chartsContainer">
      {/* Graphique en barres - Stock par catégorie */}
      <div className="chartCard">
        <h3 className="chartTitle">Stock par catégorie</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0d8cc" />
            <XAxis dataKey="category" stroke="#8a7f72" />
            <YAxis stroke="#8a7f72" />
            <Tooltip 
              contentStyle={{ 
                background: '#faf7f2', 
                border: '1px solid #e0d8cc',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Bar dataKey="stock" fill="#646149" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Graphique en courbes - Prix des produits */}
      <div className="chartCard">
        <h3 className="chartTitle">Prix des produits (x1000 CFA)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0d8cc" />
            <XAxis dataKey="product" stroke="#8a7f72" />
            <YAxis stroke="#8a7f72" />
            <Tooltip 
              contentStyle={{ 
                background: '#faf7f2', 
                border: '1px solid #e0d8cc',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="Prix" stroke="#646149" strokeWidth={3} dot={{ fill: '#646149' }} />
            <Line type="monotone" dataKey="Stock" stroke="#d4a853" strokeWidth={3} dot={{ fill: '#d4a853' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;