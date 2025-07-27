# Deployment Guide for RBIH Developer Portal

This guide explains how to deploy the RBIH Developer Portal to GitHub Pages with the custom domain `rbih.tech`.

## Prerequisites

1. A GitHub repository for your project
2. Ownership of the domain `rbih.tech`
3. Access to your domain's DNS settings

## Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit of RBIH Developer Portal"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git push -u origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Build and deployment**:
   - Source: Select **GitHub Actions**

## Step 3: Configure DNS for Custom Domain

Add the following DNS records to your domain (`rbih.tech`):

### For apex domain (rbih.tech):
Create 4 A records pointing to GitHub's IP addresses:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### For www subdomain (optional):
Create a CNAME record:
- Name: `www`
- Value: `YOUR_USERNAME.github.io`

## Step 4: Wait for DNS Propagation

DNS changes can take up to 48 hours to propagate, but usually complete within a few hours.

## Step 5: Verify Deployment

Once the GitHub Actions workflow completes:
1. Visit https://rbih.tech
2. The site should be live with HTTPS enabled (GitHub provides free SSL)

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the site
npm run build

# Deploy using GitHub Pages deploy command
npm run deploy
```

Note: For manual deployment, you'll need to add the deploy script to package.json:

```json
{
  "scripts": {
    "deploy": "docusaurus deploy"
  }
}
```

And configure deployment in `docusaurus.config.ts`:

```typescript
{
  // ... other config
  organizationName: 'YOUR_GITHUB_USERNAME',
  projectName: 'YOUR_REPO_NAME',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
}
```

## Troubleshooting

### Site not loading
- Check GitHub Actions tab for build errors
- Verify DNS records are correctly configured
- Ensure CNAME file exists in static folder

### Custom domain not working
- Check DNS propagation status
- Verify domain settings in GitHub Pages settings
- Ensure CNAME file contains only: `rbih.tech`

### Build failures
- Check Node.js version (should be 18+)
- Run `npm install` locally and test build
- Check for TypeScript errors

## Updating the Site

After initial setup, simply push to the main branch:

```bash
git add .
git commit -m "Update documentation"
git push
```

GitHub Actions will automatically build and deploy your changes.

## Security Considerations

1. Keep your repository public for free GitHub Pages hosting
2. Don't commit sensitive information (API keys, passwords)
3. Use environment variables for any sensitive configuration
4. Enable Dependabot for security updates

## Performance Tips

1. Optimize images before committing
2. Use appropriate image formats (WebP for photos, PNG for graphics)
3. Enable caching headers (handled by GitHub Pages)
4. Monitor site performance with Google PageSpeed Insights