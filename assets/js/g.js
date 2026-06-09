window.addEventListener("DOMContentLoaded", () => {
  const COVER_URL = "/games/covers";
  const HTML_URL = "/games/html";

  let allGames = [];
  let popularityMap = {};
  let currentGame = null;

  fetch("/assets/json/zones.json")
    .then((r) => r.json())
    .then((data) => {
      allGames = data.map((g) => ({
        ...g,
        cover: g.cover.replace("{COVER_URL}", COVER_URL),
        url: g.url.replace("{HTML_URL}", HTML_URL),
        popularity: popularityMap[g.id] || 0,
      }));

      allGames.sort((a, b) => b.popularity - a.popularity);

      render(allGames);
    })
    .catch((err) => {
      document.getElementById("games").textContent =
        "Failed to load games: " + err;
    });

  function render(games) {
    const grid = document.getElementById("games");

    grid.style.opacity = "0";
    setTimeout(() => (grid.style.opacity = "1"), 10);

    grid.innerHTML = "";

    games.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";

      const img = document.createElement("img");
      img.dataset.src = game.cover;
      img.alt = game.name;
      img.loading = "lazy";

      const title = document.createElement("div");
      title.textContent = game.name;

      card.appendChild(img);
      card.appendChild(title);
      card.onclick = () => openGame(game);

      grid.appendChild(card);
    });

    lazyLoadImages();
  }

  document.getElementById("search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    render(allGames.filter((g) => g.name && g.name.toLowerCase().includes(q)));
  });

  function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add("loaded");
          img.removeAttribute("data-src");

          observer.unobserve(img);
        });
      },
      { rootMargin: "100px" },
    );

    images.forEach((img) => obs.observe(img));
  }

  async function openGame(game) {
    currentGame = game;

    document.getElementById("gameContainer").style.display = "flex";
    document.body.style.overflow = "hidden";

    const container = document.getElementById("gameContent");
    container.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.src = "about:blank";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.allowFullscreen = true;

    container.appendChild(iframe);

    let html = await fetch(game.url + "?t=" + Date.now()).then((r) => r.text());

    const base = game.url.substring(0, game.url.lastIndexOf("/") + 1);

    if (!html.match(/<base\s/i)) {
      html = html.replace("<head>", `<head><base href="${base}">`);
    }

    const doc = iframe.contentDocument;
    doc.open();
    doc.write(html);
    doc.close();

    doc.querySelectorAll("script").forEach((old) => {
      const s = doc.createElement("script");
      if (old.src) s.src = old.src;
      else s.textContent = old.textContent;
      old.replaceWith(s);
    });

    document.title = game.name || "Game";
  }

  function closeGame() {
    document.getElementById("gameContainer").style.display = "none";
    document.body.style.overflow = "";
    document.getElementById("gameContent").innerHTML = "";
    document.title = "";
  }

  function toggleFullscreen() {
    const el = document.getElementById("gameContent");
    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  }

});