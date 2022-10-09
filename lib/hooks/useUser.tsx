import axiosRetry from 'axios-retry';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import useSWR from 'swr';

import role from '../../types/api_schemas/role';
import user from '../../types/api_schemas/user';

import axiosInstance from '../constants/axiosInstance';

const useUser = () => {
  type userAuthData = {
    role: Array<role>;
    user: user;
  } | null;

  const fetchUser = async (user_path: string) => {
    if (!hasCookie('idToken') && hasCookie('refreshToken')) {
      const refreshResponse = await axiosInstance.post('/auth/refresh', {
        refreshToken: getCookie('refreshToken'),
      });
      if (refreshResponse.status === 200) {
        deleteCookie('idToken');
        deleteCookie('refreshToken');
        setCookie('idToken', refreshResponse.data.data.id_token, {
          maxAge: refreshResponse.data.data.expiresIn,
        });
        setCookie('refreshToken', refreshResponse.data.data.refresh_token);
      }
    }
    if (hasCookie('idToken')) {
      try {
        axiosRetry(axiosInstance, {
          retries: 5,
          retryDelay: axiosRetry.exponentialDelay,
          retryCondition: (error) => {
            return error.response?.status === 401;
          },
        });
        const user_data = await axiosInstance.get(user_path);
        return user_data.data.data;
      } catch (error: any) {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 500
        ) {
          if (hasCookie('refreshToken')) {
            try {
              const refreshResponse = await axiosInstance.post(
                '/auth/refresh',
                {
                  refreshToken: getCookie('refreshToken'),
                }
              );
              if (refreshResponse.status === 200) {
                deleteCookie('idToken');
                deleteCookie('refreshToken');
                setCookie('idToken', refreshResponse.data.data.id_token, {
                  maxAge: refreshResponse.data.data.expiresIn,
                });
                setCookie(
                  'refreshToken',
                  refreshResponse.data.data.refresh_token
                );
                const user_data = await axiosInstance.get(user_path);
                return user_data.data.data;
              }
            } catch (err: any) {
              console.error(err);
            }
          }
          deleteCookie('idToken');
        }
      }
    }
    return null;
  };
  const { data, error } = useSWR<userAuthData>('current_user/', fetchUser, {
    refreshInterval: 60000,
  });
  return {
    user: data,
    isLoading: error === undefined && data === undefined,
    isError: error,
  };
};

export default useUser;
