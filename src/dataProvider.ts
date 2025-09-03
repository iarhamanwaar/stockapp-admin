import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = "http://localhost:5500";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const url = `/${resource}`;
    
    // Handle different resource endpoints based on your NestJS API
    let apiEndpoint = url;
    switch(resource) {
      case "user":
        apiEndpoint = "/user/profile"; // Adjust to your actual endpoint
        break;
      case "products":
        apiEndpoint = "/products";
        break;
      case "order":
        apiEndpoint = "/order/my"; // Adjust to your actual endpoint
        break;
      case "productimage":
        apiEndpoint = "/products"; // You might need to create a specific endpoint
        break;
      default:
        apiEndpoint = url;
    }

    try {
      const { data } = await axiosInstance.get(apiEndpoint);
      
      // Handle different response formats
      let items = [];
      if (Array.isArray(data)) {
        items = data;
      } else if (data.data && Array.isArray(data.data)) {
        items = data.data;
      } else if (data.items && Array.isArray(data.items)) {
        items = data.items;
      } else {
        // Single item response, wrap in array
        items = [data];
      }

      return {
        data: items,
        total: items.length,
      };
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  getOne: async ({ resource, id, meta }) => {
    let apiEndpoint = `/${resource}/${id}`;
    
    switch(resource) {
      case "user":
        apiEndpoint = `/user/profile`; // Adjust based on your API
        break;
      case "products":
        apiEndpoint = `/products/details/${id}`;
        break;
      case "order":
        apiEndpoint = `/order/${id}`; // You might need to create this endpoint
        break;
    }

    try {
      const { data } = await axiosInstance.get(apiEndpoint);
      return {
        data,
      };
    } catch (error) {
      throw error;
    }
  },

  create: async ({ resource, variables, meta }) => {
    const url = `/${resource}`;
    const { data } = await axiosInstance.post(url, variables);
    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `/${resource}/${id}`;
    const { data } = await axiosInstance.patch(url, variables);
    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `/${resource}/${id}`;
    const { data } = await axiosInstance.delete(url);
    return {
      data,
    };
  },

  getApiUrl: () => {
    return API_URL;
  },
};