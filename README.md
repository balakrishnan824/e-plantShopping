# Paradise Nursery Shopping Application

**Project name:** Paradise Nursery — e-plantShopping

Paradise Nursery is a React + Redux Toolkit shopping application for buying houseplants online.
Customers land on a welcome page, browse plants grouped by category, add them to a cart,
adjust quantities, and review their running total.

## Features
- Landing page with company name, short description and a **Get Started** button
- About Us section describing the company
- Product listing: 18 houseplants in 3 categories (6 each) with thumbnail, name and price
- **Add to Cart** button that disables itself once a plant has been added
- Navbar (Home, Plants, Cart) on the listing and cart pages
- Live cart icon showing the total number of items
- Cart page with per-item subtotal, total cart amount, +/− quantity buttons, delete button
- **Checkout** button (shows "Coming Soon") and **Continue Shopping** button

## Tech stack
React 18, Redux Toolkit, React Redux, Vite

## Getting started
```bash
npm install
npm run dev      # open the URL shown in the terminal
npm run build    # production build
```

## Project structure
```
src/
  main.jsx        # entry point, wraps App in the Redux Provider
  store.js        # Redux store
  CartSlice.jsx   # cart reducer: addItem, removeItem, updateQuantity
  App.jsx         # landing page + page switching
  App.css         # landing page background image + global styles
  AboutUs.jsx     # company information
  ProductList.jsx # plant catalogue + navbar
  CartItem.jsx    # shopping cart page
```
