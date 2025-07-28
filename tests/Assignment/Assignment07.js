// Function to reverse individual words in a sentence
function reverseWords(sentence) {
    // Check if input is a valid string
    if (typeof sentence !== 'string' || sentence.length === 0) {
        return '';
    }
    
    // Split sentence into words, reverse each word, and join back
    return sentence
        .split(' ')
        .map(word => word.split('').reverse().join(''))
        .join(' ');
}

// Example usage
const sentence = "I am new to javascript";
console.log("Reversed words:", reverseWords(sentence)); // Output: Reversed words: I ma wen ot tpircsavaj

// Explanation:
// - The function validates the input as a string.
// - It splits the sentence into an array of words using split(' ').
// - The map function processes each word, converting it to an array of characters, reversing it, and joining it back.
// - The final join(' ') combines the reversed words with spaces.
// - Time complexity: O(n), where n is the total length of the sentence, as each character is processed once.