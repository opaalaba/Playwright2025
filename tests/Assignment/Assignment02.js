// 1. Array Methods (String and Number Arrays)
console.log("=== Array Methods ===");

// String Array
let fruits = ["Apple", "Banana", "Orange", "Mango", "Pineapple"];
console.log("Original String Array:", fruits);

// Number Array
let numbers = [10, 20, 30, 40, 50];
console.log("Original Number Array:", numbers);

// 12 Array Methods
// 1. push() - Adds element to the end
fruits.push("Grape");
console.log("After push('Grape'):", fruits);

// 2. pop() - Removes last element
let poppedFruit = fruits.pop();
console.log("After pop():", fruits, "Popped:", poppedFruit);

// 3. shift() - Removes first element
let shiftedFruit = fruits.shift();
console.log("After shift():", fruits, "Shifted:", shiftedFruit);

// 4. unshift() - Adds element to the beginning
fruits.unshift("Kiwi");
console.log("After unshift('Kiwi'):", fruits);

// 5. splice() - Adds/removes elements
fruits.splice(2, 1, "Lemon"); // Remove 1 element at index 2, add "Lemon"
console.log("After splice(2, 1, 'Lemon'):", fruits);

// 6. slice() - Extracts a portion
let slicedFruits = fruits.slice(1, 3);
console.log("slice(1, 3):", slicedFruits);

// 7. concat() - Merges arrays
let moreFruits = ["Peach", "Pear"];
let combinedFruits = fruits.concat(moreFruits);
console.log("After concat(['Peach', 'Pear']):", combinedFruits);

// 8. map() - Creates new array with transformed elements
let upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log("map(toUpperCase):", upperFruits);

// 9. filter() - Creates new array with elements that pass test
let longFruits = fruits.filter(fruit => fruit.length > 5);
console.log("filter(length > 5):", longFruits);

// 10. reduce() - Reduces array to single value
let sumNumbers = numbers.reduce((sum, num) => sum + num, 0);
console.log("reduce(sum) of numbers:", sumNumbers);

// 11. forEach() - Executes function for each element
console.log("forEach on numbers:");
numbers.forEach(num => console.log(num * 2));

// 12. includes() - Checks if array includes element
console.log("includes(30) in numbers:", numbers.includes(30));

// 2. String Methods
console.log("\n=== String Methods ===");
let text = "  Hello, JavaScript World!  ";
console.log("Original String:", text);

// 15 String Methods
// 1. trim() - Removes whitespace from both ends
console.log("trim():", text.trim());

// 2. toUpperCase() - Converts to uppercase
console.log("toUpperCase():", text.toUpperCase());

// 3. toLowerCase() - Converts to lowercase
console.log("toLowerCase():", text.toLowerCase());

// 4. slice() - Extracts a portion
console.log("slice(2, 7):", text.slice(2, 7));

// 5. substring() - Extracts characters between indices
console.log("substring(2, 7):", text.substring(2, 7));

// 6. replace() - Replaces first match
console.log("replace('World', 'Universe'):", text.replace("World", "Universe"));

// 7. replaceAll() - Replaces all matches
console.log("replaceAll('l', 'L'):", text.replaceAll("l", "L"));

// 8. charAt() - Returns character at index
console.log("charAt(2):", text.charAt(2));

// 9. charCodeAt() - Returns Unicode of character at index
console.log("charCodeAt(2):", text.charCodeAt(2));

// 10. split() - Splits string into array
console.log("split(' '):", text.split(" "));

// 11. includes() - Checks if string contains substring
console.log("includes('Java'):", text.includes("Java"));

// 12. startsWith() - Checks if string starts with substring
console.log("startsWith('He'):", text.startsWith("He"));

// 13. endsWith() - Checks if string ends with substring
console.log("endsWith('!'):", text.endsWith("!"));

// 14. indexOf() - Returns index of first occurrence
console.log("indexOf('Java'):", text.indexOf("Java"));

// 15. repeat() - Repeats string n times
console.log("repeat(2):", text.trim().repeat(2));

// 3. Math Methods
console.log("\n=== Math Methods ===");
let num1 = 16;
let num2 = 3.14159;
let num3 = -10;
let num4 = 100;
let num5 = 0.5;
console.log("Numbers:", num1, num2, num3, num4, num5);

// 20 Math Methods
// 1. abs() - Absolute value
console.log("abs(num3):", Math.abs(num3));

// 2. ceil() - Rounds up
console.log("ceil(num2):", Math.ceil(num2));

// 3. floor() - Rounds down
console.log("floor(num2):", Math.floor(num2));

// 4. round() - Rounds to nearest integer
console.log("round(num2):", Math.round(num2));

// 5. trunc() - Removes decimal part
console.log("trunc(num2):", Math.trunc(num2));

// 6. max() - Maximum value
console.log("max(num1, num4):", Math.max(num1, num4));

// 7. min() - Minimum value
console.log("min(num1, num4):", Math.min(num1, num4));

// 8. sqrt() - Square root
console.log("sqrt(num1):", Math.sqrt(num1));

// 9. cbrt() - Cube root
console.log("cbrt(num1):", Math.cbrt(num1));

// 10. pow() - Power
console.log("pow(num1, 2):", Math.pow(num1, 2));

// 11. exp() - e raised to power
console.log("exp(num5):", Math.exp(num5));

// 12. log() - Natural logarithm
console.log("log(num1):", Math.log(num1));

// 13. log10() - Base-10 logarithm
console.log("log10(num4):", Math.log10(num4));

// 14. sin() - Sine
console.log("sin(num2):", Math.sin(num2));

// 15. cos() - Cosine
console.log("cos(num2):", Math.cos(num2));

// 16. tan() - Tangent
console.log("tan(num2):", Math.tan(num2));

// 17. asin() - Arcsine
console.log("asin(num5):", Math.asin(num5));

// 18. acos() - Arccosine
console.log("acos(num5):", Math.acos(num5));

// 19. atan() - Arctangent
console.log("atan(num5):", Math.atan(num5));

// 20. random() - Random number between 0 and 1
console.log("random():", Math.random());