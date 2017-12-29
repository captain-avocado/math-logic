(function () {
    let submitBtn = document.querySelector(".button_submit");
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        //получаем значение из поля #input
        let getValue = function () {
            return document.getElementById("input").value;
        };

        //преобразуем значение в массив цифр
        let num = getValue().split("");

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

        let hasMinus = function () {
            if (num[i] === "-") {
                i++;
            }
            return nonZeroNum();
        };

        let plusZeroNum = function () {
            if (num[i] === "0") {
                i++;
                return plusZeroNum();
            } else {
                return nonZeroNum();
            }
        };
        let endNum = function () {
            if (num.length === i) {
                // alert("YAEHAH!!!");
                return true;
            } else if (digits.indexOf(num[i]) >= 0) {
                return plusZeroNum();
            } else {
                // alert("ERROR!");
                return false;
            }
        };
        let continuationNum = function () {
            if (nonZero.indexOf(num[i]) >= 0) {
                return nonZeroNum();
            } else if (num[i] === "0") {
                i++;
                return endNum();
            } else {
                // alert("ERROR!");
                return false;
            }
        };
        let nonZeroNum = function () {
            if (even.indexOf(num[i]) >= 0) {
                i++;
                return nonZeroNum();
            } else if (odd.indexOf(num[i]) >= 0) {
                i++;
                return continuationNum();
            } else {
                // alert("ERROR!");
                return false;
            }
        };

        let analyze = function () {
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
        if (getValue()) {
            res.innerHTML = getValue() + "\u00A0\u00A0\u00A0";
        }
        document.querySelector(".history__values").appendChild(res);
    });
}());