/**
 * 16 bit floating number representation in JS
 *  Bits: 0  1  2  3  4  5  6    7  8  9  10  11  12  13  14  15 
 *  Type: S  E  E  E  E  E  E    M  M  M  M   M   M   M   M   M
 */  
 const EXP_BITS = 6;
 const MANTISSA_BITS = 10;
 const NON_SIGN_BITS = EXP_BITS + MANTISSA_BITS;
 
 const encode = n => {
   const sign = Math.sign(1 / n) === -1 ? 1 : 0;
    
   if (n === 0) {
     return sign === 0 ? 0 : (1 << NON_SIGN_BITS);
   }
 
   let exponent = Math.floor(Math.log(Math.abs(n)) / Math.log(2));

   const lower = 2**exponent;

   const upper = 2**(exponent + 1);

   exponent = (exponent + 15) & 0b11111;
 
   const percentage = (Math.abs(n) - lower) / (upper - lower);

   const mantissa = 1024 * percentage;
 
   return (sign << NON_SIGN_BITS) | (exponent << MANTISSA_BITS) | mantissa;
 };
 
 const decode = n => {
   const sign     = (n & 0b1000000000000000) >> NON_SIGN_BITS;
   const exponent = (n & 0b0111110000000000) >> MANTISSA_BITS;
   const mantissa = (n & 0b0000001111111111);
 
   if (exponent === 0 && mantissa === 0) {
     return sign === 1 ? -0 : 0;
   }
 
   if (exponent === 0b11111) {
     if (mantissa === 0) {
       return sign === 0 ? Infinity : -Infinity;
     } 
       return NaN;
     
   }
 
   const wholePart = exponent === 0 ? 0 : 1;
 
   const percentage = mantissa / 1024;
 
   return (-1)**sign * (wholePart + percentage) * 2**(exponent - 15);
 }
export const IEEE_754_SPECIFICATION = (n) => {
    const encoded = encode(n);
    return decode(encoded)

}
console.log(IEEE_754_SPECIFICATION(0.2+0.1+1))
console.log(0.2+0.1+1)
