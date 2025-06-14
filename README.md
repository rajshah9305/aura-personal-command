
# AI-Powered Personal Dashboard

A comprehensive, modern personal dashboard application built with React, TypeScript, and Tailwind CSS. This dashboard provides a centralized view of your personal data including weather, tasks, news, stocks, calendar events, and analytics.

## 🚀 Features

### Core Dashboard
- **Modern, responsive design** with dark/light theme toggle
- **Grid-based layout** with customizable widget positioning
- **Collapsible sidebar navigation** with smooth animations
- **Professional header** with search, notifications, and user profile

### Essential Widgets

#### 🌤️ Weather Widget
- Current weather conditions with 5-day forecast
- Location-based data (ready for geolocation API integration)
- Weather icons and temperature displays
- Humidity and wind speed information

#### ✅ Task Management
- Add, edit, and delete tasks with due dates
- Priority levels (High, Medium, Low) with color coding
- Progress tracking with completion statistics
- Local storage persistence
- Category organization

#### 📰 News Feed
- Latest headlines with search and filter functionality
- Multiple news categories (Technology, Business, Sports, etc.)
- Article previews with images
- Time-based sorting

#### 📈 Stock Market Tracker
- Real-time stock price displays (sample data)
- Watchlist management with add/remove functionality
- Price change indicators with trending arrows
- Volume and daily high/low information

#### 📅 Calendar Integration
- Monthly, weekly, and daily view options
- Event creation and management interface
- Upcoming events preview
- Color-coded event categories

#### 📊 Analytics Dashboard
- Personal productivity metrics
- Task completion rates and trends
- Priority distribution charts
- Weekly progress reports

### Technical Features
- **State Management**: Context API for global state
- **Local Storage**: Persistent user preferences and data
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton screens and smooth transitions
- **Error Handling**: Graceful error management
- **TypeScript**: Full type safety throughout the application

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ai-personal-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the dashboard.

## 🔧 API Configuration

The dashboard is currently running with sample data. To connect real APIs:

### Weather API (OpenWeatherMap)
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Update the weather fetching logic in `WeatherWidget.tsx`

### News API
1. Register at [NewsAPI](https://newsapi.org/)
2. Obtain your API key
3. Modify the news fetching in `NewsWidget.tsx`

### Stock Market API (Alpha Vantage)
1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/)
2. Update the stock data fetching in `StockWidget.tsx`

### Example API Integration

```typescript
// Example weather API integration
const fetchWeatherData = async (apiKey: string, location: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Weather API error:', error);
  }
};
```

## 🎨 Customization

### Theme Customization
The dashboard supports both light and dark themes. Customize colors in `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /* Add your custom colors */
}
```

### Widget Configuration
Widgets can be customized in the `DashboardContext.tsx`:

```typescript
const defaultWidgets = [
  {
    id: 'weather',
    name: 'Weather',
    type: 'weather',
    position: { x: 0, y: 0 },
    size: { width: 2, height: 1 },
    visible: true
  },
  // Add or modify widgets
];
```

## 📱 Mobile Responsiveness

The dashboard is fully responsive with:
- Collapsible sidebar on mobile devices
- Adaptive grid layouts
- Touch-friendly interface elements
- Optimized typography and spacing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🔮 Future Enhancements

### Planned Features
- [ ] Drag-and-drop widget reorganization
- [ ] Custom widget creation
- [ ] Data export functionality (PDF/CSV)
- [ ] Real-time notifications
- [ ] Integration with Google Calendar
- [ ] Advanced analytics with charts
- [ ] User account management
- [ ] Widget marketplace

### Performance Optimizations
- [ ] Virtual scrolling for large datasets
- [ ] Image lazy loading
- [ ] Service worker for offline functionality
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icon set
- **React Query** for data fetching capabilities
- **Shadcn/ui** for the component library foundation

## 📞 Support

For support, email support@example.com or create an issue on GitHub.

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**
