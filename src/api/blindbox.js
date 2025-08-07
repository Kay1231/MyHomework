import axios from 'axios';

const API_BASE = '/api/blindbox';

// 获取盲盒列表
export function fetchBlindBoxes(params) {
    return axios.get(API_BASE, { params });
}

// 获取单个盲盒详情
export function fetchBlindBoxDetail(id) {
    return axios.get(`${API_BASE}/${id}`);
}

// 创建盲盒
export function createBlindBox(data) {
    return axios.post(API_BASE, data);
}

// 更新盲盒
export function updateBlindBox(id, data) {
    return axios.put(`${API_BASE}/${id}`, data);
}

// 删除盲盒
export function deleteBlindBox(id) {
    return axios.delete(`${API_BASE}/${id}`);
}

// 获取盲盒内的所有物品
export function fetchBlindBoxItems(blindBoxId) {
    return axios.get(`${API_BASE}/${blindBoxId}/items`);
}

// 添加盲盒物品
export function addBlindBoxItem(blindBoxId, data) {
    return axios.post(`${API_BASE}/${blindBoxId}/items`, data);
}

// 更新盲盒物品
export function updateBlindBoxItem(blindBoxId, itemId, data) {
    return axios.put(`${API_BASE}/${blindBoxId}/items/${itemId}`, data);
}

// 删除盲盒物品
export function deleteBlindBoxItem(blindBoxId, itemId) {
    return axios.delete(`${API_BASE}/${blindBoxId}/items/${itemId}`);
}