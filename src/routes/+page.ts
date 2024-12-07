export async function load({ fetch }) {
    try {
      const response = await fetch('/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Data loaded:', data);
      return {
        data
      };
    } catch (error) {
      console.error('Error loading data:', error);
      return {
        data: []
      };
    }
  }
  