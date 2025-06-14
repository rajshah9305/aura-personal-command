
import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Clock, Bookmark, Share2, Eye, TrendingUp } from 'lucide-react';
import { useDashboard, NewsItem } from '../../context/DashboardContext';
import { Badge } from '../ui/badge';

const categories = [
  { id: 'general', name: 'General', color: 'bg-blue-500' },
  { id: 'technology', name: 'Technology', color: 'bg-purple-500' },
  { id: 'business', name: 'Business', color: 'bg-green-500' },
  { id: 'sports', name: 'Sports', color: 'bg-orange-500' },
  { id: 'entertainment', name: 'Entertainment', color: 'bg-pink-500' },
  { id: 'health', name: 'Health', color: 'bg-red-500' },
];

export const FullScreenNews: React.FC = () => {
  const { news, setNews, selectedNewsCategory, setSelectedNewsCategory } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      // Simulate API call with enhanced sample data
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const enhancedNews: NewsItem[] = [
        {
          id: '1',
          title: 'Revolutionary AI Technology Transforms Healthcare Industry',
          description: 'New artificial intelligence systems are revolutionizing patient care and medical diagnostics worldwide, offering unprecedented accuracy in disease detection.',
          url: '#',
          source: 'TechCrunch',
          category: 'technology',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
        },
        {
          id: '2',
          title: 'Global Markets Show Strong Recovery Amid Economic Optimism',
          description: 'Stock markets around the world are experiencing unprecedented growth following positive economic indicators and strong corporate earnings.',
          url: '#',
          source: 'Financial Times',
          category: 'business',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400'
        },
        {
          id: '3',
          title: 'Climate Summit Reaches Historic Agreement on Carbon Neutrality',
          description: 'World leaders unite to address climate change with ambitious new sustainability targets and binding commitments for carbon reduction.',
          url: '#',
          source: 'Reuters',
          category: 'general',
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400'
        },
        {
          id: '4',
          title: 'Breakthrough in Quantum Computing Opens New Possibilities',
          description: 'Scientists achieve major milestone in quantum computing, potentially revolutionizing technology and solving complex computational problems.',
          url: '#',
          source: 'Science Daily',
          category: 'technology',
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'
        },
        {
          id: '5',
          title: 'New Study Reveals Surprising Health Benefits of Regular Exercise',
          description: 'Research shows that regular physical activity can significantly improve mental health, longevity, and overall quality of life.',
          url: '#',
          source: 'Health Magazine',
          category: 'health',
          publishedAt: new Date(Date.now() - 18000000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
        },
        {
          id: '6',
          title: 'Sports Championship Delivers Record-Breaking Viewership',
          description: 'The latest championship match has broken all previous viewership records, showcasing the growing popularity of professional sports.',
          url: '#',
          source: 'ESPN',
          category: 'sports',
          publishedAt: new Date(Date.now() - 21600000).toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'
        }
      ];
      
      setNews(enhancedNews);
      setLoading(false);
    };

    fetchNews();
  }, [setNews]);

  const filteredNews = news
    .filter(item => selectedNewsCategory === 'general' || item.category === selectedNewsCategory)
    .filter(item => searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const markAsRead = (articleId: string) => {
    if (!readArticles.includes(articleId)) {
      setReadArticles(prev => [...prev, articleId]);
    }
  };

  const handleArticleClick = (article: NewsItem) => {
    setSelectedArticle(article);
    markAsRead(article.id);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          News Center
        </h2>
        <p className="text-muted-foreground">
          Stay informed with the latest news across various categories with immersive full-screen experience.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedNewsCategory(category.id)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                selectedNewsCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-secondary hover:bg-accent'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* News Content */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <div className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {filteredNews.map((article) => {
                const categoryInfo = getCategoryInfo(article.category);
                const isBookmarked = bookmarkedArticles.includes(article.id);
                const isRead = readArticles.includes(article.id);
                
                return (
                  <div
                    key={article.id}
                    className={`bg-background border border-border rounded-lg hover:shadow-lg transition-all duration-300 group cursor-pointer ${
                      isRead ? 'opacity-80' : ''
                    }`}
                    onClick={() => handleArticleClick(article)}
                  >
                    {article.imageUrl && (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${categoryInfo.color} text-white`}>
                            {categoryInfo.name}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 flex gap-2">
                          {isRead && (
                            <div className="bg-blue-500 text-white p-1 rounded-full">
                              <Eye className="w-3 h-3" />
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(article.id);
                            }}
                            className={`p-1 rounded-full transition-colors ${
                              isBookmarked ? 'bg-yellow-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                            }`}
                          >
                            <Bookmark className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                        <span className="font-medium">{article.source}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Trending</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Share functionality
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className={`${getCategoryInfo(selectedArticle.category).color} text-white`}>
                    {getCategoryInfo(selectedArticle.category).name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{selectedArticle.source}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
              
              {selectedArticle.imageUrl && (
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              
              <h2 className="text-2xl font-bold mb-3">{selectedArticle.title}</h2>
              <p className="text-muted-foreground mb-4">{selectedArticle.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {formatTimeAgo(selectedArticle.publishedAt)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleBookmark(selectedArticle.id)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      bookmarkedArticles.includes(selectedArticle.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-secondary hover:bg-accent'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1 bg-secondary hover:bg-accent rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
