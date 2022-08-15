import useSWR from 'swr';
import axiosInstance from '../constants/axiosInstance';
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';
import role from '../../types/api_schemas/role';
import user from '../../types/api_schemas/user';
import axiosRetry from 'axios-retry';

const useUser = () => {
  type userAuthData = {
    role: Array<role>;
    user: user;
  } | null;

  const fetchUser = async (user_path: string) => {
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
        if (error?.response?.status === 401 || error?.response?.status === 500) {
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
