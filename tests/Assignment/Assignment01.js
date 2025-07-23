function checkEvenOdd(num) {
  // Convert number to string to split around the decimal
  const [beforeDecimalStr, afterDecimalStr] = num.toString().split(".");

  // Convert both parts back to integers
  const beforeDecimal = parseInt(beforeDecimalStr);
  const afterDecimal = parseInt(afterDecimalStr);

  // Function to determine if a number is even or odd
  const evenOrOdd = (n) => (n % 2 === 0 ? "Even" : "Odd");

  console.log(`Number: ${num}`);
  console.log(`Before decimal: ${beforeDecimal} --> ${evenOrOdd(beforeDecimal)}`);
  console.log(`After decimal: ${afterDecimal} --> ${evenOrOdd(afterDecimal)}`);
}
checkEvenOdd(3948.432943);