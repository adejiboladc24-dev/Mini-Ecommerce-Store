# 🛍️ LuxeStore - Premium E-commerce Store

A modern, feature-rich e-commerce store built with React, Vite, Tailwind CSS, and Framer Motion. This project showcases a complete shopping experience with authentication, smooth animations, dark mode, and a beautiful UI.

![LuxeStore](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-cyan)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.5-pink)

## ✨ Features

### 🔐 Authentication
- **Login/Signup**: Secure authentication system with form validation
- **Protected Routes**: All pages require authentication
- **User Sessions**: Persistent login across browser sessions
- **Profile Management**: Update user information
- **Logout**: Secure logout from navbar

### 🏠 Pages
- **Login**: Beautiful login/signup page with animated background
- **Home**: Animated hero section with gradient background, featured products slider, category cards, and promotional banner
- **Products**: Grid/list view toggle, advanced filtering, sorting, live search, and pagination
- **Product Details**: Image gallery with zoom, product options (color/size), quantity selector, add to cart/wishlist, related products
- **Cart**: Quantity management, remove items, price calculation, checkout summary
- **Checkout**: Simple one-page form with WhatsApp integration
- **Wishlist**: Save favorite products, quick add to cart
- **User Profile**: Edit profile information, view user details

### 🎨 UI Components
- **Navbar**: Sticky navigation with search, cart/wishlist badges, theme toggle, logout button, mobile responsive
- **Footer**: Multi-column layout with links, newsletter signup, social media icons
- **ProductCard**: Hover effects, quick actions (add to cart/wishlist), rating display
- **ProductGallery**: Multiple images, thumbnail navigation, fullscreen zoom
- **FilterSidebar**: Category, price range, rating, availability filters
- **QuantitySelector**: Increment/decrement with min/max limits
- **Button**: Multiple variants (primary, secondary, outline, ghost) with hover animations
- **Input**: Styled input fields with icon support
- **Modal**: Reusable modal with backdrop blur
- **Toast Notifications**: Success/error/info messages with auto-dismiss

### 🎭 Animations (Framer Motion)
- Hero section with floating elements and gradient animations
- Page transitions with fade and slide effects
- Hover effects on cards and buttons
- Fly-to-cart animation
- Wishlist pop animation
- Scroll fade-in for sections
- Toast notification slide-in
- Product gallery transitions
- Smooth theme toggle

### 🎯 State Management
- **React Context API** for global state
- **localStorage** persistence for cart and wishlist
- **Theme Context**: Dark/light mode with system preference detection
- **Cart Context**: Add, remove, update quantity, calculate totals
- **Wishlist Context**: Add, remove, check if item exists
- **Toast Context**: Show notifications with auto-dismiss

### 🎨 Theme & Styling
- **Dark Mode**: Toggle between light and dark themes
- **Tailwind CSS**: Utility-first styling with custom configuration
- **Custom Colors**: Primary (#6C63FF), Secondary (#00F5FF)
- **Gradient Backgrounds**: Hero sections with animated gradients
- **Glowing Effects**: Buttons and cards with glow animations
- **Responsive Design**: Mobile-first approach, works on all devices
- **Custom Scrollbar**: Styled scrollbar for better UX

### 🔍 Search & Filter
- **Live Search**: Real-time product search across name, description, category
- **Category Filter**: Filter by multiple categories
- **Price Range**: Slider to set min/max price
- **Rating Filter**: Filter by minimum rating
- **Availability**: Show only in-stock items
- **Sorting**: Featured, price (low/high), rating, name

### 📦 Data
- 8 sample products with complete information
- Product categories: Electronics, Fashion, Sports
- Product images from Unsplash
- Multiple product images for gallery
- Product options (colors, sizes)
- Ratings and reviews count

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd vite-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
vite-project/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Button.jsx              # Reusable button component
│   │   ├── FilterSidebar.jsx       # Product filtering sidebar
│   │   ├── Footer.jsx              # Site footer
│   │   ├── Input.jsx               # Styled input component
│   │   ├── Modal.jsx               # Reusable modal
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── ProductCard.jsx         # Product card with actions
│   │   ├── ProductGallery.jsx      # Image gallery with zoom
│   │   ├── QuantitySelector.jsx    # Quantity input
│   │   └── ToastNotification.jsx   # Toast messages
│   ├── context/
│   │   ├── CartContext.jsx         # Cart state management
│   │   ├── ThemeContext.jsx        # Theme state management
│   │   ├── ToastContext.jsx        # Toast notifications
│   │   └── WishlistContext.jsx     # Wishlist state management
│   ├── data/
│   │   └── products.js             # Sample product data
│   ├── pages/
│   │   ├── Cart.jsx                # Shopping cart page
│   │   ├── Home.jsx                # Home page
│   │   ├── ProductDetails.jsx      # Product details page
│   │   ├── Products.jsx            # Products listing page
│   │   ├── Profile.jsx             # User profile page
│   │   └── Wishlist.jsx            # Wishlist page
│   ├── App.jsx                     # Main app component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # App entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Color Palette

- **Primary**: `#6C63FF` (Purple)
- **Secondary**: `#00F5FF` (Cyan)
- **Dark Background**: `#0F0F1E`
- **Dark Card**: `#1A1A2E`
- **Dark Hover**: `#252541`

## 🛠️ Technologies Used

- **React 19.2.0**: UI library
- **Vite 7.3.1**: Build tool and dev server
- **React Router DOM 6.22.0**: Client-side routing
- **Framer Motion 11.0.5**: Animation library
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Lucide React 0.344.0**: Icon library
- **PostCSS & Autoprefixer**: CSS processing

## 🌟 Key Features Explained

### Cart Management
- Add products with selected options (color, size)
- Update quantities
- Remove items
- Calculate subtotal, tax, and total
- Persist cart in localStorage
- Display cart count badge

### Wishlist
- Save favorite products
- Quick add to cart from wishlist
- Remove from wishlist
- Persist in localStorage
- Display wishlist count badge

### Product Filtering
- Filter by multiple categories
- Price range slider
- Minimum rating filter
- In-stock only option
- Clear all filters
- Real-time updates

### Search Functionality
- Search across product name, description, and category
- Live search results
- URL parameter support
- Clear search

### Theme Toggle
- Dark/light mode switch
- Smooth transitions
- Persist preference in localStorage
- System preference detection

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile menu for navigation
- Responsive grid layouts
- Touch-friendly interactions

## 📝 Code Quality

- **Clean Code**: Well-organized, commented, and maintainable
- **Component Reusability**: DRY principles applied
- **Performance**: Optimized re-renders with proper state management
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Error Handling**: Graceful error states and fallbacks

## 🎯 Future Enhancements

- User authentication and authorization
- Backend API integration
- Payment gateway integration
- Order history and tracking
- Product reviews and ratings
- Advanced search with filters
- Product comparison
- Email notifications
- Admin dashboard
- Multi-language support

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, Vite, Tailwind CSS, and Framer Motion

---

**Note**: This is a frontend-only demo project. All data is stored in localStorage and will be lost when clearing browser data. For production use, integrate with a backend API and database.
