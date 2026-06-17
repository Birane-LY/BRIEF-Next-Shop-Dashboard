import './kpiCards.scss';
import { TrendingUp, TrendingDown, AttachMoney, Inventory, Category,Warning} from '@mui/icons-material';

import { useProducts } from '../../context/ProductContext';

const KPICards = () => {
  const {produits} =useProducts()
  // Calcul des KPI à partir des données produits
  const totalProducts = produits.length;
  const totalStock = produits.reduce((sum, p) => sum + p.stocks, 0);
  const totalValue = produits.reduce((sum, p) => sum + (p.amount * p.stocks), 0);
  const lowStockCount = produits.filter(p => p.stocks <= 5).length;
  
  // Formater le montant
  const formatAmount = (amount) => {
    return amount.toLocaleString() + ' CFA';
  };

  const kpiData = [
    {
      id: 1,
      title: 'Valeur du stock',
      value: formatAmount(totalValue),
      change: '+5.2%',
      trend: 'up',
      icon: <AttachMoney className="kpiIcon" />,
      color: '#646149',
      subtitle: `${totalProducts} produits`
    },
    {
      id: 2,
      title: 'Produits en stock',
      value: totalStock.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: <Inventory className="kpiIcon" />,
      color: '#5a8f5a',
      subtitle: `${totalProducts} références`
    },
    {
      id: 3,
      title: 'Catégories',
      value: new Set(produits.map(p => p.category)).size.toString(),
      change: '0%',
      trend: 'up',
      icon: <Category className="kpiIcon" />,
      color: '#d4a853',
      subtitle: 'différentes'
    },
    {
      id: 4,
      title: 'Stock critique',
      value: lowStockCount.toString(),
      change: lowStockCount > 2 ? '+2' : '0',
      trend: lowStockCount > 2 ? 'down' : 'up',
      icon: <Warning className="kpiIcon" />,
      color: '#b8534a',
      subtitle: lowStockCount > 0 ? 'À réapprovisionner' : 'Stock OK'
    }
  ];

  return (
    <div className="kpiCards">
      {kpiData.map((kpi) => (
        <div key={kpi.id} className="kpiCard">
          <div className="kpiHeader">
            <div className="kpiIconWrapper" style={{ background: `${kpi.color}15` }}>
              {kpi.icon}
            </div>
            <span className={`kpiTrend ${kpi.trend}`}>
              {kpi.change}
              {kpi.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
            </span>
          </div>
          <div className="kpiBody">
            <h3 className="kpiValue">{kpi.value}</h3>
            <p className="kpiTitle">{kpi.title}</p>
            <span className="kpiSubtitle">{kpi.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;