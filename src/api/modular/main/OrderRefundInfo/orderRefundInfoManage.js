import { axios } from '@/utils/request'

/**
 * 查询订单退款信息
 *
 * @author Lvyq
 * @date 2022-03-28 22:13:25
 */
export function orderRefundInfoPage (parameter) {
  return axios({
    url: '/orderRefundInfo/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 订单退款信息列表
 *
 * @author Lvyq
 * @date 2022-03-28 22:13:25
 */
export function orderRefundInfoList (parameter) {
  return axios({
    url: '/orderRefundInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加订单退款信息
 *
 * @author Lvyq
 * @date 2022-03-28 22:13:25
 */
export function orderRefundInfoAdd (parameter) {
  return axios({
    url: '/orderRefundInfo/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑订单退款信息
 *
 * @author Lvyq
 * @date 2022-03-28 22:13:25
 */
export function orderRefundInfoEdit (parameter) {
  return axios({
    url: '/orderRefundInfo/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除订单退款信息
 *
 * @author Lvyq
 * @date 2022-03-28 22:13:25
 */
export function orderRefundInfoDelete (parameter) {
  return axios({
    url: '/orderRefundInfo/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出订单退款信息
 *
 * @author Lvyq
 * @date 2022-03-28 22:13:25
 */
export function orderRefundInfoExport (parameter) {
  return axios({
    url: '/orderRefundInfo/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
