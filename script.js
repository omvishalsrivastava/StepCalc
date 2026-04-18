let nums = [];
let ops = [];
let step = 1;

function calc() {

    nums = [];
    ops = [];
    step = 1;

    let s = document.getElementById("inp").value;
    let showSteps = document.getElementById("steps").checked;

    parse(s);

    let out = "";

    out += solveMulDiv(showSteps);
    out += solveAddSub(showSteps);

    out += "Final Answer: " + format(nums[0]);

    document.getElementById("out").innerText = out;
}

// -------- PARSE --------
function parse(s) {

    s = s.replace(/ /g, "");
    let num = "";

    for (let i = 0; i < s.length; i++) {

        let c = s[i];

        if ((c >= '0' && c <= '9') || c === '.') {
            num += c;
        } else {
            nums.push(parseFloat(num));
            ops.push(c);
            num = "";
        }
    }

    nums.push(parseFloat(num));
}

// -------- MUL / DIV --------
function solveMulDiv(show) {

    let out = "";

    for (let i = 0; i < ops.length; i++) {

        if (ops[i] === '*' || ops[i] === '/') {

            let a = nums[i];
            let b = nums[i + 1];

            if (ops[i] === '/' && b === 0) {
                return "Error: Division by zero\n";
            }

            let r = (ops[i] === '*') ? a * b : a / b;

            if (show) {
                out += `Step ${step++}: ${a} ${ops[i]} ${b} = ${r}\n`;
            }

            nums[i] = r;
            nums.splice(i + 1, 1);
            ops.splice(i, 1);

            i--;
        }
    }

    return out;
}

// -------- ADD / SUB --------
function solveAddSub(show) {

    let out = "";

    for (let i = 0; i < ops.length; i++) {

        let a = nums[i];
        let b = nums[i + 1];
        let op = ops[i];

        let r = (op === '+') ? a + b : a - b;

        if (show) {
            out += `Step ${step++}: ${a} ${op} ${b} = ${r}\n`;
        }

        nums[i] = r;
        nums.splice(i + 1, 1);
        ops.splice(i, 1);

        i--;
    }

    return out;
}

// -------- FORMAT --------
function format(x) {
    if (x === Math.floor(x)) return String(Math.floor(x));
    return String(x);
}