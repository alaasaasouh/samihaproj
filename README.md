# Samiha Zeineddine Life Coach Platform

A fully functional, responsive website for Samiha Zeineddine's life coaching services. Built with pure HTML, CSS, and JavaScript - no backend required.

## 📋 Project Overview

This is a complete static website that includes:
- **Landing Page** with hero section and service overview
- **User Dashboard** with multiple functional sections
- **Personality Tests** with language selection (English/Arabic)
- **Reflection Questions** with interactive content
- **Courses & Programs** catalog
- **Test Results** display
- **Payments & Invoices** management
- **Messages & Notifications** system
- **Settings** page with profile management

## 🗂️ Project Structure

```
newsamiha-static/
├── index.html                    # Landing page
├── login.html                    # Login page
├── register.html                 # Registration page
├── user-dashboard.html           # Main user dashboard
├── admin-dashboard.html          # Admin dashboard
├── personality-test.html         # Personality tests with language selection
├── reflection-questions.html     # Reflection questions with language selection
├── courses.html                  # Courses & programs catalog
├── dashboard-demo.html           # Dashboard demo page
├── test-results-demo.html        # Test results display
├── payments-demo.html            # Payments & invoices
├── messages-demo.html            # Messages & notifications
├── settings-demo.html            # Settings & profile management
├── css/
│   ├── style.css                 # Main stylesheet
│   ├── dashboard.css             # Dashboard styles
│   └── loginForm.css             # Login form styles
├── js/
│   ├── script.js                 # Main JavaScript
│   ├── dashboard.js              # Dashboard functionality
│   ├── i18n.js                   # Internationalization
│   └── i18n/
│       ├── en.json               # English translations
│       ├── ar.json               # Arabic translations
│       └── fr.json               # French translations
└── assets/
    └── images/                   # All images and graphics
```

## 🚀 Quick Start

### Option 1: Local Development
1. Extract the zip file
2. Open a terminal in the project directory
3. Run a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and navigate to `http://localhost:8000`

### Option 2: Direct File Access
Simply open `index.html` in your web browser (some features may be limited due to CORS restrictions)

## 📄 Pages & Features

### Landing Page (`index.html`)
- Hero section with call-to-action
- Service cards (Test, Questions, Courses, Booking)
- Contact information
- Social media links
- Navigation menu

### User Dashboard (`user-dashboard.html`)
Complete client portal with sidebar navigation:
- **Dashboard** - Overview and quick actions
- **Personality Test Results** - View completed tests
- **Questions for Samiha** - Ask and track questions
- **Personalized Questions** - Custom coaching questions
- **Courses & Programs** - Browse and enroll in courses
- **Payments & Invoices** - Billing and payment history
- **Messages & Notifications** - Communication hub
- **Settings** - Profile and account management

### Personality Tests (`personality-test.html`)
- Language selection (English/Arabic)
- 3 test types: MBTI, Big Five, Enneagram
- Interactive test cards
- Detailed test descriptions
- Sample questions display

### Reflection Questions (`reflection-questions.html`)
- Language selection (English/Arabic)
- 3 question sets
- Interactive text areas for answers
- Save functionality

### Courses (`courses.html`)
- Language selection (English/Arabic)
- 3 comprehensive courses
- Course details and modules
- Enrollment button

### Test Results (`test-results-demo.html`)
- 3 completed test results
- Detailed personality profiles
- Traits and characteristics
- Download and share options

### Payments (`payments-demo.html`)
- Payment summary
- Invoice history table
- Payment status tracking
- Payment method management
- Download invoice functionality

### Messages & Notifications (`messages-demo.html`)
- Tabbed interface
- Message threads
- Notification history
- Status indicators

### Settings (`settings-demo.html`)
- Profile information
- Communication preferences
- Security settings
- Account management
- Subscription management

## 🌐 Language Support

The website supports multiple languages:
- **English** (en)
- **Arabic** (ar) - with RTL support
- **French** (fr)

Language selection is available on:
- Personality tests
- Reflection questions
- Courses

## 🎨 Design Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Professional Styling** - Elegant color scheme and typography
- **Interactive Elements** - Buttons, modals, tabs, and toggles
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - Semantic HTML and keyboard navigation

## 💻 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive styling with Flexbox and Grid
- **JavaScript (Vanilla)** - No frameworks required
- **JSON** - For translations and data

## 🔧 Customization

### Change Colors
Edit the color values in `css/style.css`:
```css
/* Main brand color */
--primary-color: #8B7355;
```

### Add Translations
Edit the JSON files in `js/i18n/`:
- `en.json` - English
- `ar.json` - Arabic
- `fr.json` - French

### Modify Content
Edit the HTML files directly. All content is clearly labeled with comments.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔐 Security Notes

This is a static website with no backend. For production use:
- Add form validation on the client side
- Implement a backend for data processing
- Use HTTPS for all connections
- Validate and sanitize all user inputs

## 📦 Deployment

### GitHub Pages
1. Push files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Website will be live at `https://username.github.io/repo-name`

### Netlify
1. Connect your GitHub repository
2. Set build command to: `echo "No build required"`
3. Set publish directory to: `/`

### Traditional Hosting
1. Upload all files to your web server
2. Ensure `.htaccess` or server config allows directory access
3. Set `index.html` as default document

## 🚀 Future Enhancements

To add backend functionality:
1. **User Authentication** - Login/registration system
2. **Database** - Store user data, tests, courses
3. **Payment Processing** - Stripe or PayPal integration
4. **Email Notifications** - Send emails to users
5. **Admin Panel** - Manage users, courses, payments
6. **API** - RESTful API for mobile apps

## 📝 License

This project is proprietary and confidential.

## 👤 Contact

For questions or support, contact Samiha Zeineddine:
- Phone: +961 76 723 303
- Email: contact@coaching.com
- Facebook: @lifecoachbysamiha
- Instagram: @lifecoach.samiha

## ✅ Checklist for Production

- [ ] Update all contact information
- [ ] Replace placeholder images with real ones
- [ ] Update course descriptions and pricing
- [ ] Add real test questions
- [ ] Set up email notifications
- [ ] Implement payment processing
- [ ] Add analytics tracking
- [ ] Test on all browsers
- [ ] Test on mobile devices
- [ ] Set up SSL certificate
- [ ] Configure domain name
- [ ] Deploy to production server

---

**Version:** 1.0.0  
**Last Updated:** November 26, 2025  
**Status:** Ready for Deployment
