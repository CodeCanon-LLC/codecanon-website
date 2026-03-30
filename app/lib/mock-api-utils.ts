/**
 * Mock API client utilities for simulating API requests with delays
 */

/**
 * Simulates an API request delay
 * @param min - Minimum delay in milliseconds (default: 300)
 * @param max - Maximum delay in milliseconds (default: 1000)
 */
export async function simulateDelay(min = 300, max = 1000): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
