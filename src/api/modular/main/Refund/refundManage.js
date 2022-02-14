import { axios } from '@/utils/request'

/**
 * 查询保证金退款记录
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function refundPage(parameter) {
  return axios({
    url: '/refund/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 保证金退款记录列表
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function refundList(parameter) {
  return axios({
    url: '/refund/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加保证金退款记录
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function refundAdd(parameter) {
  return axios({
    url: '/refund/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑保证金退款记录
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function refundEdit(parameter) {
  return axios({
    url: '/refund/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除保证金退款记录
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function refundDelete(parameter) {
  return axios({
    url: '/refund/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出保证金退款记录
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function refundExport(parameter) {
  return axios({
    url: '/refund/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
/**
 * 保证金退款审核
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function refundApproval(parameter) {
  return axios({
    url: '/refund/approval',
    method: 'post',
    data: parameter
  })
}

/**
 * 保证金退款打款
 *
 * @author Lvyq
 * @date 2022-02-12 14:40:02
 */
export function makePayment(parameter) {
  return axios({
    url: '/refund/makePayment',
    method: 'post',
    data: parameter
  })
}
