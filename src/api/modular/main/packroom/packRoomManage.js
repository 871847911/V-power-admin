import { axios } from '@/utils/request'

/**
 * 查询套餐房型关联信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:10
 */
export function packRoomPage (parameter) {
  return axios({
    url: '/packRoom/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 套餐房型关联信息列表
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:10
 */
export function packRoomList (parameter) {
  return axios({
    url: '/packRoom/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加套餐房型关联信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:10
 */
export function packRoomAdd (parameter) {
  return axios({
    url: '/packRoom/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑套餐房型关联信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:10
 */
export function packRoomEdit (parameter) {
  return axios({
    url: '/packRoom/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除套餐房型关联信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:10
 */
export function packRoomDelete (parameter) {
  return axios({
    url: '/packRoom/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出套餐房型关联信息
 *
 * @author Lvyq
 * @date 2022-01-08 16:21:10
 */
export function packRoomExport (parameter) {
  return axios({
    url: '/packRoom/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
