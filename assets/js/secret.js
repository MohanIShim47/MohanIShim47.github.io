const secretCode = ["t", "e", "d", "a"];
let secretIndex = 0;

document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    if (tedaAccess !== "true") {
        window.location.href = "/News/index.html";
    }

    if (key === secretCode[secretIndex]) {
        secretIndex++;
        if (secretIndex === secretCode.length) {
            sessionStorage.setItem("tedaAccess", "true");
            window.location.href = "/index.html";
            secretIndex = 0;
        }
    } else {
        secretIndex = key === "t" ? 1 : 0;
    }
});