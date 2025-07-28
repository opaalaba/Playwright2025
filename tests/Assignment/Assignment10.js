// Function to generate Fibonacci series up to n terms
function fibonacciSeries(n) {
    // Check if input is valid
    if (!Number.isInteger(n) || n <= 0) {
        return [];
    }
    
    // Initialize array with first two Fibonacci numbers
    const fib = [0, 1];
    
    // Generate subsequent Fibonacci numbers
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    
    // Return only the required number of terms
    return fib.slice(0, n);
}

// Example usage
const terms = 10;
console.log("Fibonacci series:", fibonacciSeries(terms).join(' ')); // Output: Fibonacci series: 0 1 1 2 3 5 8 13

// Explanation:
// - The function validates that the input is a positive integer.
// - It initializes an array with the first two Fibonacci numbers: 0 and 1.
// - It generates subsequent numbers by adding the previous two numbers in the sequence.
// - The slice(0, n) ensures only the requested number of terms is returned.
// - The join(' ') formats the output as a space-separated string.
// - Time complexity: O(n), where n is the number of terms, as it generates each term in constant time.