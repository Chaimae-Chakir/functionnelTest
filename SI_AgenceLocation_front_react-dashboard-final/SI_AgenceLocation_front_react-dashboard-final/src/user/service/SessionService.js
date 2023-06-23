import Cookies from "js-cookie";

const SessionService = {
  // Set encrypted token cookie
  setToken: (token) => {
    let encryptedToken = btoa(JSON.stringify(token));
    Cookies.set("TK", encryptedToken, { expires: 7 });
  },

  // Get decrypted token cookie
  getToken: () => {
    let encryptedToken = Cookies.get("TK");
    if (encryptedToken) {
      try {
        let decryptedToken = JSON.parse(atob(encryptedToken));
        return decryptedToken;
      } catch (error) {
        console.error("Error parsing token:", error);
        return null;
      }
    } else {
      return null;
    }
  },

  // Set encrypted roles cookie
  setRole: (roles) => {
    let encryptedRoles = btoa(JSON.stringify(roles));
    Cookies.set("RL", encryptedRoles, { expires: 7 });
  },

  // Get decrypted roles cookie
  getRole: () => {
    let encryptedRoles = Cookies.get("RL");
    if (encryptedRoles) {
      try {
        let decryptedRoles = JSON.parse(atob(encryptedRoles));
        return decryptedRoles;
      } catch (error) {
        console.error("Error parsing roles:", error);
        return null;
      }
    } else {
      return null;
    }
  },

  // Constructs and returns a user_info object containing the user informations
  userInfos: (firstName, lastName, username, email, id) => {
    let user_info = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      id: id,
    };
    return user_info;
  },

  // Set encrypted user_info cookie
  setUserInfos: (userInfo) => {
    let encryptedUserInfo = btoa(JSON.stringify(userInfo));
    Cookies.set("UIF", encryptedUserInfo, { expires: 7 });
  },

  // Get decrypted user_info cookie
  getUserInfos: () => {
    let encryptedUserInfo = Cookies.get("UIF");
    if (encryptedUserInfo) {
      try {
        let decryptedUserInfo = JSON.parse(atob(encryptedUserInfo));
        return decryptedUserInfo;
      } catch (error) {
        console.error("Error parsing user info:", error);
        return null;
      }
    } else {
      return null;
    }
  },
};

export default SessionService;
