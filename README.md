# أكاديمية إعمل بيزنس - DBA Online Template

This is a static website template for DBA Online program.

## 🚀 Deployment Instructions

### Option 1: Deploy to Vercel (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it as a static site
   - Click "Deploy"

### Option 2: Manual Vercel CLI Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 3: Alternative Hosting Platforms

#### Netlify:
- Drag and drop your project folder to [netlify.com/drop](https://netlify.com/drop)

#### GitHub Pages:
- Enable GitHub Pages in your repository settings
- Set source to "Deploy from a branch" and select "main"

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
└── public/             # Static assets
    ├── images/         # Image assets
    └── ...
```

## 🔧 Development

To run locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

## 🐛 Common Issues

### 404 Error on Vercel
- Ensure `vercel.json` is in the root directory
- Check that all image paths are correct
- Make sure `index.html` is in the root directory

### Images Not Loading
- Verify image paths are relative and start with `./public/` or `/public/`
- Check that all image files exist in the `public/images/` directory

### Deployment Failures
- Ensure your GitHub repository is public or you have proper access
- Check that `package.json` exists in the root directory
- Verify `vercel.json` syntax is valid JSON

## 📞 Support

If you encounter issues, please check:
1. All files are committed to your GitHub repository
2. `vercel.json` and `package.json` are in the root directory
3. Image paths are consistent throughout the project
