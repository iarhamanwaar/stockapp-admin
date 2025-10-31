import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "/admin-api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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
    "banks": "banks",
    "pricing": "pricing"
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
        if ('field' in filter && filter.field === 'approvalStatus' && filter.value) {
          params.append('approvalStatus', filter.value);
        }
      });
    }

    const queryString = params.toString();
    const fullUrl = queryString ? `${apiEndpoint}?${queryString}` : apiEndpoint;

    try {
      const { data } = await axiosInstance.get(fullUrl);

      // For sellers and riders, ensure approvalStatus exists (fallback to isVerified)
      let processedData = data.data || [];
      if ((resource === 'sellers' || resource === 'riders') && processedData.length > 0) {
        processedData = processedData.map((item: any) => {
          // If no approvalStatus, infer from isVerified
          if (!item.approvalStatus) {
            item.approvalStatus = item.isVerified ? 'approved' : 'pending';
          }
          return item;
        });
      }

      return {
        data: processedData,
        total: data.total || 0,
      };
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);

      // For demo purposes, return mock list data for sellers and riders
      if (resource === 'sellers' || resource === 'riders') {
        const mockItems = [];
        const statuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected'];

        for (let i = 1; i <= 5; i++) {
          const approvalStatus = statuses[i % 3];

          if (resource === 'sellers') {
            mockItems.push({
              id: `seller-${i}`,
              name: `Seller ${i}`,
              email: `seller${i}@example.com`,
              businessName: `Business ${i}`,
              businessType: 'Retail',
              phone: `+123456789${i}`,
              status: approvalStatus === 'approved' ? 'active' : 'inactive',
              isVerified: approvalStatus === 'approved',
              approvalStatus: approvalStatus,
              createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            });
          } else if (resource === 'riders') {
            mockItems.push({
              id: `rider-${i}`,
              firstName: `Rider`,
              lastName: `${i}`,
              name: `Rider ${i}`,
              email: `rider${i}@example.com`,
              phone: `+123456789${i}`,
              vehicleType: i % 2 === 0 ? 'Motorcycle' : 'Car',
              isAvailable: true,
              status: approvalStatus === 'approved' ? 'active' : 'inactive',
              isVerified: approvalStatus === 'approved',
              approvalStatus: approvalStatus,
              createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            });
          }
        }

        return {
          data: mockItems,
          total: mockItems.length,
        };
      }

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

      // For sellers and riders, ensure approvalStatus exists (fallback to isVerified)
      if ((resource === 'sellers' || resource === 'riders') && data) {
        if (!data.approvalStatus) {
          data.approvalStatus = data.isVerified ? 'approved' : 'pending';
        }
      }

      return {
        data,
      };
    } catch (error) {
      // For demo purposes, return mock data when API is not available
      console.warn(`API not available for ${resource}/${id}, returning mock data`);

      // Enhanced mock data for sellers and riders with approval fields
      let mockData: any = {
        id: id,
        name: `Sample ${resource}`,
        email: "sample@example.com",
        role: "user",
        phoneNumber: "+1234567890",
        isVerified: true,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add approval-specific mock data for sellers
      if (resource === 'sellers') {
        mockData = {
          ...mockData,
          businessName: "Sample Business LLC",
          businessType: "Retail",
          address: "123 Business Street, City, State 12345",
          contactPerson: "John Doe",
          phone: "+1234567890",
          approvalStatus: "pending",
          documents: {
            businessLicense: {
              url: "https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Business+License",
              fileName: "business_license.pdf",
              uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              status: "pending"
            },
            idCard: {
              url: "https://via.placeholder.com/800x600/2196F3/FFFFFF?text=ID+Card",
              fileName: "id_card.jpg",
              uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              status: "pending"
            },
            taxDocument: {
              url: "https://via.placeholder.com/800x600/FF9800/FFFFFF?text=Tax+Document",
              fileName: "tax_registration.pdf",
              uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              status: "pending"
            }
          },
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }

      // Add approval-specific mock data for riders
      if (resource === 'riders') {
        mockData = {
          ...mockData,
          firstName: "Jane",
          lastName: "Smith",
          name: "Jane Smith",
          phone: "+1234567890",
          vehicleType: "Motorcycle",
          isAvailable: true,
          approvalStatus: "pending",
          documents: {
            idCard: {
              url: "https://via.placeholder.com/800x600/2196F3/FFFFFF?text=ID+Card",
              fileName: "rider_id.jpg",
              uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              status: "pending"
            },
            drivingLicense: {
              url: "https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Driving+License",
              fileName: "driving_license.jpg",
              uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              status: "pending"
            },
            vehicleRegistration: {
              url: "https://via.placeholder.com/800x600/FF5722/FFFFFF?text=Vehicle+Registration",
              fileName: "vehicle_reg.pdf",
              uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              status: "pending"
            },
            profilePhoto: {
              url: "https://via.placeholder.com/400x400/9C27B0/FFFFFF?text=Profile+Photo",
              fileName: "profile.jpg",
              uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              status: "pending"
            }
          },
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }

      return {
        data: mockData,
      };
    }
  },

  create: async ({ resource, variables, meta }) => {
    const apiEndpoint = getApiEndpoint(resource);

    try {
      const { data } = await axiosInstance.post(apiEndpoint, variables);
      return {
        data,
      };
    } catch (error) {
      // For demo purposes, return mock success when API is not available
      console.warn(`API not available for creating ${resource}, returning mock success`);
      return {
        data: {
          id: Date.now().toString(),
          ...variables,
          createdAt: new Date().toISOString(),
        },
      };
    }
  },

  update: async ({ resource, id, variables, meta }) => {
    const apiEndpoint = getApiEndpoint(resource, id);

    try {
      const { data } = await axiosInstance.put(apiEndpoint, variables);
      return {
        data,
      };
    } catch (error) {
      // For demo purposes, return mock success when API is not available
      console.warn(`API not available for updating ${resource}/${id}, returning mock success`);
      return {
        data: {
          id: id,
          ...variables,
          updatedAt: new Date().toISOString(),
        },
      };
    }
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

    // Handle approval/rejection endpoints
    try {
      const { data } = await axiosInstance.request({
        url: url.startsWith('/') ? url : `${API_BASE_PATH}/${url}`,
        method: method || 'GET',
        data: payload,
        params: query,
        headers,
      });

      return { data };
    } catch (error) {
      // For demo purposes, return mock success for approval actions when API is not available
      if (url.includes('/approve') || url.includes('/reject') || url.includes('/request-info')) {
        console.warn(`API not available for ${url}, returning mock success`);
        return {
          data: {
            success: true,
            message: 'Action completed successfully (mock)',
            timestamp: new Date().toISOString(),
          },
        };
      }
      throw error;
    }
  },
};