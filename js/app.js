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
    domain: "test-maison-cerya.myshopify.com", // Your Shopify store domain
    storefrontAccessToken: "25990a253364dac954bd70ae1b87b557", // Storefront API access token
  };

  // ============================================
  // STATE
  // ============================================
  let shopifyClient = null;
  let checkout = null;
  let cart = [];

  // ============================================
  // DEMO PRODUCTS (commented out — all data comes from Shopify)
  // Uncomment if you need to test without Shopify connection
  // ============================================
  /*
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
  */

  // ============================================
  // INITIALIZATION
  // ============================================
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initSidebar();
    initSearch();
    initCart();
    initAnimations();
    initNewsletter();
    initShopify();
    // Only render immediately if Shopify is not configured (demo mode)
    if (!shopifyClient) {
      loadPageProducts();
    }
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

      // Fetch product tags via direct Storefront API (Buy SDK omits tags)
      function fetchProductTags() {
        return fetch(
          "https://" +
            SHOPIFY_CONFIG.domain +
            "/api/2024-01/graphql.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token":
                SHOPIFY_CONFIG.storefrontAccessToken,
            },
            body: JSON.stringify({
              query:
                "{ products(first: 250) { edges { node { id tags } } } }",
            }),
          },
        )
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            var tagMap = {};
            if (data && data.data && data.data.products) {
              data.data.products.edges.forEach(function (edge) {
                tagMap[edge.node.id] = edge.node.tags;
              });
            }
            return tagMap;
          })
          .catch(function () {
            return {};
          });
      }

      // Fetch products + tags in parallel, then merge
      Promise.all([
        shopifyClient.product.fetchAll(),
        fetchProductTags(),
      ]).then(function (results) {
        var products = results[0];
        var tagMap = results[1];

        // Attach tags from GraphQL onto SDK product objects
        products.forEach(function (p) {
          if (tagMap[p.id]) {
            p.tags = tagMap[p.id];
          }
        });

        console.log("[Maison Cerya] Products loaded:", products.length);
        if (products.length > 0) {
          console.log("[Maison Cerya] First product tags:", products[0].tags);
        }

        window.shopifyProducts = products;
        loadPageProducts();
        // Re-init product detail if on product page
        if (
          typeof window.initProductDetail === "function" &&
          document.getElementById("productTitle")
        ) {
          window.initProductDetail();
        }
      });
    } catch (e) {
      console.warn("Shopify initialization failed, running in demo mode.", e);
    }
  }

  // ============================================
  // PRODUCT RENDERING
  // ============================================
  function loadPageProducts() {
    var featuredGrid = document.getElementById("featuredProducts");
    var newArrivalsGrid = document.getElementById("newArrivals");
    var shopGrid = document.getElementById("shopProducts");

    var useShopify =
      window.shopifyProducts && window.shopifyProducts.length > 0;
    var products = useShopify
      ? window.shopifyProducts.map(mapShopifyProduct)
      : [];

    if (featuredGrid) {
      renderProducts(featuredGrid, products.slice(0, 4));
      if (!products.length && featuredGrid.closest(".landing-featured")) {
        featuredGrid.closest(".landing-featured").style.display = "none";
      }
    }
    if (newArrivalsGrid) {
      var arrivals =
        products.length > 4 ? products.slice(4, 8) : products.slice(0, 4);
      renderProducts(newArrivalsGrid, arrivals);
    }

    // Dynamic categories, filters, footer, and collections
    renderCategoryCards(products);
    renderShopFilters(products);
    renderFooterCategories(products);
    renderSidebarCategories(products);
    renderCollectionTeaser(products);
    renderCollectionsPage(products);
    renderFooterCollections(products);

    if (shopGrid) {
      var state = getShopQueryState();
      var sortSelect = document.querySelector("#shopFilters .sort-select");
      var filtered = applyShopState(products, state);

      if (sortSelect && sortSelect.value) {
        filtered = sortProductsList(filtered, sortSelect.value);
      }

      renderProducts(shopGrid, filtered);
      updateShopCount(filtered.length);
      renderShopState(state, filtered.length);

      if (state.category) {
        document
          .querySelectorAll("#shopFilters .filter-btn")
          .forEach(function (btn) {
            btn.classList.toggle(
              "active",
              btn.dataset.category === state.category,
            );
          });
      }
    }
  }

  function mapShopifyProduct(product) {
    var variant = product.variants[0];
    // Parse collection tags (format: "collection:Name:status")
    var collections = [];
    var regularTags = [];
    if (product.tags && product.tags.length > 0) {
      product.tags.forEach(function (tag) {
        if (tag.toLowerCase().startsWith("collection:")) {
          var parts = tag.split(":");
          if (parts.length >= 3) {
            // Capitalize collection name (Shopify lowercases all tags)
            var rawName = parts[1].trim();
            var displayName = rawName
              .split(" ")
              .map(function (w) {
                return w.charAt(0).toUpperCase() + w.slice(1);
              })
              .join(" ");
            collections.push({
              name: displayName,
              status: parts[2].trim().toLowerCase(),
            });
          }
        } else {
          regularTags.push(tag);
        }
      });
    }
    return {
      id: product.id,
      title: product.title,
      price: formatPrice(variant.price.amount),
      priceNum: parseFloat(variant.price.amount),
      category: product.productType ? product.productType.toLowerCase() : "",
      badge: regularTags.length > 0 ? regularTags[0] : null,
      collections: collections,
      description: product.descriptionHtml || product.description,
      image: product.images.length > 0 ? product.images[0].src : null,
      images: product.images.map(function (img) {
        return img.src;
      }),
      handle: product.handle,
      shopifyId: product.id,
      variantId: variant.id,
      options: product.options
        ? product.options.map(function (opt) {
            return {
              name: opt.name,
              values: opt.values.map(function (v) {
                return v.value;
              }),
            };
          })
        : [],
      variants: product.variants.map(function (v) {
        return {
          id: v.id,
          title: v.title,
          price: formatPrice(v.price.amount),
          priceNum: parseFloat(v.price.amount),
          available: v.available,
          selectedOptions: v.selectedOptions
            ? v.selectedOptions.map(function (o) {
                return { name: o.name, value: o.value };
              })
            : [],
        };
      }),
    };
  }

  function formatPrice(amount) {
    const num = Math.round(parseFloat(amount));
    return num.toLocaleString("fr-DZ") + " DA";
  }

  function getShopQueryState() {
    var params = new URLSearchParams(window.location.search);
    return {
      category: params.get("category") || "",
      search: (params.get("search") || "").trim(),
    };
  }

  function applyShopState(products, state) {
    var filtered = products.slice();

    if (state.search) {
      filtered = filtered.filter(function (product) {
        return productMatchesSearch(product, state.search);
      });
    }

    if (state.category && state.category !== "all") {
      filtered = filtered.filter(function (product) {
        return product.category === state.category;
      });
    }

    return filtered;
  }

  function sortProductsList(products, sortBy) {
    var sorted = products.slice();

    switch (sortBy) {
      case "price-asc":
        sorted.sort(function (a, b) {
          return a.priceNum - b.priceNum;
        });
        break;
      case "price-desc":
        sorted.sort(function (a, b) {
          return b.priceNum - a.priceNum;
        });
        break;
      case "name":
        sorted.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        break;
    }

    return sorted;
  }

  function productMatchesSearch(product, searchQuery) {
    var query = normalizeText(searchQuery);
    if (!query) return true;

    var collectionNames = (product.collections || [])
      .map(function (collection) {
        return collection.name;
      })
      .join(" ");

    var haystack = normalizeText(
      [
        product.title,
        product.category,
        product.badge,
        stripHtml(product.description),
        collectionNames,
      ].join(" "),
    );

    return haystack.indexOf(query) !== -1;
  }

  function renderShopState(state, resultCount) {
    var stateEl = document.getElementById("shopActiveState");
    if (!stateEl) return;

    var chips = [];
    if (state.search) {
      chips.push(
        '<span class="shop-state-chip">Recherche: "' +
          escapeHtml(state.search) +
          '"</span>',
      );
    }
    if (state.category) {
      chips.push(
        '<span class="shop-state-chip">Categorie: ' +
          escapeHtml(formatLabel(state.category)) +
          "</span>",
      );
    }

    if (!chips.length) {
      stateEl.innerHTML = "";
      stateEl.classList.remove("visible");
      return;
    }

    stateEl.innerHTML =
      '<div class="shop-state-summary">' +
      '<span class="shop-state-label">' +
      resultCount +
      " " +
      (resultCount > 1 ? "resultats" : "resultat") +
      "</span>" +
      '<div class="shop-state-chips">' +
      chips.join("") +
      "</div>" +
      "</div>" +
      '<a href="shop.html" class="shop-state-clear">Tout reinitialiser</a>';
    stateEl.classList.add("visible");
  }

  function renderShopEmptyState(container) {
    var state = getShopQueryState();
    var title = state.search
      ? 'Aucun resultat pour "' + escapeHtml(state.search) + '"'
      : "Aucun produit disponible";
    var copy =
      state.search || state.category
        ? "Essayez une autre recherche, une autre categorie, ou revenez a toute la boutique."
        : "La boutique est en cours de mise a jour. Revenez un peu plus tard ou contactez-nous directement.";

    container.innerHTML =
      '<div class="shop-empty-state">' +
      '<h3>' +
      title +
      "</h3>" +
      '<p>' +
      copy +
      "</p>" +
      '<div class="shop-empty-actions">' +
      '<a href="shop.html" class="btn btn-outline">Voir toute la boutique</a>' +
      '<a href="contact.html" class="btn btn-primary">Nous contacter</a>' +
      "</div>" +
      "</div>";
  }

  function renderProducts(container, products) {
    if (!products.length) {
      if (container.id === "shopProducts") {
        renderShopEmptyState(container);
      } else {
        container.innerHTML = "";
      }
      return;
    }

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
        const productUrl = "product.html?id=" + encodeURIComponent(product.id);

        return (
          '<article class="product-card" data-category="' +
          escapeHtml(product.category) +
          '">' +
          '<div class="product-image">' +
          '<a href="' +
          productUrl +
          '" class="product-card-link" aria-label="' +
          escapeHtml(product.title) +
          '">' +
          badgeHTML +
          imageHTML +
          "</a>" +
          '<button class="product-quick-add" type="button" data-id="' +
          product.id +
          '" data-variant="' +
          (product.variantId || product.id) +
          '">Ajouter au panier</button>' +
          "</div>" +
          '<a href="' +
          productUrl +
          '" class="product-card-link product-card-link--info">' +
          '<div class="product-info">' +
          '<h3 class="product-name">' +
          escapeHtml(product.title) +
          "</h3>" +
          '<p class="product-price">' +
          escapeHtml(product.price) +
          "</p>" +
          "</div>" +
          "</a>" +
          "</article>"
        );
      })
      .join("");

    // Add quick-add event listeners
    container.querySelectorAll(".product-quick-add").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        addToCart(this.dataset.id, this.dataset.variant);
      });
    });
  }

  function updateShopCount(count) {
    var el = document.getElementById("shopCount");
    if (el) el.textContent = count + " produit" + (count !== 1 ? "s" : "");
  }

  // ============================================
  // DYNAMIC CATEGORIES & FILTERS
  // ============================================
  function getCategories(products) {
    var catMap = {};
    products.forEach(function (p) {
      if (p.category && !catMap[p.category]) {
        catMap[p.category] = {
          name: p.category,
          label: p.category.charAt(0).toUpperCase() + p.category.slice(1),
          image: p.image,
        };
      }
    });
    return Object.values(catMap);
  }

  function renderCategoryCards(products) {
    var container = document.getElementById("categoriesGrid");
    if (!container) return;
    var categories = getCategories(products);
    if (!categories.length) return;
    container.innerHTML = categories
      .map(function (cat) {
        var imageHTML = cat.image
          ? '<img src="' +
            escapeHtml(cat.image) +
            '" alt="' +
            escapeHtml(cat.label) +
            '" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;">'
          : '<div class="category-placeholder"><span>' +
            escapeHtml(cat.label.toUpperCase()) +
            "</span></div>";
        return (
          '<a href="shop.html?category=' +
          encodeURIComponent(cat.name) +
          '" class="category-card">' +
          '<div class="category-image">' +
          imageHTML +
          "</div>" +
          '<div class="category-info">' +
          "<h3>" +
          escapeHtml(cat.label) +
          "</h3>" +
          '<span class="category-link">Explorer →</span>' +
          "</div></a>"
        );
      })
      .join("");
  }

  function renderShopFilters(products) {
    var container = document.getElementById("shopFilters");
    if (!container) return;
    var categories = getCategories(products);
    var sortSelect = container.querySelector(".sort-select");
    var sortHTML = sortSelect ? sortSelect.outerHTML : "";
    var html =
      '<button class="filter-btn active" data-category="all" onclick="filterProducts(null)">Tout</button>';
    categories.forEach(function (cat) {
      html +=
        '<button class="filter-btn" data-category="' +
        escapeHtml(cat.name) +
        '" onclick="filterProducts(\'' +
        escapeHtml(cat.name) +
        "')\">" +
        escapeHtml(cat.label) +
        "</button>";
    });
    html += sortHTML;
    container.innerHTML = html;
  }

  function renderFooterCategories(products) {
    var containers = document.querySelectorAll(".footer-categories");
    if (!containers.length) return;
    var categories = getCategories(products);
    var html = categories
      .map(function (cat) {
        return (
          '<li><a href="shop.html?category=' +
          encodeURIComponent(cat.name) +
          '">' +
          escapeHtml(cat.label) +
          "</a></li>"
        );
      })
      .join("");
    html += '<li><a href="shop.html">Toute la collection</a></li>';
    containers.forEach(function (c) {
      c.innerHTML = html;
    });
  }

  function renderSidebarCategories(products) {
    var containers = document.querySelectorAll("#sidebarCategories");
    if (!containers.length) return;
    var categories = getCategories(products);
    var html = categories
      .map(function (cat) {
        return (
          '<li><a href="shop.html?category=' +
          encodeURIComponent(cat.name) +
          '">' +
          escapeHtml(cat.label) +
          "</a></li>"
        );
      })
      .join("");
    html += '<li><a href="shop.html">Tout voir</a></li>';
    containers.forEach(function (c) {
      c.innerHTML = html;
    });
  }

  // ============================================
  // DYNAMIC COLLECTIONS (from Shopify tags)
  // ============================================
  function getCollections(products) {
    var collMap = {};
    products.forEach(function (p) {
      (p.collections || []).forEach(function (col) {
        var key = col.name.toLowerCase();
        if (!collMap[key]) {
          collMap[key] = {
            name: col.name,
            status: col.status,
            image: p.image,
            count: 0,
            products: [],
          };
        }
        collMap[key].count++;
        collMap[key].products.push(p);
      });
    });
    return Object.values(collMap);
  }

  // Homepage: elegant teaser linking to collections page
  function renderCollectionTeaser(products) {
    var container = document.getElementById("collectionsTeaser");
    if (!container) return;
    var collections = getCollections(products);
    var active = collections.filter(function (c) {
      return c.status === "active";
    });
    if (!active.length) {
      container.closest(".collections-teaser") &&
        (container.closest(".collections-teaser").style.display = "none");
      return;
    }
    container.innerHTML = active
      .map(function (col) {
        return (
          '<a href="collections.html#' +
          encodeURIComponent(col.name.toLowerCase().replace(/\s+/g, "-")) +
          '" class="collection-teaser-item">' +
          '<span class="collection-teaser-name">' +
          escapeHtml(col.name) +
          "</span>" +
          '<span class="collection-teaser-arrow">→</span>' +
          "</a>"
        );
      })
      .join("");
  }

  // Collections page: full editorial layout, each collection as a section
  function renderCollectionsPage(products) {
    var container = document.getElementById("collectionsPage");
    if (!container) return;
    var collections = getCollections(products);
    var active = collections.filter(function (c) {
      return c.status === "active";
    });
    var archived = collections.filter(function (c) {
      return c.status === "archived";
    });

    if (!collections.length) {
      container.innerHTML =
        '<div class="container" style="padding:80px 24px;text-align:center;">' +
        '<p style="font-size:0.9rem;color:var(--color-gray);">Aucune collection disponible pour le moment.</p>' +
        "</div>";
      return;
    }

    var html = "";

    // Active collections — large editorial sections
    active.forEach(function (col) {
      var anchor = col.name.toLowerCase().replace(/\s+/g, "-");
      html +=
        '<section class="coll-section" id="' +
        escapeHtml(anchor) +
        '">' +
        '<div class="coll-section-header">' +
        '<h2 class="coll-section-title">' +
        escapeHtml(col.name) +
        "</h2>" +
        '<span class="coll-section-count">' +
        col.count +
        " pièce" +
        (col.count > 1 ? "s" : "") +
        "</span>" +
        "</div>" +
        '<div class="container">' +
        '<div class="coll-products-grid" id="coll-' +
        escapeHtml(anchor) +
        '">' +
        "</div>" +
        "</div>" +
        "</section>";
    });

    // Archived collections — muted, smaller
    if (archived.length) {
      html +=
        '<section class="coll-archived-section">' +
        '<div class="container">' +
        '<div class="coll-archived-header">' +
        '<span class="section-tag">Archives</span>' +
        '<h2 class="section-title">Collections Précédentes</h2>' +
        "</div>";

      archived.forEach(function (col) {
        var anchor = col.name.toLowerCase().replace(/\s+/g, "-");
        html +=
          '<div class="coll-archived-group" id="' +
          escapeHtml(anchor) +
          '">' +
          '<h3 class="coll-archived-name">' +
          escapeHtml(col.name) +
          '<span class="coll-archived-count">' +
          col.count +
          " pièce" +
          (col.count > 1 ? "s" : "") +
          "</span>" +
          "</h3>" +
          '<div class="coll-products-grid coll-products-grid--small" id="coll-' +
          escapeHtml(anchor) +
          '">' +
          "</div>" +
          "</div>";
      });

      html += "</div></section>";
    }

    container.innerHTML = html;

    // Now render products into each collection grid
    collections.forEach(function (col) {
      var anchor = col.name.toLowerCase().replace(/\s+/g, "-");
      var grid = document.getElementById("coll-" + anchor);
      if (grid) {
        renderProducts(grid, col.products);
      }
    });
  }

  function renderFooterCollections(products) {
    var containers = document.querySelectorAll(".footer-collections");
    if (!containers.length) return;
    var collections = getCollections(products);
    var active = collections.filter(function (c) {
      return c.status === "active";
    });
    var html = active
      .map(function (col) {
        return (
          '<li><a href="collections.html#' +
          encodeURIComponent(col.name.toLowerCase().replace(/\s+/g, "-")) +
          '">' +
          escapeHtml(col.name) +
          "</a></li>"
        );
      })
      .join("");
    html += '<li><a href="collections.html">Toutes les collections</a></li>';
    containers.forEach(function (c) {
      c.innerHTML = html;
    });
  }

  // ============================================
  // CART MANAGEMENT
  // ============================================
  function initCart() {
    var savedCart = localStorage.getItem("maisoncerya_cart");
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
        // Migrate old cart items: ensure variantId exists
        cart.forEach(function (item) {
          if (!item.variantId) item.variantId = item.id;
        });
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

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        document.getElementById("cartSidebar").classList.contains("active")
      ) {
        closeCart();
      }
    });
  }

  function addToCart(productId, specificVariantId) {
    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : [];
    var product = products.find(function (p) {
      return String(p.id) === String(productId);
    });
    if (!product) return;

    var variantId = specificVariantId || product.variantId || product.id;
    var price = product.price;
    var priceNum = product.priceNum;
    var variantLabel = "";

    if (specificVariantId && product.variants) {
      var variant = product.variants.find(function (v) {
        return String(v.id) === String(specificVariantId);
      });
      if (variant) {
        price = variant.price || price;
        priceNum = variant.priceNum || priceNum;
        if (variant.title && variant.title !== "Default Title") {
          variantLabel = variant.title;
        }
      }
    }

    var existing = cart.find(function (item) {
      return String(item.variantId) === String(variantId);
    });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        variantId: variantId,
        title: product.title,
        variantLabel: variantLabel,
        price: price,
        priceNum: priceNum,
        image: product.image || null,
        qty: 1,
      });
    }

    saveCart();
    updateCartUI();
    openCart();
  }

  function removeFromCart(variantId) {
    cart = cart.filter(function (item) {
      return String(item.variantId) !== String(variantId);
    });
    saveCart();
    updateCartUI();
  }

  function updateQty(variantId, delta) {
    var item = cart.find(function (item) {
      return String(item.variantId) === String(variantId);
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
        '<div class="cart-empty"><p>Votre panier est vide</p><a href="shop.html" class="btn btn-primary">Explorer la boutique</a></div>';
      footerEl.hidden = true;
      return;
    }

    footerEl.hidden = false;

    var total = cart.reduce(function (sum, item) {
      return sum + item.priceNum * item.qty;
    }, 0);
    totalEl.textContent = total.toLocaleString("fr-DZ") + " DA";

    itemsEl.innerHTML = cart
      .map(function (item) {
        var labelHTML = item.variantLabel
          ? '<br><small style="color:var(--color-gray);font-size:0.75rem;">' +
            escapeHtml(item.variantLabel) +
            "</small>"
          : "";
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
          labelHTML +
          "</p>" +
          '<p class="cart-item-price">' +
          escapeHtml(item.price) +
          "</p>" +
          '<div class="cart-item-qty">' +
          '<button data-action="decrease" data-id="' +
          item.variantId +
          '">−</button>' +
          "<span>" +
          item.qty +
          "</span>" +
          '<button data-action="increase" data-id="' +
          item.variantId +
          '">+</button>' +
          "</div>" +
          '<button class="cart-item-remove" data-action="remove" data-id="' +
          item.variantId +
          '">Supprimer</button>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    itemsEl.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = this.dataset.id;
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
  // SIDEBAR NAVIGATION
  // ============================================
  function initSidebar() {
    var toggle = document.getElementById("menuToggle");
    var sidebar = document.getElementById("sidebarNav");
    var overlay = document.getElementById("sidebarOverlay");

    if (!toggle || !sidebar) return;

    function openSidebar() {
      toggle.classList.add("active");
      sidebar.classList.add("active");
      if (overlay) overlay.classList.add("active");
      document.body.classList.add("sidebar-open");
      document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
      toggle.classList.remove("active");
      sidebar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      document.body.classList.remove("sidebar-open");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      if (sidebar.classList.contains("active")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    if (overlay) {
      overlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar on link click
    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeSidebar);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sidebar.classList.contains("active")) {
        closeSidebar();
      }
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

    function closeSearch() {
      searchOverlay.classList.remove("active");
    }

    searchBtn.addEventListener("click", function () {
      searchOverlay.classList.add("active");
      if (searchInput) {
        searchInput.value = getShopQueryState().search || "";
      }
      setTimeout(function () {
        searchInput.focus();
      }, 300);
    });

    searchClose.addEventListener("click", closeSearch);

    searchOverlay.addEventListener("click", function (e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
        closeSearch();
      }
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
    var params = new URLSearchParams(window.location.search);

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    window.history.replaceState(
      {},
      "",
      window.location.pathname +
        (params.toString() ? "?" + params.toString() : ""),
    );

    document.querySelectorAll("#shopFilters .filter-btn").forEach(function (btn) {
      btn.classList.toggle(
        "active",
        btn.dataset.category === category ||
          (!category && btn.dataset.category === "all"),
      );
    });

    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : [];

    var filtered = category
      ? applyShopState(products, { category: category, search: getShopQueryState().search })
      : applyShopState(products, getShopQueryState());

    var sortValue = document.querySelector("#shopFilters .sort-select");
    if (sortValue && sortValue.value) {
      filtered = sortProductsList(filtered, sortValue.value);
    }

    var shopGrid = document.getElementById("shopProducts");
    if (shopGrid) {
      renderProducts(shopGrid, filtered);
      updateShopCount(filtered.length);
      renderShopState(getShopQueryState(), filtered.length);
    }
  };

  window.sortProducts = function (sortBy) {
    var shopGrid = document.getElementById("shopProducts");
    if (!shopGrid) return;

    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : [];

    products = applyShopState(products, getShopQueryState());
    products = sortProductsList(products, sortBy);

    renderProducts(shopGrid, products);
    updateShopCount(products.length);
    renderShopState(getShopQueryState(), products.length);
  };

  // ============================================
  // PRODUCT DETAIL PAGE
  // ============================================
  window.initProductDetail = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var rawId = urlParams.get("id");
    var productId =
      rawId && !rawId.startsWith("gid://") ? parseInt(rawId) || rawId : rawId;

    var products = window.shopifyProducts
      ? window.shopifyProducts.map(mapShopifyProduct)
      : [];

    var product =
      products.find(function (p) {
        return String(p.id) === String(productId);
      }) || products[0];
    if (!product) return;

    // Populate product detail page
    var titleEl = document.getElementById("productTitle");
    var priceEl = document.getElementById("productPrice");
    var descEl = document.getElementById("productDesc");
    var breadcrumb = document.getElementById("breadcrumbProduct");

    if (titleEl) titleEl.textContent = product.title;
    if (priceEl) priceEl.textContent = product.price;
    if (descEl) descEl.innerHTML = product.description;
    if (breadcrumb) breadcrumb.textContent = product.title;

    // Gallery image
    var mainImage = document.getElementById("mainImage");
    if (mainImage && product.image) {
      mainImage.outerHTML =
        '<img src="' +
        escapeHtml(product.image) +
        '" alt="' +
        escapeHtml(product.title) +
        '" id="mainImage" style="width:100%;height:100%;object-fit:cover;">';
    }

    // Gallery thumbnails
    var thumbsContainer = document.querySelector(".gallery-thumbs");
    var allImages = product.images || (product.image ? [product.image] : []);
    if (thumbsContainer && allImages.length > 0) {
      thumbsContainer.innerHTML = allImages
        .map(function (src, i) {
          return (
            '<div class="gallery-thumb' +
            (i === 0 ? " active" : "") +
            '" style="background:url(' +
            escapeHtml(src) +
            ') center/cover no-repeat;cursor:pointer;" data-img="' +
            escapeHtml(src) +
            '"></div>'
          );
        })
        .join("");
      thumbsContainer
        .querySelectorAll(".gallery-thumb")
        .forEach(function (thumb) {
          thumb.addEventListener("click", function () {
            var newSrc = this.dataset.img;
            var mainImg = document.getElementById("mainImage");
            if (mainImg) mainImg.src = newSrc;
            thumbsContainer
              .querySelectorAll(".gallery-thumb")
              .forEach(function (t) {
                t.classList.remove("active");
              });
            this.classList.add("active");
          });
        });
    }

    // Dynamic product options (sizes, colors, etc.)
    var optionsContainer = document.getElementById("productOptions");
    if (optionsContainer) {
      var options = product.options || [];
      // Fallback for demo products that use sizes/colors arrays
      if (!options.length) {
        if (product.sizes && product.sizes.length)
          options.push({ name: "Taille", values: product.sizes });
        if (product.colors && product.colors.length)
          options.push({ name: "Couleur", values: product.colors });
      }
      // Filter out "Title" option with only "Default Title" value (Shopify default for single-variant products)
      options = options.filter(function (opt) {
        return !(
          opt.name === "Title" &&
          opt.values.length === 1 &&
          opt.values[0] === "Default Title"
        );
      });

      if (options.length > 0) {
        optionsContainer.innerHTML = options
          .map(function (opt) {
            var buttonsHTML = opt.values
              .map(function (val) {
                return (
                  '<button class="size-btn" data-option="' +
                  escapeHtml(opt.name) +
                  '" data-value="' +
                  escapeHtml(val) +
                  '">' +
                  escapeHtml(val) +
                  "</button>"
                );
              })
              .join("");
            return (
              '<div class="option-group">' +
              '<span class="option-label">' +
              escapeHtml(opt.name) +
              "</span>" +
              '<div class="size-options">' +
              buttonsHTML +
              "</div>" +
              "</div>"
            );
          })
          .join("");

        // Click handlers for option buttons
        optionsContainer.querySelectorAll(".size-btn").forEach(function (btn) {
          btn.addEventListener("click", function () {
            // Deselect siblings in the same option group
            this.parentElement
              .querySelectorAll(".size-btn")
              .forEach(function (b) {
                b.classList.remove("active");
              });
            this.classList.add("active");
            // Update selected variant
            updateSelectedVariant(product, optionsContainer);
          });
        });
      }
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

    // Add to cart (variant-aware)
    var addBtn = document.getElementById("addToCartDetail");
    if (addBtn) {
      addBtn.dataset.variantId = product.variantId || product.id;
      addBtn.addEventListener("click", function () {
        var qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
        var variantId = this.dataset.variantId;
        for (var i = 0; i < qty; i++) {
          addToCart(product.id, variantId);
        }
      });
    }

    // Description tab
    var tabDescText = document.getElementById("tabDescText");
    if (tabDescText) tabDescText.innerHTML = product.description;

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

  function updateSelectedVariant(product, optionsContainer) {
    if (!product.variants || !product.variants.length) return;

    var selectedOptions = {};
    optionsContainer
      .querySelectorAll(".size-btn.active")
      .forEach(function (btn) {
        selectedOptions[btn.dataset.option] = btn.dataset.value;
      });

    // Find matching variant
    var match = product.variants.find(function (v) {
      return v.selectedOptions.every(function (opt) {
        return (
          !selectedOptions[opt.name] || selectedOptions[opt.name] === opt.value
        );
      });
    });

    if (match) {
      var priceEl = document.getElementById("productPrice");
      if (priceEl) priceEl.textContent = match.price;
      var addBtn = document.getElementById("addToCartDetail");
      if (addBtn) addBtn.dataset.variantId = match.id;
    }
  }

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

  function stripHtml(text) {
    if (!text) return "";
    var div = document.createElement("div");
    div.innerHTML = String(text);
    return div.textContent || div.innerText || "";
  }

  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function formatLabel(value) {
    return String(value || "")
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
})();
