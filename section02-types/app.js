// UNKNOWS TYPE
var userInput; // DIFERENT TO ANY
var userName;
userInput = 5;
userInput = 'Toni';
if (typeof userInput === 'string') {
    userName = userInput;
}
// NEVER TYPE (in functions)
// SPECIALY FOR FUNCTION THAT CATCH ERROR BUT NOT RETURN 
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
var result = generateError('An error occurred!', 500);
