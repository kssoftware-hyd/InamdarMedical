# Care Hospital & Inamdar Medical Stores Website

A professional, responsive website for Care Hospital & Inamdar Medical Stores in Bhokar, Maharashtra, built with HTML, CSS, Bootstrap, and JavaScript.

## Features

### 🏥 Main Website Features
- **Modern Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)
- **Beautiful UI/UX** - Professional medical-themed design with smooth animations
- **Home Page** - Hero section with hospital information, services overview, and quick contact
- **About Us Page** - Detailed information about retail pharmacy, wholesale distribution, and hospital services
- **Order Medicine Page** - Easy online medicine ordering with multiple medicine support
- **Contact Page** - Contact form, Google Maps integration, FAQ section
- **WhatsApp Integration** - Direct WhatsApp chat button and order redirect
- **Admin Dashboard** - Secure admin panel to manage orders and messages

### 📱 Pages Included
1. **index.html** - Homepage
2. **about.html** - About Us page with services
3. **order.html** - Medicine ordering page
4. **contact.html** - Contact page with map and FAQ
5. **admin-dashboard.html** - Admin panel (password protected)

### 🎨 Design Highlights
- Custom color scheme matching medical/healthcare theme
- Google Fonts: Playfair Display (headings) + Manrope (body)
- Font Awesome icons
- Bootstrap 5.3.0 framework
- CSS animations and transitions
- Gradient backgrounds
- Card-based layouts
- Sticky navigation

## 🚀 Setup Instructions

### Quick Start
1. Extract all files to a folder
2. Open `index.html` in any modern web browser
3. The website is fully functional with client-side features

### File Structure
```
website/
│
├── index.html              # Home page
├── about.html              # About Us page
├── order.html              # Order Medicine page
├── contact.html            # Contact page
├── admin-dashboard.html    # Admin Dashboard
│
├── styles.css              # Main stylesheet
├── about.css               # About page styles
├── order.css               # Order page styles
├── contact.css             # Contact page styles
├── admin.css               # Admin dashboard styles
│
├── script.js               # Main JavaScript
├── order.js                # Order page functionality
├── contact.js              # Contact page functionality
└── admin.js                # Admin dashboard functionality
```

## 🔐 Admin Login Credentials

To access the Admin Dashboard:
- **URL**: Open `admin-dashboard.html` or click "Admin" in navigation
- **Username**: `admin`
- **Password**: `inamdar@2025`

**Note**: For production use, implement proper server-side authentication.

## 📋 Key Information

### Business Details
- **Name**: Care Hospital & Inamdar Medical Stores
- **Location**: Bhokar - Kinwat Rd, beside Gramin Bank, Bhokar, Maharashtra 431801
- **Phone**: 092845 04673
- **WhatsApp**: 919284504673
- **Rating**: 5.04 stars on Google

### Working Hours
- **Monday - Saturday**: 9 AM - 7 PM
- **Sunday**: 10 AM - 5 PM
- **Closed**: 2nd & 4th Sunday of every month

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables, flexbox, grid
- **Bootstrap 5.3.0** - Responsive framework
- **JavaScript (ES6)** - Interactive functionality
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Typography
- **LocalStorage** - Data persistence (orders, messages)

## 📱 Features in Detail

### Order System
- Add multiple medicines in single order
- Customer information collection
- Delivery or pickup options
- WhatsApp order forwarding
- Order storage in browser localStorage
- Admin can view and manage orders

### Contact System
- Contact form with multiple subjects
- Direct phone and WhatsApp links
- Google Maps integration
- FAQ accordion
- Message storage for admin review

### Admin Dashboard
- View all orders with status tracking
- Manage contact messages
- Statistics overview
- Search functionality
- Update order status (Pending → Processing → Completed → Cancelled)
- Delete orders and messages
- Direct WhatsApp contact from dashboard

## 🌐 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 📱 Mobile Responsive

Fully responsive design tested on:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px)

## 🔧 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0a4d68;
    --secondary-color: #088395;
    --accent-color: #05bfdb;
    --light-accent: #00ffca;
}
```

### Contact Information
Update in each HTML file:
- Phone number: Search for "092845 04673"
- WhatsApp: Search for "919284504673"
- Address: Search for address text

### Admin Credentials
Update in `script.js`:
```javascript
const adminCredentials = {
    username: 'admin',
    password: 'inamdar@2025'
};
```

## 🚀 Deployment Options

### Option 1: GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in settings
4. Access via: `https://yourusername.github.io/repository-name`

### Option 2: Web Hosting
1. Upload all files to your hosting via FTP/cPanel
2. Ensure index.html is in root directory
3. Access via your domain

### Option 3: Netlify/Vercel
1. Drag and drop folder to Netlify or Vercel
2. Get instant deployment
3. Free SSL certificate included

## ⚠️ Important Notes

1. **LocalStorage**: Currently uses browser localStorage for data. For production:
   - Implement backend API (Node.js, PHP, Python)
   - Use proper database (MySQL, MongoDB)
   - Add server-side validation

2. **Security**: Admin login is client-side only. For production:
   - Implement JWT or session-based auth
   - Use HTTPS
   - Add CSRF protection

3. **Prescription Upload**: Currently noted but not implemented. Add:
   - File upload functionality
   - Image/PDF handling
   - Secure storage

4. **Payment Gateway**: Not included. Integrate:
   - Razorpay
   - PayU
   - Paytm
   - Or cash-on-delivery

## 📞 Support & Contact

For questions or modifications:
- Call: 092845 04673
- WhatsApp: 919284504673
- Visit: Bhokar - Kinwat Rd, Bhokar, Maharashtra

## 📄 License

This website is created for Care Hospital & Inamdar Medical Stores.
All rights reserved © 2025 Inamdar Medical

---

**Version**: 1.0.0  
**Last Updated**: February 2025  
**Developer**: Professional Web Development Team
