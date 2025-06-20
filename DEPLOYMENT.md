# Vue E-commerce - Netlify Deployment

This Vue.js e-commerce application is configured for automatic deployment with Netlify.

## 🚀 Deployment Setup

### 1. Connect to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Netlify will auto-detect the build settings from `netlify.toml`

### 2. Build Configuration

The project is configured with:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node.js version**: 18
- **Environment**: Production optimized

### 3. Environment Variables

Set these in Netlify dashboard (Site settings → Environment variables):

```
NODE_ENV=production
VITE_APP_NAME=Vue E-commerce
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://fakestoreapi.com
```

### 4. Features Included

✅ **SPA Routing**: All routes redirect to `index.html`  
✅ **Security Headers**: XSS protection, content type options  
✅ **Caching**: Optimized cache headers for performance  
✅ **Build Optimization**: Minified assets, tree shaking  
✅ **Source Maps**: Disabled for production (faster builds)

### 5. Deployment Process

1. **Push to main branch** → Automatic deployment triggered
2. **Build process** → `npm install` → `npm run build`
3. **Deploy** → Site goes live at your Netlify URL
4. **Preview** → Branch deploys for testing

### 6. Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS records
4. Enable HTTPS (automatic with Let's Encrypt)

### 7. Branch Deploys

- **Main branch**: Production deployment
- **Feature branches**: Preview deployments
- **Pull requests**: Deploy previews with unique URLs

## 📊 Performance Features

- **Asset optimization**: Images, CSS, JS minification
- **Gzip compression**: Automatic compression
- **CDN**: Global content delivery network
- **Build caching**: Faster subsequent builds

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (test locally)
npm run build
npm run preview
```

## 📝 Configuration Files

- `netlify.toml`: Main Netlify configuration
- `.env.production`: Production environment variables
- `package.json`: Build scripts and dependencies
