# Hey there! 👋 Welcome to My Portfolio

Hey! I'm Elijah Paulman, a Computer Science student at The Ohio State University, and this is my personal website. I built this from scratch to showcase my journey, skills, and the cool projects I've worked on.

### Performance Boosts
- **Lazy Loading**: Images now load only when you scroll to them - way faster initial loading!
- **Smart Caching**: The site remembers data and assets so returning visitors get instant loading
- **Service Worker**: Works offline and caches everything for that snappy feel
- **Optimized Code**: Cleaned up all the messy CSS and JavaScript

### UX
- **Dark Mode Toggle**: Easy on the eyes with smooth theme switching
- **Loading States**: You'll see nice loading animations instead of blank spaces
- **Better Error Handling**: If something goes wrong, you'll get a helpful message instead of a broken page
- **Smooth Animations**: Subtle animations that make everything feel polished

### Accessibility
- **Keyboard Navigation**: Tab through everything without a mouse
- **Screen Reader Friendly**: Proper labels and structure for assistive technologies
- **High Contrast Support**: Works great for users who need higher contrast
- **Motion Preferences**: Respects when users prefer reduced motion

### Developer
- **JSON Validation**: Automatic checking to make sure my data files are correct
- **Build Scripts**: Easy commands to validate and serve the site
- **Clean Architecture**: Well-organized code that's easy to maintain

## What's Inside

```
├── index.html              # The main page
├── css/
│   └── eli-resume-style.css # All the styling magic
├── js/
│   ├── data-loader.js      # Loads all my project data
│   ├── theme-toggle.js     # Dark/light mode switcher
│   └── ...                 # Other interactive features
├── data/                   # All my info in JSON files
│   ├── personal.json       # About me, contact info
│   ├── skills.json         # Programming languages & tools
│   ├── experience.json     # Work and internship history
│   ├── projects.json       # My coding projects
│   ├── education.json      # School background
│   └── faq.json           # Common questions
├── scripts/
│   └── validate-data.js    # Checks data file integrity
├── package.json           # Project setup and commands
└── sw.js                  # Service worker for caching
```

## Getting Started (Super Easy!)

### What You Need
- Node.js (version 14 or newer)
- Any modern web browser

### Quick Setup
1. **Grab the code**: Clone or download this repository
2. **Install stuff**: Open terminal and run `npm install`
3. **Check everything works**: Run `npm run validate`
4. **View locally**: Run `npm run serve` and open http://localhost:8000

### Handy Commands
```bash
npm run validate    # Check if my data files are correct
npm run serve      # Start local server
npm run build      # Validate everything
```

## Technical Stuff

### Performance Features
- Service worker caches everything for offline use
- Images load lazily to save bandwidth
- JSON data is cached in memory
- Graceful error handling if things go wrong

### Accessibility Standards
- Follows WCAG 2.1 AA guidelines
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader optimization

## SEO & Analytics

I added structured data so Google understands what the site is about, plus analytics to track what's working well.

## Found a Bug or Want to Contribute?

- **Issues**: Found something broken? Let me know!
- **Features**: Have ideas for improvements? I'm all ears!

Just open an issue or submit a pull request. I love collaborating with other developers!

## Let's Connect!

**Elijah Paulman**
- 📧 **Email**: eli.paulman@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/elijahpaulman/](https://www.linkedin.com/in/elijahpaulman/)
- 🐙 **GitHub**: [github.com/elipaulman](https://github.com/elipaulman)

Feel free to reach out if you want to chat about code, opportunities, or just say hi!
