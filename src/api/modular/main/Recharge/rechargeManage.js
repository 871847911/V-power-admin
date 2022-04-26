import { axios } from '@/utils/request'

/**
 * 查询充值记录
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function rechargePage(parameter) {
  return axios({
    url: '/recharge/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 充值记录列表
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function rechargeList(parameter) {
  return axios({
    url: '/recharge/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加充值记录
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function rechargeAdd(parameter) {
  return axios({
    url: '/recharge/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑充值记录
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function rechargeEdit(parameter) {
  return axios({
    url: '/recharge/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除充值记录
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function rechargeDelete(parameter) {
  return axios({
    url: '/recharge/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出充值记录
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function rechargeExport(parameter) {
  return axios({
    url: '/recharge/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 充值审核
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function rechargeApproval(parameter) {
  return axios({
    url: '/recharge/approval',
    method: 'post',
    data: parameter
  })
}

/**
 * 退款审核
 *
 * @author Lvyq
 * @date 2022-01-19 11:03:30
 */
export function approvalRefund(parameter) {
  return axios({
    url: '/orderGeneral/approvalRefund',
    method: 'post',
    data: parameter
  })
}
