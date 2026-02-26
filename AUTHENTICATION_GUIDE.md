# LuxeStore Authentication System

## 🔐 Overview

LuxeStore now requires users to sign in before accessing the website. This ensures a personalized shopping experience and secure checkout process.

## ✨ Features

### Authentication System
- **Sign Up**: Create new account with name, email, password, and optional phone
- **Sign In**: Login with email and password
- **Protected Routes**: All pages require authentication except login
- **Persistent Sessions**: Users stay logged in across browser sessions
- **Logout**: Secure logout from navbar (desktop & mobile)
- **Profile Management**: Update user information from profile page

### Security Features
- ✅ Password validation (minimum 6 characters)
- ✅ Email uniqueness check
- ✅ Secure session management
- ✅ Protected routes with automatic redirect
- ✅ User data stored in localStorage (encrypted in production)

## 🚀 User Flow

### First Time Users
1. Visit website → Redirected to `/login`
2. Click "Sign Up" to create account
3. Fill form:
   - Full Name (required)
   - Email Address (required)
   - Password (required, min 6 chars)
   - Phone Number (optional)
4. Click "Create Account"
5. Automatically logged in → Redirected to Home page

### Returning Users
1. Visit website → Redirected to `/login`
2. Enter email and password
3. Click "Sign In"
4. Redirected to Home page

### Logged In Users
- Browse all pages freely
- User name shown in profile
- Logout button in navbar (desktop & mobile)
- Profile page shows user information
- Can update profile details

## 📱 Login Page Features

### Design
- Luxury mesh gradient background
- Animated LuxeStore logo
- Glassmorphism card design
- Smooth transitions between login/signup
- Password visibility toggle
- Trust badges (220+ products, secure checkout, 24/7 support)

### Form Fields

**Sign Up:**
- Full Name *
- Email Address *
- Password * (min 6 characters)
- Phone Number (optional)

**Sign In:**
- Email Address *
- Password *

### Validation
- All required fields must be filled
- Email must be valid format
- Password must be at least 6 characters
- Email must be unique (signup only)
- Clear error messages for validation failures

## 🔧 Technical Implementation

### Files Created/Modified

**New Files:**
- `src/context/AuthContext.jsx` - Authentication context provider
- `src/pages/Login.jsx` - Login/Signup page component

**Modified Files:**
- `src/App.jsx` - Added AuthProvider and ProtectedRoute wrapper
- `src/components/Navbar.jsx` - Added logout button and user display
- `src/pages/Profile.jsx` - Integrated with AuthContext for user data

### Data Storage

**localStorage Keys:**
- `luxestore_user` - Current logged-in user (without password)
- `luxestore_users` - Array of all registered users

**User Object Structure:**
```javascript
{
  id: "unique_timestamp",
  name: "John Doe",
  email: "john@example.com",
  phone: "+234 XXX XXX XXXX",
  createdAt: "2026-02-26T...",
  // Additional fields from profile updates
  address: "...",
  bio: "..."
}
```

### Protected Routes

All routes except `/login` are protected:
- `/` - Home
- `/products` - Products listing
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/orders` - Order history
- `/wishlist` - Wishlist
- `/profile` - User profile

If user is not authenticated, they are automatically redirected to `/login`.

## 🎨 UI Components

### Navbar Updates
- **Desktop**: Profile icon + Logout icon (top right)
- **Mobile**: Profile link + Logout button (in menu)
- **Logout**: Red-tinted button with LogOut icon
- **Hover Effects**: Scale animations on all buttons

### Login Page
- **Background**: Animated mesh gradient with floating elements
- **Logo**: Rotating LuxeStore sparkle icon
- **Form**: Glassmorphism card with smooth animations
- **Toggle**: Easy switch between Login/Signup modes
- **Password**: Show/hide toggle with eye icon
- **Features**: Trust badges at bottom of form

## 🧪 Testing Authentication

### Test Signup
1. Go to website (redirects to login)
2. Click "Sign Up"
3. Fill form:
   - Name: "Test User"
   - Email: "test@luxestore.com"
   - Password: "test123"
   - Phone: "+234 123 456 7890"
4. Click "Create Account"
5. Should see success toast
6. Should be redirected to home page
7. Should see logout button in navbar

### Test Login
1. Logout from navbar
2. Should redirect to login page
3. Enter credentials:
   - Email: "test@luxestore.com"
   - Password: "test123"
4. Click "Sign In"
5. Should see welcome toast
6. Should be redirected to home page

### Test Protected Routes
1. Logout
2. Try to access `/products` directly
3. Should redirect to `/login`
4. Login
5. Should redirect back to home
6. Now can access all pages

### Test Profile
1. Login
2. Go to Profile page
3. Should see your name and email
4. Click "Edit Profile"
5. Update information
6. Click "Save"
7. Should see success toast
8. Information should persist

### Test Logout
1. **Desktop**: Click logout icon (top right)
2. **Mobile**: Open menu → Click "Logout"
3. Should see logout toast
4. Should redirect to login page
5. Try accessing any page → Should redirect to login

## 🔒 Security Notes

### Current Implementation (Development)
- Passwords stored in plain text in localStorage
- No server-side validation
- No rate limiting
- No password recovery

### Production Recommendations
1. **Backend Integration**: Move authentication to server
2. **Password Hashing**: Use bcrypt or similar
3. **JWT Tokens**: Implement token-based auth
4. **HTTPS**: Ensure all traffic is encrypted
5. **Rate Limiting**: Prevent brute force attacks
6. **Email Verification**: Verify email addresses
7. **Password Recovery**: Add forgot password flow
8. **2FA**: Optional two-factor authentication
9. **Session Timeout**: Auto-logout after inactivity
10. **Audit Logs**: Track login attempts

## 📊 User Data

### What's Stored
- User ID (timestamp-based)
- Full name
- Email address
- Password (plain text - should be hashed in production)
- Phone number (optional)
- Account creation date
- Profile updates (address, bio, etc.)

### What's NOT Stored
- Credit card information
- Payment details
- Social security numbers
- Sensitive personal data

## 🎯 Benefits

### For Users
- Personalized shopping experience
- Order history tracking
- Saved wishlist and cart
- Profile management
- Secure checkout with saved info

### For Business
- User analytics and insights
- Customer relationship management
- Targeted marketing opportunities
- Order tracking and management
- Customer support efficiency

## 🐛 Troubleshooting

**Can't login?**
- Check email and password are correct
- Ensure account was created (try signup)
- Clear browser cache and try again
- Check browser console for errors

**Redirected to login constantly?**
- Clear localStorage: `localStorage.clear()`
- Refresh page
- Try signup again

**Profile not updating?**
- Ensure you're logged in
- Check browser console for errors
- Try logout and login again

**Logout not working?**
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Check browser console

## 🔄 Migration from Previous Version

If you had cart/wishlist data before authentication:
1. Data is stored per browser, not per user
2. After login, previous cart/wishlist should still be available
3. Data is tied to browser localStorage, not user account
4. Future update: Sync cart/wishlist with user account

## 📞 Support

For authentication issues:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try incognito/private mode
4. Clear all site data and retry
5. Check `TESTING_GUIDE.md` for detailed tests

## 🎉 Success Criteria

✅ Users must login before accessing website
✅ Signup creates new account
✅ Login authenticates existing users
✅ Logout clears session
✅ Protected routes redirect to login
✅ Profile shows user information
✅ Session persists across page reloads
✅ Smooth animations and transitions
✅ Mobile responsive
✅ No console errors
