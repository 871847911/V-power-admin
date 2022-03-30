import { axios } from '@/utils/request'

export function orderGeneralPage(parameter) {
  return axios({
    url: '/checkInOrder/queryCheckInOrderList',
    method: 'get',
    params: parameter
  })
}

/**
 * 套餐分类列表
 *
 * @author Lvyq
 * @date 2022-01-08 16:22:47
 */
export function packCategoryList(parameter) {
  return axios({
    url: '/packCategory/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加套餐分类
 *
 * @author Lvyq
 * @date 2022-01-08 16:22:47
 */
export function packCategoryAdd(parameter) {
  return axios({
    url: '/packCategory/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑套餐分类
 *
 * @author Lvyq
 * @date 2022-01-08 16:22:47
 */
export function packCategoryEdit(parameter) {
  return axios({
    url: '/packCategory/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除套餐分类
 *
 * @author Lvyq
 * @date 2022-01-08 16:22:47
 */
export function packCategoryDelete(parameter) {
  return axios({
    url: '/packCategory/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出套餐分类
 *
 * @author Lvyq
 * @date 2022-01-08 16:22:47
 */
export function packCategoryExport(parameter) {
  return axios({
    url: '/packCategory/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
