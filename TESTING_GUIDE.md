# LuxeStore Testing Guide

## 🚀 Quick Start

```bash
cd vite-project
npm install
npm run dev
```

Then open your browser to the URL shown (usually http://localhost:5173)

## ✅ Test Checklist

### 1. Navigation & Scroll Behavior
- [ ] Click on any navigation link
- [ ] Verify page loads from the TOP (not middle or bottom)
- [ ] Test all pages: Home, Products, Cart, Wishlist, Profile
- [ ] Verify smooth scrolling and no jumping

### 2. Product Browsing
- [ ] Home page loads with slideshow (changes every 3 seconds)
- [ ] LuxeStore branding is prominent
- [ ] Stats counter animates on load
- [ ] Click "Shop Now" button
- [ ] Products page shows 12 items per page
- [ ] Pagination works correctly
- [ ] Filter by category (Electronics, Fashion, Kitchen, Sports)
- [ ] Search functionality works
- [ ] Sort options work (price, rating, name)

### 3. Shopping Cart
- [ ] Add product to cart from Products page
- [ ] Add product from Product Details page
- [ ] View cart - items display correctly
- [ ] Adjust quantity using +/- buttons
- [ ] Remove items from cart
- [ ] Cart total calculates correctly (subtotal + 10% tax)
- [ ] "Proceed to Checkout" button navigates to Checkout page

### 4. Checkout Flow (CRITICAL TEST)
- [ ] Checkout page loads from top
- [ ] Form displays with all fields:
  - Full Name
  - Phone Number
  - Email Address
  - Delivery Address
  - City
  - State
- [ ] Order summary shows on right sidebar
- [ ] All cart items display correctly
- [ ] Total amount is correct
- [ ] Try submitting empty form - should show error
- [ ] Fill all fields with test data:
  - Name: "Test Customer"
  - Phone: "+234 123 456 7890"
  - Email: "test@example.com"
  - Address: "123 Test Street"
  - City: "Lagos"
  - State: "Lagos State"
- [ ] Click "Submit Order & Contact via WhatsApp"
- [ ] WhatsApp opens in new tab/window
- [ ] Message contains:
  - Customer name, phone, email
  - Delivery address
  - All order items with quantities and prices
  - Order total
- [ ] Phone number in WhatsApp is: +234 707 027 9453
- [ ] Cart is cleared after submission
- [ ] Success toast notification appears

### 5. Wishlist
- [ ] Add items to wishlist (heart icon)
- [ ] View wishlist page
- [ ] Remove items from wishlist
- [ ] Move items from wishlist to cart

### 6. Dark Mode
- [ ] Toggle dark mode from navbar
- [ ] All pages render correctly in dark mode
- [ ] Colors and contrast are good
- [ ] Preference persists on page reload

### 7. Responsive Design
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop viewport (1920px)
- [ ] Navigation menu works on mobile
- [ ] Forms are usable on mobile
- [ ] Images load correctly on all sizes

### 8. Performance
- [ ] Page loads quickly
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Images load properly
- [ ] Slideshow transitions smoothly

## 🐛 Known Behaviors (Not Bugs)

1. **WhatsApp Redirect**: Opens in new tab - this is intentional
2. **Cart Cleared**: After checkout submission, cart is cleared - this is correct
3. **No Payment Processing**: This is a WhatsApp-based store, payment happens via chat
4. **Order History**: Saved in browser localStorage, will persist until cleared

## 📱 WhatsApp Message Format

When you submit an order, the WhatsApp message should look like:

```
🛍️ *New Order from LuxeStore*

*Customer Information:*
Name: Test Customer
Phone: +234 123 456 7890
Email: test@example.com

*Delivery Address:*
123 Test Street
Lagos, Lagos State

*Order Items:*
• Product Name (x2) - $199.98
• Another Product (x1) - $49.99

*Order Summary:*
Subtotal: $249.97
Tax (10%): $25.00
*Total: $274.97*

Please confirm this order and provide payment details. Thank you!
```

## ✨ Features to Showcase

1. **Luxury Design**: Mesh gradients, glassmorphism, premium typography
2. **Product Slideshow**: Auto-plays on home page every 3 seconds
3. **Live Stats**: Animated counter on home page
4. **220+ Products**: 55 products in each of 4 categories
5. **Pagination**: 12 products per page with smooth navigation
6. **Simple Checkout**: One-page form, no complicated steps
7. **WhatsApp Integration**: Direct communication with seller
8. **Scroll to Top**: All pages load from top on navigation

## 🎯 Success Criteria

✅ All pages load from top
✅ Checkout form collects customer info
✅ Submit button redirects to WhatsApp with complete order details
✅ No console errors
✅ Smooth animations and transitions
✅ Professional, luxury appearance
✅ Mobile responsive

## 🔧 Troubleshooting

**WhatsApp doesn't open?**
- Check if WhatsApp is installed or WhatsApp Web is accessible
- Try copying the phone number: +234 707 027 9453
- Manually send the order details via WhatsApp

**Page doesn't scroll to top?**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Products not loading?**
- Check console for errors
- Verify `src/data/products.js` exists
- Restart dev server

**Styles look broken?**
- Verify Tailwind CSS is working
- Check `src/index.css` is imported
- Restart dev server

## 📞 Support

For issues or questions about the implementation, refer to:
- `FIXES_APPLIED.md` - Summary of changes made
- `FEATURES.md` - Complete feature list
- `PROJECT_SUMMARY.md` - Project overview
