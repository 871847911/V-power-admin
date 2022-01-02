import { axios } from '@/utils/request'

/**
 * 查询设备信息
 *
 * @author Lvyq
 * @date 2022-01-01 22:08:33
 */
export function facilitiesPage (parameter) {
  return axios({
    url: '/facilities/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 设备信息列表
 *
 * @author Lvyq
 * @date 2022-01-01 22:08:33
 */
export function facilitiesList (parameter) {
  return axios({
    url: '/facilities/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加设备信息
 *
 * @author Lvyq
 * @date 2022-01-01 22:08:33
 */
export function facilitiesAdd (parameter) {
  return axios({
    url: '/facilities/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑设备信息
 *
 * @author Lvyq
 * @date 2022-01-01 22:08:33
 */
export function facilitiesEdit (parameter) {
  return axios({
    url: '/facilities/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除设备信息
 *
 * @author Lvyq
 * @date 2022-01-01 22:08:33
 */
export function facilitiesDelete (parameter) {
  return axios({
    url: '/facilities/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出设备信息
 *
 * @author Lvyq
 * @date 2022-01-01 22:08:33
 */
export function facilitiesExport (parameter) {
  return axios({
    url: '/facilities/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
