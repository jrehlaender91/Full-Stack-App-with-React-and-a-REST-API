import { createContext, useState } from 'react';

// Create context
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (credentials) => {
    const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    };

    const response = await fetch("http://localhost:5000/api/users", fetchOptions);
    if (response.status === 200) {
      const user = await response.json();
      setUser(user);
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  const signOut = () => {
    setUser(null);
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
