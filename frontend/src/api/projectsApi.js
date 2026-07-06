import axiosInstance from './axiosInstance'

export const fetchProjects = (params = {}) =>
  axiosInstance.get('/projects/', { params })

export const fetchProjectBySlug = (slug) =>
  axiosInstance.get(`/projects/${slug}/`)
