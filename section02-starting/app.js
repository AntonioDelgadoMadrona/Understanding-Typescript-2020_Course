// UNION ---------------------------------------
function combine(input1, input2) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
;
var combinedAges = combine(30, 26);
console.log(combinedAges);
var combinedNames = combine('Toni', 'Paloma');
console.log(combinedNames);
var person4 = {
    name: 15,
    age: 26,
    resultConversion: 'as-text'
};
// FUNCTIONS  --------------------
function add(n1, n2) {
    return n1 + n2;
}
// VOID IS WHEN NOT RETURN ANYTHING
function printResult(num) {
    console.log('Result: ' + num);
}
// UNDEFINED IS WHEN RETURN ANYTHING (DIFFERENT TO void)
function printedResult(num) {
    console.log('Result: ' + num);
    return;
}
printResult(add(5, 12));
