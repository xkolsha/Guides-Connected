import { jwtDecode } from "jwt-decode";

class AuthService {
  // Decode the token to get user information
  getUser() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  // Get the user's ID from the token
  getUserId() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded ? decoded.userId : null;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token); // Use jwtDecode here
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      console.error("Error checking token expiration:", error.message);
      return true; // Consider an undecodable token as expired
    }
  }

  // Retrieve the token from localStorage
  getToken() {
    return localStorage.getItem("authToken");
  }

  // Save the token and user data to localStorage
  login(authToken, userData) {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Token stored:", authToken);
  }

  // Remove the token and user data from localStorage
  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }
}

export default new AuthService();
