// Function to find the largest number in an array
function findLargestNumber(arr) {
    // Check if array is empty or not an array
    if (!Array.isArray(arr) || arr.length === 0) {
        return null;
    }
    
    // Initialize the first element as the largest
    let largest = arr[0];
    
    // Iterate through the array to find the largest number
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }
    
    return largest;
}

// Example usage
const numbers = [4, 2, 9, 7, 5, 6, 1, 3, 8];
console.log("Largest number:", findLargestNumber(numbers)); // Output: Largest number: 9

// Explanation:
// - The function takes an array as input and performs a validity check to ensure it's a non-empty array.
// - It initializes the first element as the largest number.
// - It iterates through the array, comparing each element with the current largest. If an element is greater, it updates largest.
// - Finally, it returns the largest number.
// - Time complexity: O(n), where n is the array length, as it requires a single pass through the array.