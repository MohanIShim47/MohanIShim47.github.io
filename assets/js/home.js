window.addEventListener("DOMContentLoaded", async () => {
  const COVER_URL = "/games/covers";

  try {
    const games = await fetch("/assets/json/zones.json")
      .then(r => r.json());

    document.getElementById("game-count").textContent =
      games.length;

    const featured = games
        .filter(g => g.featured)
        .slice(0, 6);

    const container =
      document.getElementById("featured-games");

    container.innerHTML = "";

    featured.forEach(game => {
      const card = document.createElement("div");
      card.className = "featured-game";

      card.innerHTML = `
        <img src="${game.cover.replace("{COVER_URL}", COVER_URL)}">
        <h3>${game.name}</h3>
      `;

      card.onclick = () => {
        window.location.href = "/g.html";
      };

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
  }
});