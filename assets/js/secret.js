const secretCode = ["t", "e", "d", "a"];
let secretIndex = 0;

document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    if (key === secretCode[secretIndex]) {
        secretIndex++;

        if (secretIndex === secretCode.length) {
            sessionStorage.setItem("tedaAccess", "true");
            secretIndex = 0;
            window.location.href = "/index.html";
        }

    } else {
        secretIndex = key === "t" ? 1 : 0;
    }
});