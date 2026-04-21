window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

function closeGame() {
  const container = document.getElementById("gameContainer");
  const content = document.getElementById("gameContent");

  container.style.display = "none";
  content.innerHTML = "";
}

function toggleFullscreen() {
  const elem = document.getElementById("gameContainer");

  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}