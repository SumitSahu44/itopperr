import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api/blogs`;

// Helper to configure authorization headers
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getBlogs = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('Error fetching blogs from API:', err);
    throw err;
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching blog ${id} from API:`, err);
    throw err;
  }
};

export const addBlog = async (blog) => {
  try {
    const res = await axios.post(API_BASE, blog, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    console.error('Error creating blog via API:', err);
    throw err;
  }
};

export const updateBlog = async (id, updatedBlog) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, updatedBlog, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    console.error(`Error updating blog ${id} via API:`, err);
    throw err;
  }
};

export const deleteBlog = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`, {
      headers: getAuthHeader()
    });
    return res.data;
  } catch (err) {
    console.error(`Error deleting blog ${id} via API:`, err);
    throw err;
  }
};
