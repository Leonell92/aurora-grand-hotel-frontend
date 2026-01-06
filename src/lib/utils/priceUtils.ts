/**
 * Format a number as Nigerian Naira currency
 * @param amount - The amount to format
 * @returns Formatted string with commas (e.g., "25,000.00")
 */
export const formatPrice = (amount: number | string): string => {
  // Convert string to number if needed
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Check if valid number
  if (isNaN(numAmount)) {
    return '0.00';
  }
  
  // Format with commas and 2 decimal places
  return numAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Format a number as currency with symbol
 * @param amount - The amount to format
 * @param symbol - Currency symbol (default: ₦)
 * @returns Formatted string with symbol (e.g., "₦25,000.00")
 */
export const formatCurrency = (amount: number | string, symbol: string = '₦'): string => {
  return `${symbol}${formatPrice(amount)}`;
};