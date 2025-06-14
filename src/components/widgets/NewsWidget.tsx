
import React, { useEffect, useState } from 'react';
import { file-text as FileText, search as Search } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const categories = ['general', 'technology', 'business', 'sports', 'entertainment', 'health'];

export const NewsWidget: React.FC = () => {
  const { news, setNews, selectedNewsCategory, setSelectedNewsCategory } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      // Simulate API call with sample data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sampleNews = [
        {
          id: '1',
          title: 'AI Technology Breakthrough in Healthcare',
          description: 'Researchers announce major advancement in AI-powered diagnostics that could revolutionize patient care.',
          url: '#',
          source: 'TechNews',
          category: 'technology',
          publishedAt: new Date().toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop'
        },
        {
          id: '2',
          title: 'Global Stock Markets React to Economic Data',
          description: 'Markets show volatility as new economic indicators suggest shifting consumer trends.',
          url: '#',
          source: 'Financial Times',
          category: 'business',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop'
        },
        {
          id: '3',
          title: 'Climate Change Summit Reaches Key Agreement',
          description: 'World leaders agree on new framework for carbon reduction and sustainable energy initiatives.',
          url: '#',
          source: 'Global News',
          category: 'general',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1569163139394-de44cb776d18?w=300&h=200&fit=crop'
        },
        {
          id: '4',
          title: 'Championship Finals Draw Record Viewership',
          description: 'Sports fans break streaming records as the championship series reaches its climax.',
          url: '#',
          source: 'Sports Network',
          category: 'sports',
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
        },
        {
          id: '5',
          title: 'New Health Study Reveals Surprising Benefits',
          description: 'Longitudinal study shows unexpected positive effects of Mediterranean diet on cognitive function.',
          url: '#',
          source: 'Health Today',
          category: 'health',
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=300&h=200&fit=crop'
        }
      ];
      
      setNews(sampleNews);
      setLoading(false);
    };

    if (news.length === 0) {
      fetchNews();
    } else {
      setLoading(false);
    }
  }, [news, setNews]);

  const filteredNews = news.filter(article => {
    const matchesCategory = selectedNewsCategory === 'general' || article.category === selectedNewsCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedAt = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <h3 className="font-semibold">News</h3>
        </div>
        <span className="text-sm text-muted-foreground">Latest Updates</span>
      </div>

      <div className="widget-content flex-1 flex flex-col">
        {/* Search and Filters */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedNewsCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedNewsCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* News List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-20 h-16 bg-muted rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No news found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          ) : (
            filteredNews.map((article) => (
              <div
                key={article.id}
                className="bg-background border border-border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => window.open(article.url, '_blank')}
              >
                <div className="flex gap-3">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">
                        {article.source}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
