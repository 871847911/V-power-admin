import { axios } from '@/utils/request'

/**
 * 查询民宿基本信息
 *
 * @date 2022-01-01 12:38:41
 */
export function packInfoList(parameter) {
  return axios({
    url: '/packInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 民宿基本信息列表
 *
 * @date 2022-01-01 12:38:41
 */
export function bnbInfoList(parameter) {
  return axios({
    url: '/bnbInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加民宿基本信息
 *
 * @date 2022-01-01 12:38:41
 */
export function bnbInfoAdd(parameter) {
  return axios({
    url: '/bnbInfo/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑民宿基本信息
 *
 * @date 2022-01-01 12:38:41
 */
export function bnbInfoEdit(parameter) {
  return axios({
    url: '/bnbInfo/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除民宿基本信息
 *
 * @date 2022-01-01 12:38:41
 */
export function bnbInfoDelete(parameter) {
  return axios({
    url: '/bnbInfo/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出民宿基本信息
 *
 * @date 2022-01-01 12:38:41
 */
export function bnbInfoExport(parameter) {
  return axios({
    url: '/bnbInfo/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
