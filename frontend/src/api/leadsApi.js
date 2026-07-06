import axiosInstance from './axiosInstance'

export const submitLead = (data) =>
  axiosInstance.post('/leads/', data)
