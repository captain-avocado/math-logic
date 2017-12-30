(function () {
    let clearHistory = document.querySelector(".history__clear");
    let historyValues = document.querySelector(".history__values");
    clearHistory.addEventListener("click", (e) => {
        e.preventDefault();
        while (historyValues.firstChild) {
            historyValues.removeChild(historyValues.firstChild);
        }
    });
}());