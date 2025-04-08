# StreamShare - Streaming Subscription Sharing Marketplace

A landing page for StreamShare, a platform that connects people looking to share streaming service subscriptions safely and securely.

![StreamShare Screenshot](/screenshots/streamshare-screenshot.png)

## Overview

StreamShare is a conceptual platform that allows users to:
- Share streaming subscriptions with others to save money
- Find subscription partners for various streaming services
- Securely manage payments and access between members
- Maintain profile separation and privacy

## Features

- Responsive design that works on mobile and desktop
- Email collection for early access/waitlist
- User testimonials
- Service visualizations and mockups
- Pricing transparency with example savings
- Security badges and trust indicators
- Service comparison table
- Admin panel for email management (accessible by pressing 'A' key 3 times)

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage for email management

## Directory Structure

```
streamshare/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── admin.js
├── img/
│   ├── mockup.png
│   ├── security-badges/
│   └── ...
├── screenshots/
│   └── streamshare-screenshot.png
├── LICENSE
└── README.md
```

## Setup and Deployment

1. Clone the repository:
```bash
git clone https://github.com/yourusername/streamshare.git
```

2. Navigate to the project directory:
```bash
cd streamshare
```

3. Open `index.html` in your browser to view the site locally.

### Deployment Options:

#### GitHub Pages
1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Select the main branch as the source
4. Save to deploy the site

#### Netlify
1. Sign up/login to [Netlify](https://www.netlify.com/)
2. Drag and drop your entire project folder to the Netlify dashboard
3. Alternatively, connect your GitHub repository for continuous deployment

#### Vercel
1. Sign up/login to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Follow the setup instructions

## Future Enhancements

- Backend integration for email storage
- User authentication system
- Subscription listing and matching algorithm
- Payment processing integration
- Mobile app development

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
