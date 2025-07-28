// Function to check if a word is a palindrome
function isPalindrome(word) {
    // Check if input is a valid string
    if (typeof word !== 'string' || word.length === 0) {
        return false;
    }
    
    // Convert to lowercase and compare with its reverse
    const normalized = word.toLowerCase();
    return normalized === normalized.split('').reverse().join('');
}

// Example usage
const word = 'Mom';
console.log("Is palindrome:", isPalindrome(word)); // Output: Is palindrome: true

// Explanation:
// - The function validates the input as a non-empty string.
// - It converts the word to lowercase to handle case-insensitive palindromes (e.g., 'Mom' vs 'mom').
// - It compares the normalized word with its reverse (created using split, reverse, and join).
// - If they match, the word is a palindrome.
// - Time complexity: O(n), where n is the length of the word, due to string operations.