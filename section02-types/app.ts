// UNKNOWS TYPE
let userInput: unknown; // DIFERENT TO ANY
let userName: string;

userInput = 5;
userInput = 'Toni';

if (typeof userInput === 'string') {
    userName = userInput;
}

// NEVER TYPE (in functions)
// SPECIALY FOR FUNCTION THAT CATCH ERROR BUT NOT RETURN 
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };
}

const result = generateError('An error occurred!', 500);