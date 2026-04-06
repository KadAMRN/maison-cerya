/* ============================================
   MAISON CERYA — Main JavaScript
   Shopify Buy SDK Integration & UI
   ============================================ */

(function () {
  "use strict";

  // ============================================
  // SHOPIFY CONFIGURATION
  // Replace these with your actual Shopify store credentials
  // ============================================
  const SHOPIFY_CONFIG = {
    domain: "YOUR-STORE.myshopify.com", // Your Shopify store domain
    storefrontAccessToken: "YOUR-TOKEN-HERE", // Storefront API access token
  };

  // ============================================
  // STATE
  // ============================================
  let shopifyClient = null;
  let checkout = null;
  let cart = [];

  // ============================================
  // DEMO PRODUCTS (shown when Shopify is not configured)
  // Replace these with your actual products once Shopify is set up
  // ============================================
  const DEMO_PRODUCTS = [
    {
      id: 1,
      title: "Robe Alger",
      price: "12 500 DA",
      priceNum: 12500,
      category: "robes",
      badge: "Nouveau",
      description:
        "Robe élégante inspirée du patrimoine algérien, confectionnée en tissu premium.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["#1a1a1a", "#c9a96e", "#f5f3f0"],
    },
    {
      id: 2,
      title: "Ensemble Oran",
      price: "15 800 DA",
      priceNum: 15800,
      category: "ensembles",
      badge: null,
      description:
        "Ensemble deux pièces raffiné, coupe moderne et détails traditionnels.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["#2d2d2d", "#e8d5b0"],
    },
    {
      id: 3,
      title: "Robe Constantine",
      price: "18 000 DA",
      priceNum: 18000,
      category: "robes",
      badge: "Best-seller",
      description:
        "Notre pièce signature: robe longue avec broderies subtiles.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["#0a0a0a", "#c9a96e", "#8b6f47"],
    },
    {
      id: 4,
      title: "Foulard Tipaza",
      price: "3 200 DA",
      priceNum: 3200,
      category: "accessoires",
      badge: null,
      description: "Foulard en soie douce avec motifs géométriques algériens.",
      sizes: [],
      colors: ["#c9a96e", "#f5f3f0", "#1a1a1a"],
    },
    {
      id: 5,
      title: "Robe Tlemcen",
      price: "14 200 DA",
      priceNum: 14200,
      category: "robes",
      badge: "Nouveau",
      description:
        "Robe fluide aux lignes épurées, parfaite pour les occasions spéciales.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["#f5f3f0", "#c9a96e"],
    },
    {
      id: 6,
      title: "Ensemble Annaba",
      price: "16 500 DA",
      priceNum: 16500,
      category: "ensembles",
      badge: null,
      description:
        "Ensemble chic alliant confort et élégance pour la femme active.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["#2d2d2d", "#6b6b6b"],
    },
    {
      id: 7,
      title: "Ceinture Djemila",
      price: "4 800 DA",
      priceNum: 4800,
      category: "accessoires",
      badge: null,
      description: "Ceinture artisanale en cuir véritable avec boucle dorée.",
      sizes: ["S", "M", "L"],
      colors: ["#8b6f47", "#1a1a1a"],
    },
    {
      id: 8,
      title: "Robe Ghardaïa",
      price: "19 500 DA",
      priceNum: 19500,
      category: "robes",
      badge: "Édition limitée",
      description:
        "Pièce d'exception aux inspirations sahariennes, finitions haute couture.",
      sizes: ["S", "M", "L"],
      colors: ["#c9a96e", "#f5f3f0"],
    },
  ];

  // ============================================
  // INITIALIZATION
  // ============================================
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initSearch();
    initCart();
    initAnimations();
    initNewsletter();
    initShopify();
    loadPageProducts();
  });

  // ============================================
  // SHOPIFY INTEGRATION
  // ============================================
  function initShopify() {
    if (typeof ShopifyBuy === "undefined") return;
    if (SHOPIFY_CONFIG.domain === "YOUR-STORE.myshopify.com") {
      console.info(
        "Maison Cerya: Running in demo mode. Configure Shopify credentials in js/app.js to connect your store.",
      );
      return;
    }

    try {
      shopifyClient = ShopifyBuy.buildClient({
        domain: SHOPIFY_CONFIG.domain,
        storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
      });

      // Create a checkout session
      shopifyClient.checkout.create().then(function (newCheckout) {
        checkout = newCheckout;
      });

      // Fetch products
      shopifyClient.product.fetchAll().then(function (products) {
        window.shopifyProducts = products;
        loadPageProducts();
      });
    } catch (e) {
      console.warn("Shopify initialization failed, running in demo mode.", e);
    }
  }

  // ============================================
  // PRODUCT RENDERING
  // ============================================
  function loadPageProducts() {
    const featuredGrid = document.getElementById("featuredProducts");
    const newArrivalsGrid = document.getElementById("newArrivals");
    const shopGrid = document.getElementById("shopProducts");

    if (window.shopifyProducts && window.shopifyProducts.length > 0) {
      // Use Shopify products
      const products = window.shopifyProducts.map(mapShopifyProduct);
      if (featuredGrid) renderProducts(featuredGrid, products.slice(0, 4));
      if (newArrivalsGrid)
        renderProducts(newArrivalsGrid, products.slice(0, 4));
      if (shopGrid) renderProducts(shopGrid, products);
    } else {
      // Use demo products
      if (featuredGrid) renderProducts(featuredGrid, DEMO_PRODUCTS.slice(0, 4));
      if (newArrivalsGrid)
        renderProducts(newArrivalsGrid, DEMO_PRODUCTS.slice(4, 8));
      if (shopGrid) {
        const category = new URLSearchParams(window.location.search).get(
          "category",
        );
        const filtered = category
          ? DEMO_PRODUCTS.filter(function (p) {
              return p.category === category;
            })
          : DEMO_PRODUCTS;
        renderProducts(shopGrid, filtered);
        updateShopCount(filtered.length);
      }
    }
  }

  function mapShopifyProduct(product) {
    const variant = product.variants[0];
    return {
      id: product.id,
      title: product.title,
      price: formatPrice(variant.price.amount),
      priceNum: parseFloat(variant.price.amount),
      category: product.productType ? product.productType.toLowerCase() : "",
      badge: product.tags && product.tags.length > 0 ? product.tags[0] : null,
      description: product.descriptionHtml || product.description,
      image: product.images.length > 0 ? product.images[0].src : null,
      handle: product.handle,
      shopifyId: product.id,
      variantId: variant.id,
    };
  }

  function formatPrice(amount) {
    const num = Math.round(parseFloat(amount));
    return num.toLocaleString("fr-DZ") + " DA";
  }

  function renderProducts(container, products) {
    container.innerHTML = products
      .map(function (product) {
        const badgeHTML = product.badge
          ? '<span class="product-badge">' +
            escapeHtml(product.badge) +
            "</span>"
          : "";
        const imageHTML = product.image
          ? '<img src="' +
            escapeHtml(product.image) +
            '" alt="' +
            escapeHtml(product.title) +
            '" loading="lazy">'
          : '<div class="product-placeholder"></div>';

        return (
          '<a href="product.html?id=' +
          product.id +
          '" class="product-card" data-category="' +
          escapeHtml(product.category) +
          '">' +
          '<div class="product-image">' +
          badgeHTML +
          imageHTML +
          '<div class="product-quick-add" data-id="' +
          product.id +
          '">Ajouter au panier</div>' +
          "</div>" +
          '<div class="product-info">' +
          '<h3 class="product-name">' +
          escapeHtml(product.title) +
          "</h3>" +
          '<p class="product-price">' +
          escapeHtml(product.price) +
          "</p>" +
          "</div>" +
          "</a>"
        );
      })
      .join("");

    // Add quick-add event listeners
    container.querySelectorAll(".product-quick-add").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var productId = parseInt(this.dataset.id) || this.dataset.id;
        addToCart(productId);
      });
    });
  }

  function updateShopCount(count) {
    var el = document.getElementById("shopCount");
    if (el) el.textContent = count + " produit" + (count !== 1 ? "s" : "");
  }

  // ============================================
  // CART MANAGEMENT
  // ============================================
  function initCart() {
    var savedCart = localStorage.getItem("maisoncerya_cart");
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
        updateCartUI();
      } catch (e) {
        cart = [];
      }
    }

    document.getElementById("cartBtn").addEventListener("click", openCart);
    document.getElementById("cartClose").addEventListener("click", closeCart);
    document.getElementById("cartOverlay").addEventListener("click", closeCart);

    var checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", handleCheckout);
    }
  }

  function addToCart(productId) {
    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : DEMO_PRODUCTS;
    var product = products.find(function (p) {
      return p.id === productId;
    });
    if (!product) return;

    var existing = cart.find(function (item) {
      return item.id === productId;
    });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        priceNum: product.priceNum,
        image: product.image || null,
        qty: 1,
        variantId: product.variantId || null,
      });
    }

    saveCart();
    updateCartUI();
    openCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter(function (item) {
      return item.id !== productId;
    });
    saveCart();
    updateCartUI();
  }

  function updateQty(productId, delta) {
    var item = cart.find(function (item) {
      return item.id === productId;
    });
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    updateCartUI();
  }

  function saveCart() {
    localStorage.setItem("maisoncerya_cart", JSON.stringify(cart));
  }

  function updateCartUI() {
    var countEl = document.getElementById("cartCount");
    var itemsEl = document.getElementById("cartItems");
    var footerEl = document.getElementById("cartFooter");
    var totalEl = document.getElementById("cartTotal");

    var totalItems = cart.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
    countEl.textContent = totalItems;
    countEl.classList.toggle("visible", totalItems > 0);

    if (cart.length === 0) {
      itemsEl.innerHTML =
        '<div class="cart-empty"><p>Votre panier est vide</p><a href="shop.html" class="btn btn-primary">Découvrir la boutique</a></div>';
      footerEl.style.display = "none";
      return;
    }

    footerEl.style.display = "block";

    var total = cart.reduce(function (sum, item) {
      return sum + item.priceNum * item.qty;
    }, 0);
    totalEl.textContent = total.toLocaleString("fr-DZ") + " DA";

    itemsEl.innerHTML = cart
      .map(function (item) {
        return (
          '<div class="cart-item">' +
          '<div class="cart-item-image"' +
          (item.image
            ? ' style="background-image:url(' +
              escapeHtml(item.image) +
              ');background-size:cover;"'
            : "") +
          "></div>" +
          '<div class="cart-item-info">' +
          '<p class="cart-item-name">' +
          escapeHtml(item.title) +
          "</p>" +
          '<p class="cart-item-price">' +
          escapeHtml(item.price) +
          "</p>" +
          '<div class="cart-item-qty">' +
          '<button data-action="decrease" data-id="' +
          item.id +
          '">−</button>' +
          "<span>" +
          item.qty +
          "</span>" +
          '<button data-action="increase" data-id="' +
          item.id +
          '">+</button>' +
          "</div>" +
          '<button class="cart-item-remove" data-action="remove" data-id="' +
          item.id +
          '">Supprimer</button>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    itemsEl.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = parseInt(this.dataset.id) || this.dataset.id;
        var action = this.dataset.action;
        if (action === "increase") updateQty(id, 1);
        else if (action === "decrease") updateQty(id, -1);
        else if (action === "remove") removeFromCart(id);
      });
    });
  }

  function openCart() {
    document.getElementById("cartSidebar").classList.add("active");
    document.getElementById("cartOverlay").classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("cartOverlay").classList.remove("active");
    document.body.style.overflow = "";
  }

  function handleCheckout() {
    if (shopifyClient && checkout) {
      // Add items to Shopify checkout
      var lineItems = cart
        .map(function (item) {
          return { variantId: item.variantId, quantity: item.qty };
        })
        .filter(function (item) {
          return item.variantId;
        });

      if (lineItems.length > 0) {
        shopifyClient.checkout
          .addLineItems(checkout.id, lineItems)
          .then(function (updatedCheckout) {
            window.location.href = updatedCheckout.webUrl;
          });
        return;
      }
    }
    // If Shopify is not configured, show a message
    alert(
      "Merci pour votre intérêt ! Pour finaliser votre commande, contactez-nous sur Instagram @maison.cerya ou par email.",
    );
  }

  // ============================================
  // NAVBAR
  // ============================================
  function initNavbar() {
    var navbar = document.getElementById("navbar");
    var announcementBar = document.querySelector(".announcement-bar");
    var lastScroll = 0;

    window.addEventListener("scroll", function () {
      var currentScroll = window.scrollY;

      if (currentScroll > 50) {
        navbar.classList.add("scrolled");
        if (announcementBar)
          announcementBar.style.transform = "translateY(-100%)";
      } else {
        navbar.classList.remove("scrolled");
        if (announcementBar) announcementBar.style.transform = "translateY(0)";
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  function initMobileMenu() {
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      toggle.classList.toggle("active");
      menu.classList.toggle("active");
      document.body.style.overflow = menu.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // ============================================
  // SEARCH
  // ============================================
  function initSearch() {
    var searchBtn = document.getElementById("searchBtn");
    var searchOverlay = document.getElementById("searchOverlay");
    var searchClose = document.getElementById("searchClose");
    var searchInput = document.getElementById("searchInput");

    if (!searchBtn) return;

    searchBtn.addEventListener("click", function () {
      searchOverlay.classList.add("active");
      setTimeout(function () {
        searchInput.focus();
      }, 300);
    });

    searchClose.addEventListener("click", function () {
      searchOverlay.classList.remove("active");
    });

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && this.value.trim()) {
        var query = encodeURIComponent(this.value.trim());
        window.location.href = "shop.html?search=" + query;
      }
    });
  }

  // ============================================
  // ANIMATIONS (Intersection Observer)
  // ============================================
  function initAnimations() {
    var elements = document.querySelectorAll(
      ".fade-up, .product-card, .category-card",
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ============================================
  // NEWSLETTER
  // ============================================
  function initNewsletter() {
    var form = document.getElementById("newsletterForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]').value;
      // In production, connect this to your email service (Mailchimp, etc.)
      form.innerHTML =
        '<p style="color: var(--color-warm-dark); font-size: 0.85rem;">Merci pour votre inscription !</p>';
    });
  }

  // ============================================
  // SHOP PAGE FILTERS
  // ============================================
  window.filterProducts = function (category) {
    document.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.classList.toggle(
        "active",
        btn.dataset.category === category ||
          (!category && btn.dataset.category === "all"),
      );
    });

    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : DEMO_PRODUCTS;

    var filtered = category
      ? products.filter(function (p) {
          return p.category === category;
        })
      : products;

    var shopGrid = document.getElementById("shopProducts");
    if (shopGrid) {
      renderProducts(shopGrid, filtered);
      updateShopCount(filtered.length);
    }
  };

  window.sortProducts = function (sortBy) {
    var shopGrid = document.getElementById("shopProducts");
    if (!shopGrid) return;

    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : DEMO_PRODUCTS;

    var activeFilter = document.querySelector(".filter-btn.active");
    var category = activeFilter ? activeFilter.dataset.category : "all";
    if (category && category !== "all") {
      products = products.filter(function (p) {
        return p.category === category;
      });
    }

    switch (sortBy) {
      case "price-asc":
        products.sort(function (a, b) {
          return a.priceNum - b.priceNum;
        });
        break;
      case "price-desc":
        products.sort(function (a, b) {
          return b.priceNum - a.priceNum;
        });
        break;
      case "name":
        products.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        break;
    }

    renderProducts(shopGrid, products);
  };

  // ============================================
  // PRODUCT DETAIL PAGE
  // ============================================
  window.initProductDetail = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = parseInt(urlParams.get("id")) || urlParams.get("id");

    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : DEMO_PRODUCTS;

    var product =
      products.find(function (p) {
        return p.id === productId;
      }) || products[0];
    if (!product) return;

    // Populate product detail page
    var titleEl = document.getElementById("productTitle");
    var priceEl = document.getElementById("productPrice");
    var descEl = document.getElementById("productDesc");

    if (titleEl) titleEl.textContent = product.title;
    if (priceEl) priceEl.textContent = product.price;
    if (descEl) descEl.textContent = product.description;

    // Sizes
    var sizesContainer = document.getElementById("productSizes");
    if (sizesContainer && product.sizes) {
      sizesContainer.innerHTML = product.sizes
        .map(function (size) {
          return (
            '<button class="size-btn" data-size="' +
            escapeHtml(size) +
            '">' +
            escapeHtml(size) +
            "</button>"
          );
        })
        .join("");

      sizesContainer.querySelectorAll(".size-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          sizesContainer.querySelectorAll(".size-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          this.classList.add("active");
        });
      });
    }

    // Colors
    var colorsContainer = document.getElementById("productColors");
    if (colorsContainer && product.colors) {
      colorsContainer.innerHTML = product.colors
        .map(function (color) {
          return (
            '<button class="color-swatch" style="background:' +
            escapeHtml(color) +
            '" data-color="' +
            escapeHtml(color) +
            '"></button>'
          );
        })
        .join("");

      colorsContainer.querySelectorAll(".color-swatch").forEach(function (btn) {
        btn.addEventListener("click", function () {
          colorsContainer
            .querySelectorAll(".color-swatch")
            .forEach(function (b) {
              b.classList.remove("active");
            });
          this.classList.add("active");
        });
      });
    }

    // Quantity
    var qtyInput = document.getElementById("qtyInput");
    var qtyMinus = document.getElementById("qtyMinus");
    var qtyPlus = document.getElementById("qtyPlus");

    if (qtyMinus)
      qtyMinus.addEventListener("click", function () {
        var val = parseInt(qtyInput.value) || 1;
        qtyInput.value = Math.max(1, val - 1);
      });

    if (qtyPlus)
      qtyPlus.addEventListener("click", function () {
        var val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
      });

    // Add to cart
    var addBtn = document.getElementById("addToCartDetail");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        var qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
        for (var i = 0; i < qty; i++) {
          addToCart(product.id);
        }
      });
    }

    // Tabs
    document.querySelectorAll(".tab-header").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".tab-header").forEach(function (t) {
          t.classList.remove("active");
        });
        document.querySelectorAll(".tab-content").forEach(function (c) {
          c.classList.remove("active");
        });
        this.classList.add("active");
        var target = document.getElementById(this.dataset.tab);
        if (target) target.classList.add("active");
      });
    });
  };

  // ============================================
  // CONTACT FORM
  // ============================================
  window.initContactForm = function () {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // In production, send this data to your backend or email service
      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      form.innerHTML =
        '<div style="text-align:center;padding:40px 0;"><h3 style="font-family:var(--font-heading);font-size:1.4rem;font-weight:300;margin-bottom:12px;">Merci pour votre message !</h3><p style="font-size:0.85rem;color:var(--color-gray);">Nous vous répondrons dans les plus brefs délais.</p></div>';
    });
  };

  // ============================================
  // UTILITY
  // ============================================
  function escapeHtml(text) {
    if (!text) return "";
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(String(text)));
    return div.innerHTML;
  }
})();
