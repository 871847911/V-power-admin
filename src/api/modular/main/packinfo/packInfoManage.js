import { axios } from '@/utils/request'

/**
 * 查询套餐信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:09:38
 */
export function packInfoPage(parameter) {
  return axios({
    url: '/packInfo/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 套餐信息列表
 *
 * @author Lvyq
 * @date 2022-01-08 16:09:38
 */
export function packInfoList(parameter) {
  return axios({
    url: '/packInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加套餐信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:09:38
 */
export function packInfoAdd(parameter) {
  return axios({
    url: '/packInfo/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑套餐信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:09:38
 */
export function packInfoEdit(parameter) {
  return axios({
    url: '/packInfo/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除套餐信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:09:38
 */
export function packInfoDelete(parameter) {
  return axios({
    url: '/packInfo/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出套餐信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:09:38
 */
export function packInfoExport(parameter) {
  return axios({
    url: '/packInfo/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 套餐信息详情
 *
 * @author Lvyq
 * @date 2022-01-08 16:09:38
 */
export function packInfoDetail(parameter) {
  return axios({
    url: '/packInfo/detail',
    method: 'get',
    params: parameter
  })
}
