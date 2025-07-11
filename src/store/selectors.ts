import { createSelector } from 'reselect';
import { RootState } from './index';

// Base selectors
const selectUserState = (state: RootState) => state.user;
const selectCartState = (state: RootState) => state.cart;

// User selectors with memoization
export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectUserToken = createSelector(
  [selectUserState],
  (userState) => userState.token
);

export const selectIsAuthenticated = createSelector(
  [selectUserState],
  (userState) => userState.isAuthenticated
);

export const selectUserLoading = createSelector(
  [selectUserState],
  (userState) => userState.isLoading
);

export const selectUserError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

export const selectUserId = createSelector(
  [selectUser],
  (user) => user?._id || null
);

// Cart selectors with memoization
export const selectCartItems = createSelector(
  [selectCartState],
  (cartState) => cartState.cartItems
);

export const selectCartTotalPrice = createSelector(
  [selectCartState],
  (cartState) => cartState.cartTotalPrice
);

export const selectCartTotalUniqueItems = createSelector(
  [selectCartState],
  (cartState) => cartState.currentCartTotalUniqueItems
);

export const selectCartTotalProducts = createSelector(
  [selectCartState],
  (cartState) => cartState.totalProduct || 0
);

export const selectCartLoading = createSelector(
  [selectCartState],
  (cartState) => cartState.isLoading
);

export const selectCartError = createSelector(
  [selectCartState],
  (cartState) => cartState.error
);

export const selectCartUpdatingQuantity = createSelector(
  [selectCartState],
  (cartState) => cartState.isUpdatingQuantity
);

export const selectCartRemovingItem = createSelector(
  [selectCartState],
  (cartState) => cartState.isRemovingItem
);

export const selectCartAddingItem = createSelector(
  [selectCartState],
  (cartState) => cartState.isAddingItem
);

// Combined selectors
export const selectCartCount = createSelector(
  [selectCartTotalProducts],
  (totalProducts) => totalProducts
);

export const selectUserAuthStatus = createSelector(
  [selectUser, selectIsAuthenticated, selectUserToken],
  (user, isAuthenticated, token) => ({
    user,
    isAuthenticated,
    token,
    hasValidSession: isAuthenticated && !!user && !!token
  })
);