
import React, { useEffect, useState } from 'react';
import { FileText, Search, ExternalLink, Clock, Filter } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const categories = [
  { id: 'general', name: 'General', color: 'bg-blue-500' },
  { id: 'technology', name: 'Technology', color: 'bg-purple-500' },
  { id: 'business', name: 'Business', color: 'bg-green-500' },
  { id: 'sports', name: 'Sports', color: 'bg-orange-500' },
  { id: 'entertainment', name: 'Entertainment', color: 'bg-pink-500' },
  { id: 'health', name: 'Health', color: 'bg-red-500' },
];

export const NewsWidget: React.FC = () => {
  const { news, setNews, selectedNewsCategory, setSelectedNewsCategory } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      // Simulate API call with enhanced sample data
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const sampleNews = [
        {
          id: '1',
          title: 'Revolutionary AI Technology Transforms Healthcare',
          description: 'New artificial intelligence systems are revolutionizing patient care and medical diagnostics worldwide.',
          url: '#',
          source: 'TechCrunch',
          category: 'technology',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
        },
        {
          id: '2',
          title: 'Global Markets Show Strong Recovery',
          description: 'Stock markets around the world are experiencing unprecedented growth following positive economic indicators.',
          url: '#',
          source: 'Financial Times',
          category: 'business',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400'
        },
        {
          id: '3',
          title: 'Climate Summit Reaches Historic Agreement',
          description: 'World leaders unite to address climate change with ambitious new sustainability targets.',
          url: '#',
          source: 'Reuters',
          category: 'general',
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400'
        },
        {
          id: '4',
          title: 'Breakthrough in Quantum Computing',
          description: 'Scientists achieve major milestone in quantum computing, potentially revolutionizing technology.',
          url: '#',
          source: 'Science Daily',
          category: 'technology',
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'
        },
        {
          id: '5',
          title: 'New Study Reveals Health Benefits of Exercise',
          description: 'Research shows that regular physical activity can significantly improve mental health and longevity.',
          url: '#',
          source: 'Health Magazine',
          category: 'health',
          publishedAt: new Date(Date.now() - 18000000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
        },
      ];
      
      setNews(sampleNews);
      setLoading(false);
    };

    fetchNews();
  }, [setNews]);

  const filteredNews = news
    .filter(item => selectedNewsCategory === 'general' || item.category === selectedNewsCategory)
    .filter(item => searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 6);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <h3 className="font-semibold">News</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {filteredNews.length} articles
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Filter categories"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="widget-content flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        {/* Category Filter */}
        {showCategories && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedNewsCategory(category.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedNewsCategory === category.id
                      ? `${category.color} text-white`
                      : 'bg-background border border-border hover:bg-accent'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* News List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No news articles found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          ) : (
            filteredNews.map((article) => {
              const categoryInfo = getCategoryInfo(article.category);
              
              return (
                <div
                  key={article.id}
                  className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 group cursor-pointer"
                  onClick={() => window.open(article.url, '_blank')}
                >
                  <div className="flex gap-3">
                    {article.imageUrl && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${categoryInfo.color}`}></span>
                        <span className="text-xs text-muted-foreground">{article.source}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                      </div>
                      <h5 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h5>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${categoryInfo.color} text-white`}>
                          {categoryInfo.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-4 pt-3 border-t border-border">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
          >
            Refresh News
          </button>
        </div>
      </div>
    </div>
  );
};
