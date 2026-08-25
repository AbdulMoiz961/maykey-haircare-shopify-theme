/**
 * Maykey Hair Care — Global JavaScript
 * Handles Cart Drawer, Variant Selectors, Accordions, and Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initAccordions();
  initHeroTabs();
  initShadeTabs();
  initScrollAnimations();
});

/* ============================================================
   1. CART DRAWER & AJAX CART API
   ============================================================ */
function initCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  const closeBtn = document.getElementById('cartDrawerCloseBtn');
  const triggers = document.querySelectorAll('[data-cart-drawer-trigger]');

  if (!overlay) return;

  window.openCartDrawer = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeCartDrawer = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      window.openCartDrawer();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeCartDrawer);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      window.closeCartDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      window.closeCartDrawer();
    }
  });

  // Intercept Ajax Add To Cart Forms
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('form[action*="/cart/add"]');
    if (!form) return;

    e.preventDefault();
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }

    try {
      const formData = new FormData(form);
      const res = await fetch(window.ShopifyTheme?.routes?.cart_add_url || '/cart/add.js', {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });

      if (!res.ok) throw new Error('Add to cart failed');

      await refreshCartDrawer();
      window.openCartDrawer();
    } catch (err) {
      console.error('Error adding to cart:', err);
      // Fallback submit if AJAX fails
      form.submit();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = originalText;
      }
    }
  });

  // Delegate quantity plus/minus buttons inside Cart Drawer
  overlay.addEventListener('click', async (e) => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;

    const cartItem = btn.closest('.cart-item');
    const input = cartItem?.querySelector('.qty-input');
    if (!input) return;

    let currentQty = parseInt(input.value, 10) || 0;
    const action = btn.dataset.action;
    const lineKey = input.dataset.key;

    if (action === 'increase') currentQty += 1;
    if (action === 'decrease') currentQty = Math.max(0, currentQty - 1);

    input.value = currentQty;
    await updateCartQuantity(lineKey, currentQty);
  });
}

async function updateCartQuantity(lineKey, quantity) {
  try {
    const res = await fetch(window.ShopifyTheme?.routes?.cart_change_url || '/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ id: lineKey, quantity: quantity })
    });

    if (!res.ok) throw new Error('Cart update failed');
    await refreshCartDrawer();
  } catch (err) {
    console.error('Error updating cart line:', err);
  }
}

async function refreshCartDrawer() {
  try {
    const res = await fetch(`${window.location.pathname}?section_id=cart-drawer-section`);
    // Alternatively fetch /cart.js and update UI
    const cartRes = await fetch('/cart.js');
    const cart = await cartRes.json();

    // Update cart counts across the page
    document.querySelectorAll('.header-cart-badge, #cartDrawerCount').forEach((badge) => {
      badge.textContent = badge.id === 'cartDrawerCount' ? `(${cart.item_count})` : cart.item_count;
    });

    // If section rendering is available, update body or reload page
    window.location.reload();
  } catch (err) {
    console.warn('Cart refreshed, fallback reload', err);
    window.location.reload();
  }
}

/* ============================================================
   2. ACCORDION DRAWERS (FAQ & PDP METAFIELDS)
   ============================================================ */
function initAccordions() {
  document.addEventListener('click', (e) => {
    // FAQ Trigger
    const faqBtn = e.target.closest('.faq-question-btn');
    if (faqBtn) {
      const item = faqBtn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Optional: close other FAQ items
      document.querySelectorAll('.faq-item.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        faqBtn.setAttribute('aria-expanded', 'true');
      }
      return;
    }

    // PDP Metafield Drawer Trigger
    const drawerBtn = e.target.closest('.pdp-drawer-trigger');
    if (drawerBtn) {
      const item = drawerBtn.closest('.pdp-drawer-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.pdp-drawer-item.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.pdp-drawer-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        drawerBtn.setAttribute('aria-expanded', 'true');
      }
    }
  });
}

/* ============================================================
   3. HERO PRODUCT SWITCHER TABS
   ============================================================ */
function initHeroTabs() {
  const tabs = document.querySelectorAll('.switcher-tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const target = tab.dataset.target;
      document.querySelectorAll('.hero-tab-content').forEach((content) => {
        content.style.display = content.id === target ? 'flex' : 'none';
      });
    });
  });
}

/* ============================================================
   4. SHADE SELECTOR TABS
   ============================================================ */
function initShadeTabs() {
  const tabButtons = document.querySelectorAll('.shade-tab-pill');
  const shadeCards = document.querySelectorAll('.shade-card');

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      shadeCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
    });
  });
}

/* ============================================================
   5. SCROLL TRIGGERED FADE-IN ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const elements = document.querySelectorAll(
    '.comparison-card, .shade-card, .ingredient-card, .step-card, .trust-card, .product-card'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
  });
}
