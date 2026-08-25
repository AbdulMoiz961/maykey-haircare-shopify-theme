# Maykey Hair Care — Shopify Online Store 2.0 Theme

A custom, high-converting, accessible Shopify 2.0 theme built specifically for **Maykey Hair Care** (Pakistan Market).

## ✨ Theme Architecture & Features

- **Online Store 2.0 (OS 2.0)**: Fully modular JSON templates (`index.json`, `product.json`, `collection.json`, `cart.json`, etc.) with customizable Liquid sections and blocks.
- **Design Aesthetic**: Premium Apothecary × Editorial (The Ordinary × Aesop).
- **Typography Pairing**: *Cormorant Garamond* (Serif display headlines) + *Plus Jakarta Sans* (Clean geometric sans body).
- **Pakistan E-Commerce Specifics**:
  - Prominent **Cash on Delivery (COD)** trust guarantees throughout hero, PDP, and cart.
  - Dynamic **Free Nationwide Delivery** threshold progress bar (configured for Rs. 2,500+).
  - Floating, pulsating **WhatsApp Support Widget** (`wa.me`) with pre-filled message support.
  - Payment method trust badges (COD, Easypaisa, JazzCash, Bank Transfer).
- **Product Detail Page (PDP)**:
  - Sticky gallery with shade indicator overlay and thumbnail selector.
  - Interactive shade pill selector synchronized with image and price.
  - **Cross-Product Sibling Format Switcher** (`30ml Sachet Pack` ↔ `250ml Pump Bottle`).
  - Dynamic Price & Savings Percentage pill calculator.
  - Collapsible metafield accordions with smooth single-open expand animation.
- **Interactive Slide-In Cart Drawer**:
  - AJAX Add to Cart, line item quantity updates, and live subtotal calculator.
  - Free delivery progress indicator.
  - Instant COD checkout button.

---

## 📁 Directory Breakdown

```
maykey-haircare-shopify-theme/
├── assets/
│   ├── base.css             # Theme design tokens, typography, and responsive styles
│   └── global.js            # Cart drawer AJAX, variant selectors, and animations
├── config/
│   ├── settings_schema.json # Customizer settings (Colors, COD options, WhatsApp, Socials)
│   └── settings_data.json   # Default theme preset values
├── layout/
│   └── theme.liquid         # Master layout wrapper
├── locales/
│   └── en.default.json      # Default translations and string mappings
├── sections/
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero-banner.liquid
│   ├── trust-bar.liquid
│   ├── product-comparison.liquid
│   ├── shade-selector.liquid
│   ├── ingredients.liquid
│   ├── how-to-use.liquid
│   ├── faq-accordion.liquid
│   ├── main-product.liquid
│   ├── related-products.liquid
│   ├── main-collection.liquid
│   ├── main-cart.liquid
│   ├── main-page.liquid
│   ├── main-404.liquid
│   └── footer.liquid
├── snippets/
│   ├── css-variables.liquid
│   ├── cart-drawer.liquid
│   ├── whatsapp-fab.liquid
│   ├── product-card.liquid
│   └── icon-*.liquid        # Minimalist SVG icons (truck, package, clock, shield, leaf, etc.)
└── templates/
    ├── index.json           # Homepage structure & section blocks
    ├── product.json         # PDP structure & metafield tabs
    ├── collection.json
    ├── cart.json
    ├── page.json
    └── 404.json
```

---

## 🚀 How to Preview & Deploy with Shopify CLI

1. **Log in to your Shopify store**:
   ```bash
   shopify auth login --store your-store.myshopify.com
   ```
2. **Start live development server with hot reload**:
   ```bash
   cd "D:\Project\Maykey Ecommerce Website\maykey_ecommerce_shopify\maykey-haircare-shopify-theme"
   shopify theme dev
   ```
3. **Push to Shopify Theme Library**:
   ```bash
   shopify theme push
   ```
