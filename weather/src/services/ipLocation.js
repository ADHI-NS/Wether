export default class IpLocation {
  log = console.log;

  // Asynchronous method to fetch IP location
  async getCity() {
    debugger;
    try {
      const response = await fetch("https://ipinfo.io/json?token=e000eea0006ac7");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      console.log(data.city);  // Log the city name
      return data.city;
    } catch (error) {
      console.error("Failed to fetch IP location:", error);
      return null;  // Return null or handle as needed
    }
  }
}
