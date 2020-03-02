// UNION ---------------------------------------
function combine(input1: number | string, input2: number | string) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
};

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Toni', 'Paloma');
console.log(combinedNames);

// ALIAS (CREATE A DETERMINATE TYPE) ----------------------------------
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

const person4: {
    name: Combinable;
    age: Combinable;
    resultConversion: ConversionDescriptor;
} = {
    name: 15,
    age: 26,
    resultConversion: 'as-text',
};

// FUNCTIONS  --------------------
function add(n1: number, n2: number): number {
    return n1 + n2;
}

// VOID IS WHEN NOT RETURN ANYTHING
function printResult(num: number): void {
    console.log('Result: ' + num);
}

// UNDEFINED IS WHEN RETURN ANYTHING (DIFFERENT TO void)
function printedResult(num: number): undefined {
    console.log('Result: ' + num);
    return;
}

printResult(add(5, 12));