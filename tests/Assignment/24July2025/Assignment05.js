// Function to check if a number is prime
function isPrime(num) {
    // Numbers less than 2 are not prime
    if (num < 2) return false;
    
    // Check for divisibility up to the square root of num
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Function to count prime numbers in an array
function countPrimes(arr) {
    // Check if array is empty or not an array
    if (!Array.isArray(arr) || arr.length === 0) {
        return 0;
    }
    
    let primeCount = 0;
    
    // Iterate through the array and count primes
    for (let num of arr) {
        if (isPrime(num)) {
            primeCount++;
        }
    }
    
    return primeCount;
}

// Example usage
const numbers = [4, 2, 9, 7, 5, 6, 1, 3, 8];
console.log("Number of primes:", countPrimes(numbers)); // Output: Number of primes: 4 (2, 3, 5, 7)

// Explanation:
// - The isPrime function checks if a number is prime by ensuring it's >= 2 and not divisible by any integer from 2 to its square root.
// - The countPrimes function iterates through the array, calling isPrime for each element and incrementing a counter for prime numbers.
// - The square root optimization in isPrime reduces the number of iterations for large numbers.
// - Time complexity: O(n * sqrt(m)) where n is the array length and m is the largest number in the array.