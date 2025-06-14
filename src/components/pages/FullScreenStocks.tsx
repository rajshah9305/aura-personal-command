
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Plus, Star, BarChart3, DollarSign, Activity } from 'lucide-react';
import { useDashboard, StockData } from '../../context/DashboardContext';
import { Badge } from '../ui/badge';

interface Portfolio {
  symbol: string;
  shares: number;
  avgPrice: number;
}

export const FullScreenStocks: React.FC = () => {
  const { watchlist, stockData, addToWatchlist, removeFromWatchlist, updateStockData } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([
    { symbol: 'AAPL', shares: 10, avgPrice: 150.00 },
    { symbol: 'GOOGL', shares: 5, avgPrice: 140.00 },
    { symbol: 'MSFT', shares: 8, avgPrice: 320.00 }
  ]);
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortfolioEntry, setNewPortfolioEntry] = useState({
    symbol: '',
    shares: 0,
    avgPrice: 0
  });

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      
      // Simulate API call with enhanced sample data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const enhancedStockData: Record<string, StockData> = {
        'AAPL': {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 185.92,
          change: 2.45,
          changePercent: 1.34,
          high: 187.50,
          low: 183.20,
          volume: 45678900
        },
        'GOOGL': {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          price: 142.87,
          change: -1.23,
          changePercent: -0.85,
          high: 145.20,
          low: 141.50,
          volume: 32456700
        },
        'MSFT': {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          price: 378.91,
          change: 5.67,
          changePercent: 1.52,
          high: 380.15,
          low: 375.30,
          volume: 28934500
        },
        'TSLA': {
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          price: 208.44,
          change: -3.21,
          changePercent: -1.52,
          high: 212.80,
          low: 207.10,
          volume: 67890400
        },
        'AMZN': {
          symbol: 'AMZN',
          name: 'Amazon.com Inc.',
          price: 134.56,
          change: 1.89,
          changePercent: 1.42,
          high: 136.45,
          low: 132.10,
          volume: 55234100
        },
        'META': {
          symbol: 'META',
          name: 'Meta Platforms Inc.',
          price: 298.73,
          change: -2.34,
          changePercent: -0.78,
          high: 302.15,
          low: 296.80,
          volume: 18765400
        }
      };

      // Update stock data for each symbol
      Object.entries(enhancedStockData).forEach(([symbol, data]) => {
        updateStockData(symbol, data);
      });
      
      setLoading(false);
    };

    fetchStockData();
    
    // Set up periodic updates
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, [updateStockData]);

  const handleAddStock = () => {
    if (searchSymbol.trim() && !watchlist.includes(searchSymbol.toUpperCase())) {
      addToWatchlist(searchSymbol.toUpperCase());
      setSearchSymbol('');
    }
  };

  const handleAddToPortfolio = () => {
    if (newPortfolioEntry.symbol && newPortfolioEntry.shares > 0 && newPortfolioEntry.avgPrice > 0) {
      const existingEntry = portfolio.find(p => p.symbol === newPortfolioEntry.symbol.toUpperCase());
      if (existingEntry) {
        setPortfolio(prev => prev.map(p => 
          p.symbol === newPortfolioEntry.symbol.toUpperCase()
            ? { ...p, shares: p.shares + newPortfolioEntry.shares }
            : p
        ));
      } else {
        setPortfolio(prev => [...prev, { 
          ...newPortfolioEntry, 
          symbol: newPortfolioEntry.symbol.toUpperCase() 
        }]);
      }
      setNewPortfolioEntry({ symbol: '', shares: 0, avgPrice: 0 });
      setShowAddPortfolio(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getPortfolioValue = () => {
    return portfolio.reduce((total, entry) => {
      const stock = stockData[entry.symbol];
      if (stock) {
        return total + (stock.price * entry.shares);
      }
      return total;
    }, 0);
  };

  const getPortfolioGainLoss = () => {
    return portfolio.reduce((total, entry) => {
      const stock = stockData[entry.symbol];
      if (stock) {
        const currentValue = stock.price * entry.shares;
        const originalValue = entry.avgPrice * entry.shares;
        return total + (currentValue - originalValue);
      }
      return total;
    }, 0);
  };

  const portfolioValue = getPortfolioValue();
  const portfolioGainLoss = getPortfolioGainLoss();
  const portfolioGainLossPercent = portfolioValue > 0 ? (portfolioGainLoss / portfolioValue) * 100 : 0;

  const topGainers = Object.values(stockData)
    .filter(stock => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);

  const topLosers = Object.values(stockData)
    .filter(stock => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Stock Portfolio Dashboard
        </h2>
        <p className="text-muted-foreground">
          Track your investments, monitor real-time market data, and manage your portfolio with advanced analytics.
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Portfolio Value</p>
              <p className="text-2xl font-bold">${portfolioValue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className={`bg-gradient-to-br ${portfolioGainLoss >= 0 ? 'from-blue-500 to-blue-600' : 'from-red-500 to-red-600'} text-white rounded-xl p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Gain/Loss</p>
              <p className="text-2xl font-bold">
                {portfolioGainLoss >= 0 ? '+' : ''}${portfolioGainLoss.toFixed(2)}
              </p>
            </div>
            {portfolioGainLoss >= 0 ? (
              <TrendingUp className="w-8 h-8 text-blue-200" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-200" />
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Watchlist</p>
              <p className="text-2xl font-bold">{watchlist.length}</p>
            </div>
            <Star className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Market Status</p>
              <p className="text-2xl font-bold">Open</p>
            </div>
            <Activity className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Add symbol (e.g., AAPL)"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStock()}
            className="flex-1 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleAddStock}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => setShowAddPortfolio(true)}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add to Portfolio
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Watchlist & Portfolio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Holdings */}
          <div className="widget-card">
            <div className="widget-header">
              <h3 className="font-semibold">Portfolio Holdings</h3>
              <Badge variant={portfolioGainLoss >= 0 ? 'default' : 'destructive'}>
                {portfolioGainLossPercent >= 0 ? '+' : ''}{portfolioGainLossPercent.toFixed(2)}%
              </Badge>
            </div>
            <div className="widget-content">
              <div className="space-y-3">
                {portfolio.map((entry) => {
                  const stock = stockData[entry.symbol];
                  if (!stock) return null;
                  
                  const currentValue = stock.price * entry.shares;
                  const originalValue = entry.avgPrice * entry.shares;
                  const gainLoss = currentValue - originalValue;
                  const gainLossPercent = (gainLoss / originalValue) * 100;
                  
                  return (
                    <div key={entry.symbol} className="bg-background border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{stock.symbol}</h4>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${currentValue.toFixed(2)}</p>
                          <p className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="block">Shares</span>
                          <span className="font-medium text-foreground">{entry.shares}</span>
                        </div>
                        <div>
                          <span className="block">Avg Cost</span>
                          <span className="font-medium text-foreground">${entry.avgPrice.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="block">Current Price</span>
                          <span className="font-medium text-foreground">${stock.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Watchlist */}
          <div className="widget-card">
            <div className="widget-header">
              <h3 className="font-semibold">Watchlist</h3>
              <span className="text-sm text-muted-foreground">{watchlist.length} stocks</span>
            </div>
            <div className="widget-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {watchlist.map((symbol) => {
                  const stock = stockData[symbol];
                  if (!stock) return null;
                  
                  const isPositive = stock.change >= 0;
                  
                  return (
                    <div
                      key={symbol}
                      className="bg-background border border-border rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => setSelectedStock(stock)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{stock.symbol}</h4>
                          <p className="text-xs text-muted-foreground truncate">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${stock.price.toFixed(2)}</p>
                          <p className={`flex items-center gap-1 text-xs ${
                            isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isPositive ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div>
                          <span className="block">High</span>
                          <span className="font-medium text-foreground">${stock.high.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="block">Low</span>
                          <span className="font-medium text-foreground">${stock.low.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="block">Volume</span>
                          <span className="font-medium text-foreground">{formatNumber(stock.volume)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Market Movers */}
          <div className="widget-card">
            <div className="widget-header">
              <h3 className="font-semibold">Top Gainers</h3>
            </div>
            <div className="widget-content">
              <div className="space-y-2">
                {topGainers.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950 rounded">
                    <div>
                      <p className="font-medium text-sm">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">${stock.price.toFixed(2)}</p>
                    </div>
                    <p className="text-green-600 text-sm font-medium">
                      +{stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="widget-card">
            <div className="widget-header">
              <h3 className="font-semibold">Top Losers</h3>
            </div>
            <div className="widget-content">
              <div className="space-y-2">
                {topLosers.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-950 rounded">
                    <div>
                      <p className="font-medium text-sm">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">${stock.price.toFixed(2)}</p>
                    </div>
                    <p className="text-red-600 text-sm font-medium">
                      {stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market News */}
          <div className="widget-card">
            <div className="widget-header">
              <h3 className="font-semibold">Market News</h3>
            </div>
            <div className="widget-content">
              <div className="space-y-3">
                <div className="p-2 border border-border rounded">
                  <p className="text-sm font-medium">Fed Announces Rate Decision</p>
                  <p className="text-xs text-muted-foreground">Market reacts positively to policy updates</p>
                </div>
                <div className="p-2 border border-border rounded">
                  <p className="text-sm font-medium">Tech Earnings Season Begins</p>
                  <p className="text-xs text-muted-foreground">Major companies report strong Q4 results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Portfolio Modal */}
      {showAddPortfolio && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h3 className="font-semibold mb-4">Add to Portfolio</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Stock Symbol"
                value={newPortfolioEntry.symbol}
                onChange={(e) => setNewPortfolioEntry(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="number"
                placeholder="Number of Shares"
                value={newPortfolioEntry.shares || ''}
                onChange={(e) => setNewPortfolioEntry(prev => ({ ...prev, shares: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Average Price"
                value={newPortfolioEntry.avgPrice || ''}
                onChange={(e) => setNewPortfolioEntry(prev => ({ ...prev, avgPrice: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddToPortfolio}
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddPortfolio(false)}
                  className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-md hover:bg-secondary/90 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
