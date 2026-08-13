# State and Navigation

## Purpose

This document describes the application navigation model for the Moving in Mobile website.

The current production architecture uses React Router for URL-backed navigation.

Prior to August 12, 2026, the application used internal React state to simulate separate pages. That implementation has been retired.

## Current Routing Architecture

The application is wrapped in `BrowserRouter` in:

`src/main.jsx`

The primary application routes are:

* `/`
* `/about`
* `/buyers`
* `/sellers`
* `/neighborhoods`
* `/rowe-report`
* `/resources`
* `/contact`

These are real browser URLs and support:

* direct navigation
* page refresh
* browser Back and Forward
* bookmarking
* copying and sharing URLs
* normal link semantics
* future page-specific SEO

## Router Initialization

The application entry point initializes React Router in `src/main.jsx`.

Conceptually:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

This gives the application access to the browser History API and route-location state.

## Route Mapping

The application currently maintains explicit page-to-route mappings in `src/App.jsx`.

Conceptually:

```jsx
const PAGE_ROUTES = {
  home: "/",
  about: "/about",
  sellers: "/sellers",
  buyers: "/buyers",
  neighborhoods: "/neighborhoods",
  rowereport: "/rowe-report",
  resources: "/resources",
  contact: "/contact",
};
```

A reverse mapping translates the current browser pathname into the application page key.

This allows the existing page-component architecture to remain intact while navigation is URL-backed.

## Transitional Compatibility Layer

Some existing components still call:

```jsx
setPage("buyers");
```

The `setPage` interface is retained temporarily as a compatibility layer.

It now maps page keys to real URLs and calls React Router navigation instead of updating local page state.

Conceptually:

```jsx
const setPage = (pageKey) => {
  const path = PAGE_ROUTES[pageKey] || "/";
  navigate(path);
};
```

This strategy reduced migration risk because existing CTA and event-driven navigation could continue functioning without requiring an immediate full refactor.

## Header Navigation

The primary header navigation uses React Router `NavLink` components.

Benefits include:

* semantic links instead of navigation buttons
* open-in-new-tab support
* copy-link support
* accessibility improvements
* automatic active-route detection
* standard browser behavior

The Rowe Report CTA also navigates directly to:

`/rowe-report`

Desktop and mobile navigation use the same route destinations.

## Navigation Events

The application includes a custom `navigatePage` event used by some internal components.

Existing event-driven navigation remains supported because the compatibility `setPage` function now routes through React Router.

This mechanism may be refactored later if the component architecture is further modularized.

## Scroll Behavior

Navigation initiated through the primary header scrolls the viewport to the top of the destination page.

The application currently uses:

```javascript
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
```

This behavior should be verified after future navigation refactors.

## Analytics Integration

Before React Router was introduced, GA4 page views were generated from virtual page state.

The application now derives page identity from the browser pathname.

Route changes continue to generate GA4 `page_view` events using the existing analytics configuration.

This ensures that route-level page activity can be measured for URLs such as:

* `/buyers`
* `/sellers`
* `/resources`
* `/rowe-report`

## Canonical URLs

The routing migration introduced route-aware canonical URLs.

Each primary route should use its own production canonical URL.

Examples:

```text
https://movinginmobile.com/buyers
https://movinginmobile.com/sellers
https://movinginmobile.com/resources
```

Do not restore a configuration in which every route advertises the homepage as its canonical URL.

## Hostinger SPA Fallback

React Router uses client-side routing.

A direct browser request such as:

```text
https://movinginmobile.com/buyers
```

first reaches Hostinger.

Without an SPA fallback, Hostinger attempts to locate a physical `/buyers` file or directory and returns a 404.

To prevent this, the repository contains:

`public/.htaccess`

The current configuration is:

```apache
RewriteEngine On

# Preserve Hostinger's internal builds protection
RewriteRule ^\.builds - [F,L]

# Serve existing files and directories normally
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# React Router SPA fallback
RewriteRule ^ index.html [L]
```

Vite copies this file into the production build output.

Existing static resources remain directly accessible, including:

* `/robots.txt`
* `/sitemap.xml`
* images
* CSS
* JavaScript assets

Unknown application paths are served through `index.html`, allowing React Router to render the correct page.

## Validation Requirements

After changes to routing, navigation, or hosting configuration, validate:

1. Homepage loads.
2. Each primary route loads from navigation.
3. Each route can be opened directly in a new browser tab.
4. Refreshing a nested route does not produce a 404.
5. Browser Back and Forward work.
6. Active navigation styling is correct.
7. Desktop navigation works.
8. Mobile navigation works.
9. `/robots.txt` still loads.
10. `/sitemap.xml` still loads.
11. GA4 route-level page views continue to fire.
12. Canonical URLs match the current route.

## Historical Note

Version 1.0 originally used React state-based page switching.

Paths such as `/buyers` and `/sellers` existed only as analytics representations and were not real browser routes.

That limitation was removed during the React Router migration completed on August 12, 2026.

Documentation written before that migration that describes those URLs as virtual should be considered historical.

## Future Routing Work

Potential future improvements include:

* dedicated not-found handling
* more granular neighborhood routes
* page-specific metadata abstraction
* route-level code splitting
* additional IDX-related navigation
* possible consolidation of the temporary `setPage` compatibility layer
* optional routing layout components if the application is further modularized

Any material routing changes should be reflected in this document and in:

* `02-system-architecture.md`
* `07-hostinger-deployment.md`
* `09-seo-architecture.md`
* `20-decision-log.md`
* `25-troubleshooting.md`
