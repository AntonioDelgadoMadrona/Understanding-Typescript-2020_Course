// NUMBER AND STRING
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    } else {
        return result;
    }
}

let number1: number;
number1 = 5;
const number2 = 10;
const printResult = true;
const resultPhrase = "Result is: "

const result = add(number1, number2, printResult, resultPhrase);

// OBJECT
const person = {
    name: 'Toni',
    age: 27
};

const person2: {
    name: string;
    age: number;
} = {
    name: 'Toni',
    age: 27
};

console.log(person);

// ARRAY
const hobbies = ['Sports', 'Cooking', 'Gaming'];

let favouriteSports: string[];  // ONLY PERMITES ARRAY OF STRINGS
favouriteSports = hobbies;  // IF HOBBIES CONTAINS A NUMBER IS AN ERROR