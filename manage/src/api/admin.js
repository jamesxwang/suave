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
