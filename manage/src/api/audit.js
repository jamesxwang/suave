import request from '@/utils/request'

export function getUnauditList() {
  return request({
    url: 'anchor/apply/unaudit/',
    method: 'get'
  })
}

export function auditPass(data) {
  return request({
    url: 'anchor/apply/audit/pass/',
    method: 'post',
    data
  })
}

export function auditReject(data) {
  return request({
    url: 'anchor/apply/audit/reject/',
    method: 'post',
    data
  })
}
