import { axios } from '@/utils/request'

/**
 * 查询房型信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:43
 */
export function roomInfoPage (parameter) {
  return axios({
    url: '/roomInfo/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 房型信息列表
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:43
 */
export function roomInfoList (parameter) {
  return axios({
    url: '/roomInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加房型信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:43
 */
export function roomInfoAdd (parameter) {
  return axios({
    url: '/roomInfo/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑房型信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:43
 */
export function roomInfoEdit (parameter) {
  return axios({
    url: '/roomInfo/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除房型信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:43
 */
export function roomInfoDelete (parameter) {
  return axios({
    url: '/roomInfo/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出房型信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:43
 */
export function roomInfoExport (parameter) {
  return axios({
    url: '/roomInfo/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
