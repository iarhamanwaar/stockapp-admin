import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "/admin-api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const getApiEndpoint = (resource: string, id?: string | number) => {
  const endpointMap: Record<string, string> = {
    "user": "users",
    "products": "products", 
    "order": "orders",
    "productimage": "product-images",
    "categories": "categories",
    "businesstypes": "business-types",
    "materials": "materials",
    "sellers": "sellers",
    "buyers": "buyers",
    "riders": "riders",
    "productreviews": "product-reviews",
    "sellerreviews": "seller-reviews",
    "transactions": "transactions",
    "notifications": "notifications",
    "chats": "chats",
    "messages": "messages",
    "banks": "banks"
  };
  
  const endpoint = endpointMap[resource] || resource;
  return id ? `${API_BASE_PATH}/${endpoint}/${id}` : `${API_BASE_PATH}/${endpoint}`;
};

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const apiEndpoint = getApiEndpoint(resource);

    // Add pagination parameters
    const params = new URLSearchParams();
    if (pagination) {
      params.append('page', pagination.current?.toString() || '1');
      params.append('limit', pagination.pageSize?.toString() || '10');
    }

    // Add search/filter parameters
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ('field' in filter && filter.field === 'search' && filter.value) {
          params.append('search', filter.value);
        }
        if ('field' in filter && filter.field === 'status' && filter.value) {
          params.append('status', filter.value);
        }
      });
    }

    const queryString = params.toString();
    const fullUrl = queryString ? `${apiEndpoint}?${queryString}` : apiEndpoint;

    try {
      const { data } = await axiosInstance.get(fullUrl);
      
      return {
        data: data.data || [],
        total: data.total || 0,
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
    const apiEndpoint = getApiEndpoint(resource, id);

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
    const apiEndpoint = getApiEndpoint(resource);

    const { data } = await axiosInstance.post(apiEndpoint, variables);
    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const apiEndpoint = getApiEndpoint(resource, id);

    const { data } = await axiosInstance.put(apiEndpoint, variables);
    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const apiEndpoint = getApiEndpoint(resource, id);

    const { data } = await axiosInstance.delete(apiEndpoint);
    return {
      data,
    };
  },

  getApiUrl: () => {
    return API_URL;
  },

  custom: async ({ url, method, payload, query, headers, meta }) => {
    if (url === "dashboard/stats") {
      const { data } = await axiosInstance.get(`${API_BASE_PATH}/dashboard/stats`);
      return { data };
    }
    
    const { data } = await axiosInstance.request({
      url: url.startsWith('/') ? url : `${API_BASE_PATH}/${url}`,
      method: method || 'GET',
      data: payload,
      params: query,
      headers,
    });
    
    return { data };
  },
};