import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import config from '../config/config.json';
const endpoint = config.api_endpoint;

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem('APPToken')) {
      const { email } = JSON.parse(window.localStorage.getItem('APPToken'));

      const getUserInfo = async () => {
        const res = await axios.get(`${endpoint}/user/user?email=${email}`);
        const user = await res.data;
        setCurrentUser(user);
      };

      getUserInfo();
      setIsLoading(false);
    } else {
      setCurrentUser(null);
      setIsLoading(false);
    }
  }, []);

  return <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
