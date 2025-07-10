# Authentication Implementation for Lumina Storefront

## Overview
This document outlines the complete authentication system implementation for the Lumina Storefront Next.js RSC application, including login/register pages, user session management with cookies, and integration with cart operations.

## Features Implemented

### 1. Authentication System
- **Login Page**: `/auth/login` with username, password, and phoneNumber fields
- **Register Page**: `/auth/register` with form validation
- **Session Management**: Cookie-based session using `user-session-lumina-storefront` cookie
- **Auto-initialization**: User session restored on app startup from cookies

### 2. State Management
- **UserSlice**: Redux slice for managing user authentication state
- **User Store Integration**: All cart operations now use userId from authenticated user
- **Error Handling**: Comprehensive error handling with toast notifications

### 3. UI Components
- **AuthLayout**: Centered authentication layout with logo
- **Toast Notifications**: Sonner component for user feedback
- **Form Validation**: Client-side validation for all auth forms

### 4. API Integration
- **Login API**: `/users/login` endpoint integration
- **Profile API**: `/users/profile` endpoint for user data retrieval
- **Session Persistence**: Token stored in httpOnly cookies for security

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx          # Centered auth layout with logo
│   │   └── UserInitializer.tsx     # Session initialization from cookies
│   └── ui/
│       └── sonner.tsx              # Toast notification component
├── store/
│   ├── user/
│   │   └── userSlice.ts            # User authentication state management
│   └── index.ts                    # Updated store config with userSlice
├── services/api/auth/
│   ├── login.ts                    # Login API service
│   └── profile.ts                  # Profile API service
├── lib/
│   └── cookies.ts                  # Cookie management utilities
├── hooks/
│   └── useCart.ts                  # Updated with user integration
├── app/
│   ├── auth/
│   │   ├── login/page.tsx          # Login page
│   │   └── register/page.tsx       # Register page
│   └── layout.tsx                  # Updated with UserInitializer & Toaster
```

## Key Components

### UserSlice State
```typescript
interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

### Cart Integration
- All cart operations (add, update, remove) now automatically use the authenticated user's ID
- Toast notifications for success/error feedback
- Automatic login check before cart operations

### Cookie Management
- Cookie name: `user-session-lumina-storefront`
- HttpOnly for security
- 7-day expiration
- Automatic cleanup on logout

## API Endpoints Used

### Login
- **Endpoint**: `POST /users/login`
- **Body**: `{ username, password, phoneNumber }`
- **Response**: `{ message, data: User, token }`

### Profile
- **Endpoint**: `POST /users/profile`
- **Body**: `{ token }`
- **Response**: `{ data: User, message }`

## Redux Actions

### User Actions
- `loginAsync`: Handle user login
- `getUserProfileAsync`: Fetch user profile by token
- `setUserFromCookie`: Set user data from cookie session
- `logout`: Clear user session
- `clearUserError`: Clear error messages

### Updated Cart Actions
- `addToCartAsync`: Add item to cart (now uses user ID from store)
- `updateCartQuantityAsync`: Update cart item quantity
- `removeFromCartAsync`: Remove item from cart
- All cart actions now include toast notifications

## Session Flow

1. **Login**: User submits credentials → API call → Token saved to cookie → User data in store
2. **App Startup**: UserInitializer checks cookie → Fetches user profile → Updates store
3. **Cart Operations**: Automatically use authenticated user ID → Show toast feedback
4. **Logout**: Clear store + Remove cookie

## Security Features

- HttpOnly cookies to prevent XSS attacks
- Token validation on profile requests
- Automatic session cleanup
- Client-side auth state management

## Toast Notifications

All operations include user feedback:
- Login success/failure
- Cart operations (add/update/remove)
- Validation errors
- Authentication required messages

## Usage Examples

### Login Flow
```typescript
// User submits login form
const result = await dispatch(loginAsync(formData)).unwrap();
setClientSessionCookie(result.token);
toast.success("Login berhasil!");
```

### Cart Operations
```typescript
// Add to cart (automatically uses authenticated user)
const { addToCart } = useReduxCart();
await addToCart({
  shoeId: "shoe123",
  selectedVariantId: "variant456",
  quantity: 1
});
// Toast notification automatically shown
```

### Session Check
```typescript
// Cart operations automatically check authentication
if (!user?._id) {
  toast.error("Silakan login terlebih dahulu");
  return;
}
```

## Next Steps

1. **Register API**: Implement registration endpoint integration
2. **Logout Handler**: Add logout functionality to navbar
3. **Protected Routes**: Add route protection middleware
4. **Profile Management**: User profile edit functionality
5. **Password Reset**: Forgot password feature

## Testing

To test the implementation:
1. Start the development server: `npm run dev`
2. Navigate to `/auth/login`
3. Enter credentials (username, password, phoneNumber)
4. Verify session persistence on page refresh
5. Test cart operations with authenticated user
6. Check toast notifications for all operations