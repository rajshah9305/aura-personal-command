
import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const StockWidget: React.FC = () => {
  const { watchlist, stockData, addToWatchlist, removeFromWatchlist, updateStockData } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [searchSymbol, setSearchSymbol] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      
      // Simulate API call with sample data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const sampleStockData = {
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
        }
      };

      // Update stock data for each symbol in watchlist
      watchlist.forEach(symbol => {
        if (sampleStockData[symbol]) {
          updateStockData(symbol, sampleStockData[symbol]);
        }
      });
      
      setLoading(false);
    };

    fetchStockData();
    
    // Set up periodic updates (every 30 seconds in real app)
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, [watchlist, updateStockData]);

  const handleAddStock = () => {
    if (searchSymbol.trim() && !watchlist.includes(searchSymbol.toUpperCase())) {
      addToWatchlist(searchSymbol.toUpperCase());
      setSearchSymbol('');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold">Stocks</h3>
        </div>
        <span className="text-sm text-muted-foreground">Watchlist</span>
      </div>

      <div className="widget-content flex-1 flex flex-col">
        {/* Add Stock */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add symbol (e.g., AAPL)"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStock()}
            className="flex-1 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
          <button
            onClick={handleAddStock}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Stock List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {loading ? (
            <div className="space-y-3">
              {watchlist.map((symbol) => (
                <div key={symbol} className="animate-pulse">
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="h-4 bg-muted rounded w-16 mb-1"></div>
                        <div className="h-3 bg-muted rounded w-24"></div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-muted rounded w-16 mb-1"></div>
                        <div className="h-3 bg-muted rounded w-12"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : watchlist.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No stocks in watchlist</p>
              <p className="text-sm">Add a stock symbol to get started</p>
            </div>
          ) : (
            watchlist.map((symbol) => {
              const stock = stockData[symbol];
              if (!stock) return null;
              
              const isPositive = stock.change >= 0;
              
              return (
                <div
                  key={symbol}
                  className="bg-background border border-border rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {stock.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${stock.price.toFixed(2)}</div>
                      <div className={`flex items-center gap-1 text-xs ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromWatchlist(symbol)}
                      className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      ×
                    </button>
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
            })
          )}
        </div>
      </div>
    </div>
  );
};
