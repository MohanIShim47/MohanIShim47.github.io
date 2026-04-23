const routes = {
  "/": "/pages/home.html",
  "/g": "/pages/g.html"
};

function navigate(path) {
  history.pushState({}, "", path);
  router();
}

async function router() {
  const path = location.pathname;
  const page = routes[path] || "/pages/home.html";

  try {
    const res = await fetch(page);
    const html = await res.text();
    document.getElementById("app").innerHTML = html;

    // Re-run lucide icons after page swap
    if (window.lucide) {
      lucide.createIcons();
    }

    window.scrollTo(0, 0);
  } catch (err) {
    document.getElementById("app").innerHTML = "<h1>Page not found</h1>";
  }
}

// Handle back/forward buttons
window.addEventListener("popstate", router);

// First load
window.addEventListener("DOMContentLoaded", router);