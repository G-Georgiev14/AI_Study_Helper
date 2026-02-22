# CodeLaunch Portfolio Template

A professional, responsive portfolio template designed for developers to showcase their projects and skills effectively.

## 🚀 Features

- ✨ **Modern Design** - Clean, professional layout that impresses recruiters
- 📱 **Fully Responsive** - Looks perfect on all devices
- ⚡ **Fast Loading** - Optimized for performance
- 🎨 **Easy Customization** - Simple HTML/CSS structure
- 🔧 **SEO Optimized** - Built to rank on search engines
- 📧 **Contact Form** - Functional contact section
- 🎯 **Project Showcase** - Beautiful project cards with live demos
- 📊 **Skills Section** - Animated skill bars
- 🌙 **Dark Mode Ready** - Easy to add dark mode

## 📁 Files Included

```
portfolio-template/
├── portfolio-template.html    # Main HTML file
├── portfolio-styles.css      # Styling
├── portfolio-script.js       # JavaScript functionality
└── README.md                 # This file
```

## 🛠️ Quick Setup (10 Minutes)

### Step 1: Personalize Your Information

Open `portfolio-template.html` and update:

1. **Page Title** (line 5):
   ```html
   <title>Your Name - Full Stack Developer</title>
   ```

2. **Meta Description** (line 6):
   ```html
   <meta name="description" content="Your professional description">
   ```

3. **Navigation Logo** (line 25):
   ```html
   <a href="#home">Your Name</a>
   ```

### Step 2: Update Hero Section

Find the hero section (around line 40) and update:

```html
<h1 class="hero-title">
    Hi, I'm <span class="highlight">Your Name</span>
</h1>
<h2 class="hero-subtitle">Your Title (e.g., Full Stack Developer)</h2>
<p class="hero-description">
    Your professional description and passion statement.
</p>
```

### Step 3: Add Your Social Links

Update social media links (around line 55):

```html
<a href="https://github.com/yourusername" class="social-link">
    <i class="fab fa-github"></i>
</a>
<a href="https://linkedin.com/in/yourusername" class="social-link">
    <i class="fab fa-linkedin"></i>
</a>
<a href="https://twitter.com/yourusername" class="social-link">
    <i class="fab fa-twitter"></i>
</a>
```

### Step 4: Customize About Section

Update the about section (around line 75) with your personal story and stats.

### Step 5: Add Your Projects

Replace the placeholder projects (around line 110) with your actual projects:

```html
<div class="project-card">
    <div class="project-image">
        <img src="path-to-your-project-screenshot.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">
            Brief description of what your project does and the problems it solves.
        </p>
        <div class="project-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
            <!-- Add more tech tags -->
        </div>
        <div class="project-links">
            <a href="https://your-project-demo.com" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="https://github.com/yourusername/project" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
        </div>
    </div>
</div>
```

### Step 6: Update Skills

Adjust the skill bars (around line 200) to match your actual skill levels:

```html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 85%"></div>
    </div>
</div>
```

### Step 7: Configure Contact Information

Update contact details (around line 250):

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your.email@example.com</span>
</div>
<div class="contact-item">
    <i class="fas fa-phone"></i>
    <span>+1 (555) 123-4567</span>
</div>
```

### Step 8: Deploy Your Portfolio

1. **GitHub Pages** (Free):
   - Upload files to a GitHub repository
   - Go to Settings → Pages
   - Select main branch and save
   - Your portfolio will be live at `https://yourusername.github.io/repository-name`

2. **Netlify** (Free):
   - Drag and drop the folder to netlify.com
   - Get instant deployment with custom URL

3. **Vercel** (Free):
   - Connect your GitHub repository
   - Automatic deployment on every push

## 🎨 Customization Tips

### Changing Colors

Open `portfolio-styles.css` and update these variables:

```css
:root {
    --primary-color: #667eea;  /* Main brand color */
    --secondary-color: #764ba2; /* Secondary color */
    --text-color: #333;         /* Main text color */
    --background-color: #ffffff; /* Background color */
}
```

### Adding New Sections

1. Add HTML section in the appropriate location
2. Add corresponding CSS styles
3. Update navigation menu if needed

### Custom Fonts

The template uses Inter font from Google Fonts. To change:

1. Find the Google Font link in the HTML `<head>`
2. Replace with your preferred font
3. Update `font-family` in CSS

## 📱 Mobile Optimization

The template is fully responsive. Test on different devices:

- Use browser developer tools to test mobile views
- Ensure all text is readable on small screens
- Check that navigation works properly on mobile

## 🚀 Performance Tips

1. **Optimize Images**: Compress project screenshots before adding
2. **Minify CSS/JS**: Use online minifiers for production
3. **Enable Gzip**: Configure server compression
4. **Use CDN**: Host assets on CDN for faster loading

## 📈 SEO Best Practices

1. **Update Meta Tags**: Ensure title and description are relevant
2. **Add Alt Text**: Describe all images properly
3. **Use Semantic HTML**: Proper heading structure (h1, h2, h3)
4. **Add Schema Markup**: Include structured data for better search visibility

## 🐛 Troubleshooting

**Images not loading?**
- Check file paths are correct
- Ensure images are in the same folder or use absolute paths

**Contact form not working?**
- The form is client-side only for this template
- For production, integrate with a backend service like Formspree or Netlify Forms

**Navigation not smooth?**
- Ensure JavaScript is properly linked
- Check browser console for errors

## 📄 License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## 🤝 Support

If you need help with customization or have questions:

1. Check this README first
2. Review the code comments
3. Test changes in browser developer tools
4. Make small changes and test incrementally

---

**Happy Coding! 🎉**

Your professional portfolio is ready to impress recruiters and showcase your amazing work to the world!
