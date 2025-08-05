// Function to reverse the letters of a string
function reverseString(str) {
    // Check if input is a valid string
    if (typeof str !== 'string' || str.length === 0) {
        return '';
    }
    
    // Convert string to array, reverse it, and join back to string
    return str.split('').reverse().join('');
}

// Example usage
const str = 'London';
console.log("Reversed string:", reverseString(str)); // Output: Reversed string: nodnoL

// Explanation:
// - The function takes a string as input and validates it.
// - It uses split('') to convert the string into an array of characters.
// - The reverse() method reverses the array in place.
// - The join('') method concatenates the array elements back into a string.
// - Time complexity: O(n), where n is the string length, due to the array operations.