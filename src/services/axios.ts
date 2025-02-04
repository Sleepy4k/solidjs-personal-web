import axios, { type AxiosInstance } from "axios";

export default function(host: string, ...args: any): AxiosInstance {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const headers = args.headers ? { ...defaultHeaders, ...args.headers } : defaultHeaders;
  args = { ...args, headers };

  return axios.create({
    baseURL: host,
    ...args,
  });
}
