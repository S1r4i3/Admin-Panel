import { api } from "@/lib/api";

export const cmsApi = {
  // Pages
  getPages:    (params)    => api.get("/api/cms/pages/", params),
  getPage:     (id)        => api.get(`/api/cms/pages/${id}/`),
  createPage:  (data)      => api.post("/api/cms/pages/", data),
  updatePage:  (id, data)  => api.patch(`/api/cms/pages/${id}/`, data),
  deletePage:  (id)        => api.delete(`/api/cms/pages/${id}/`),
  publishPage: (id)        => api.post(`/api/cms/pages/${id}/publish/`, {}),

  // Blogs
  getBlogs:    (params)    => api.get("/api/cms/blogs/", params),
  getBlog:     (id)        => api.get(`/api/cms/blogs/${id}/`),
  createBlog:  (data)      => api.post("/api/cms/blogs/", data),
  updateBlog:  (id, data)  => api.patch(`/api/cms/blogs/${id}/`, data),
  deleteBlog:  (id)        => api.delete(`/api/cms/blogs/${id}/`),

  // FAQs
  getFaqs:     (params)    => api.get("/api/cms/faqs/", params),
  createFaq:   (data)      => api.post("/api/cms/faqs/", data),
  updateFaq:   (id, data)  => api.patch(`/api/cms/faqs/${id}/`, data),
  deleteFaq:   (id)        => api.delete(`/api/cms/faqs/${id}/`),

  // Banners
  getBanners:  (params)    => api.get("/api/cms/banners/", params),
  createBanner:(data)      => api.post("/api/cms/banners/", data),
  updateBanner:(id, data)  => api.patch(`/api/cms/banners/${id}/`, data),
  deleteBanner:(id)        => api.delete(`/api/cms/banners/${id}/`),
};
