(function () {
    let submitBtn = document.querySelector(".button_submit");
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        //получаем значение из поля #input
        let getValue = () => {
            return document.getElementById("input").value;
        };

        let value = getValue();
        console.log("analyzing new value = " + value);

        //преобразуем значение в массив цифр
        let num = value.split("");

        //устанавливаем значение итератора, равное 0
        let i = 0;

        //массив нечетных цифр
        let odd = ["1", "3", "5", "7", "9"];

        //массив четных цифр
        let even = ["2", "4", "6", "8"];

        //массив ненулевых цифр
        let nonZero = odd.concat(even);

        //массив всех цифр
        let digits = nonZero.concat("0");

        let hasMinus = () => {
            console.log("in minus");
            if (num[i] === "-") {
                i++;
            }
            return nonZeroNum();
        };

        let plusZeroNum = () => {
            console.log("in plusZero");
            if (num[i] === "0") {
                i++;
                return plusZeroNum();
            } else {
                return nonZeroNum();
            }
        };
        let endNum = () => {
            console.log("in endNum");
            if (num.length === i) {
                return true;
            } else if (digits.indexOf(num[i]) >= 0) {
                return plusZeroNum();
            } else {
                return false;
            }
        };
        let continuationNum = () => {
            console.log("in contNum");
            if (nonZero.indexOf(num[i]) >= 0) {
                return nonZeroNum();
            } else if (num[i] === "0") {
                i++;
                return endNum();
            } else {
                return false;
            }
        };
        let nonZeroNum = () => {
            console.log("in nonZero");
            if (even.indexOf(num[i]) >= 0) {
                i++;
                return plusZeroNum();
            } else if (odd.indexOf(num[i]) >= 0) {
                i++;
                return continuationNum();
            } else {
                return false;
            }
        };

        let analyze = () => {
            return hasMinus();
        };

        let result = document.querySelector(".result");
        let isAccorded = analyze();
        let res = document.createElement("div");
        if (isAccorded) {
            result.innerHTML = "<strong>Значение соответствует грамматике</strong>";
        } else {
            result.innerHTML = "<strong>Значение НЕ соответствует грамматике</strong>";
            res.style.color = "crimson";
        }
        if (value) {
            res.innerHTML = value + "\u00A0";
        }
        document.querySelector(".history__values").appendChild(res);
    });
}());