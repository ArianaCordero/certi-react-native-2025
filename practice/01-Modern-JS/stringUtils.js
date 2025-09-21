
function capitalize(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    if (typeof str !== 'string') {
        return false;
    }
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}
function countVowels(str) {
    if (typeof str !== 'string') {
        return 0;
    }
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}   

export { capitalize, reverseString, isPalindrome, countVowels };