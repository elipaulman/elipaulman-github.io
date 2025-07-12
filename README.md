# Eli Paulman's Portfolio Website

A modern, responsive portfolio website featuring a data-driven resume and a Progressive Web App (PWA) weather application.

## 🔗 Quick Links

<div align="center">

**🌐 [Portfolio Website](https://epaulman.com/) | 🌦️ [Weather App](https://epaulman.com/weather) | 💼 [LinkedIn](https://www.linkedin.com/in/elijahpaulman/) | 🐙 [GitHub](https://github.com/elipaulman)**

📧 **Contact**: [eli.paulman@gmail.com](mailto:eli.paulman@gmail.com)

</div>

## ✨ Features

### Portfolio Site (`index.html`)
- **Data-Driven Content**: Portfolio sections dynamically load from JSON files
- **Responsive Design**: Bootstrap-based layout that works on all devices
- **Interactive Timeline**: Animated experience and education sections
- **Theme Toggle**: Light/dark mode support
- **Analytics Integration**: Google Analytics and custom event tracking

### Weather App (`weather.html`)
- **Progressive Web App (PWA)**: Installable with offline capabilities
- **Real-Time Weather Data**: Current conditions and 5-day forecasts
- **Interactive Charts**: 24-hour temperature trends using Chart.js
- **Location Services**: GPS-based location detection and city search
- **Unit Conversion**: Fahrenheit/Celsius temperature toggle
- **Push Notifications**: Weather alert system (ready for future implementation)
- **Service Worker**: Caching and background sync capabilities

## 🏗️ Architecture

### Data-Driven Portfolio System
The portfolio content is managed through JSON files in the `/data/` directory:

```
data/
├── personal.json     # Contact info, bio, graduation details
├── experience.json   # Work experience timeline
├── projects.json     # Project portfolio
├── education.json    # Academic background
├── skills.json       # Technical skills categorization
└── faq.json         # Frequently asked questions
```

Content is rendered via the `PortfolioDataLoader` class in `js/data-loader.js`, which fetches all JSON files concurrently and populates the DOM.

### PWA Weather Application
- **Service Worker** (`sw.js`): Handles caching, offline functionality, and background sync
- **Web App Manifest** (`manifest.json`): Defines PWA metadata for installation
- **Weather API Integration**: OpenWeatherMap API for current conditions and forecasts
- **Performance Optimization**: 10-minute weather data caching and lazy loading

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 4
- **Icons**: Font Awesome
- **Charts**: Chart.js for data visualization
- **PWA**: Service Workers, Web App Manifest
- **APIs**: OpenWeatherMap API, Google Analytics
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── index.html              # Main portfolio page
├── weather.html            # Weather PWA application
├── sw.js                   # Service Worker for PWA functionality
├── manifest.json           # PWA manifest file
├── css/
│   ├── eli-resume-style.css    # Main portfolio styles
│   ├── weather.css             # Weather app styles
│   └── bootstrap.min.css       # Bootstrap framework
├── js/
│   ├── data-loader.js          # Portfolio content management
│   ├── weather.js              # Weather app logic
│   ├── analytics.js            # Custom analytics tracking
│   └── theme-toggle.js         # Dark/light mode toggle
├── data/                   # JSON content files
├── images/                 # Assets and favicons
└── Resumes/               # PDF resume downloads
```

## 🚀 Development

### Local Development
1. Clone the repository
2. Serve from the root directory (paths assume root deployment)
3. For PWA features, use HTTPS in production

### Content Updates
- Edit JSON files in `/data/` directory to update portfolio content
- Changes are reflected immediately (no build process required)
- Service Worker registration is disabled in development mode

### Weather App Development
- API key is included for demo purposes
- Service Worker caching is disabled during development
- Use browser dev tools to test PWA installation and offline features

## 📱 PWA Features

The weather application is a full Progressive Web App with:
- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Cached resources work without internet
- **Background Sync**: Weather data updates in the background
- **Push Notifications**: Ready for weather alert implementation
- **Responsive**: Optimized for mobile and desktop experiences

## 📊 Analytics

The site includes comprehensive analytics tracking:
- **Google Analytics**: Page views and user behavior
- **Custom Events**: Weather app interactions, unit changes, geolocation usage
- **Performance Monitoring**: API response times and error tracking

---

*Built with ❤️ by Eli Paulman - Computer Science & Engineering Student at The Ohio State University*
