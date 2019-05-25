import request from '@/utils/request'

export function getAllAdmin() {
  return request({
    url: 'admin/user/',
    method: 'get'
  })
}

export function getAdminType() {
  return request({
    url: 'admin/type/',
    method: 'get'
  })
}

export function addAdmin(data) {
  return request({
    url: 'admin/user/',
    method: 'POST',
    data
  })
}

export function editAdmin(data) {
  return request({
    url: 'admin/user/',
    method: 'POST',
    data
  })
}

export function removeAdmin(data) {
  return request({
    url: 'admin/user/remove/',
    method: 'POST',
    data
  })
}
