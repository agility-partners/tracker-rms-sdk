import axios, { type AxiosInstance } from 'axios';

export function createAPIClient(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
  });
}
