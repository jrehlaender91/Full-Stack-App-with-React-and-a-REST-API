import React, { createContext, useState } from 'react';
import Cookies from "js-cookie";
import { api } from '../utils/apiHelper';

// Creates context
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Searchs for a current cookie so we can load user "data"
  const cookie = Cookies.get("authenticatedUser");
  const [user, setUser] = useState(cookie ? JSON.parse(cookie) : null);

  // Sign in function
  const signIn = async (credentials) => {
    const response = await api("/users", "GET", null, credentials);
    if (response.status === 200) {
      const userData = await response.json(); 
      const userWithCreds = {
        id: userData.id, 
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailAddress: credentials.emailAddress,
        password: credentials.password, 
      };
      // If success sets the user credentials and the cookie
      setUser(userWithCreds);
      Cookies.set("authenticatedUser", JSON.stringify(userWithCreds), { expires: 1 });
      return userWithCreds;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  // Sign out funtion - Sets user to null and removes the cookie
  const signOut = () => {
    setUser(null);
    Cookies.remove("authenticatedUser");
  }

  return (
    <UserContext.Provider value={{
      user,
      actions: {
        signIn,
        signOut
      }
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
