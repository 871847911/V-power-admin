import { axios } from '@/utils/request'

/**
 * 查询套餐价格
 *
 * @author Lvyq
 * @date 2022-01-08 16:18:25
 */
export function packPricePage (parameter) {
  return axios({
    url: '/packPrice/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 套餐价格列表
 *
 * @author Lvyq
 * @date 2022-01-08 16:18:25
 */
export function packPriceList (parameter) {
  return axios({
    url: '/packPrice/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加套餐价格
 *
 * @author Lvyq
 * @date 2022-01-08 16:18:25
 */
export function packPriceAdd (parameter) {
  return axios({
    url: '/packPrice/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑套餐价格
 *
 * @author Lvyq
 * @date 2022-01-08 16:18:25
 */
export function packPriceEdit (parameter) {
  return axios({
    url: '/packPrice/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除套餐价格
 *
 * @author Lvyq
 * @date 2022-01-08 16:18:25
 */
export function packPriceDelete (parameter) {
  return axios({
    url: '/packPrice/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出套餐价格
 *
 * @author Lvyq
 * @date 2022-01-08 16:18:25
 */
export function packPriceExport (parameter) {
  return axios({
    url: '/packPrice/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
