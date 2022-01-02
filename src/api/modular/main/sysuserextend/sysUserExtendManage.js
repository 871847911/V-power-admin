import { axios } from '@/utils/request'

/**
 * 查询系统用户拓展信息
 *
 * @author Lvyq
 * @date 2022-01-01 12:26:59
 */
export function sysUserExtendPage (parameter) {
  return axios({
    url: '/sysUserExtend/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 系统用户拓展信息列表
 *
 * @author Lvyq
 * @date 2022-01-01 12:26:59
 */
export function sysUserExtendList (parameter) {
  return axios({
    url: '/sysUserExtend/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加系统用户拓展信息
 *
 * @author Lvyq
 * @date 2022-01-01 12:26:59
 */
export function sysUserExtendAdd (parameter) {
  return axios({
    url: '/sysUserExtend/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑系统用户拓展信息
 *
 * @author Lvyq
 * @date 2022-01-01 12:26:59
 */
export function sysUserExtendEdit (parameter) {
  return axios({
    url: '/sysUserExtend/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除系统用户拓展信息
 *
 * @author Lvyq
 * @date 2022-01-01 12:26:59
 */
export function sysUserExtendDelete (parameter) {
  return axios({
    url: '/sysUserExtend/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出系统用户拓展信息
 *
 * @author Lvyq
 * @date 2022-01-01 12:26:59
 */
export function sysUserExtendExport (parameter) {
  return axios({
    url: '/sysUserExtend/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
