// src/hooks/useLoginUser.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (loginData) => {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      const { token, user } = response.data;

      // Save token and admin flag
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', user.isAdmin);

      return response.data;
    }
  });
};
