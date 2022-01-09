import { axios } from '@/utils/request'

/**
 * 查询用户查询历史/搜索发现
 *
 * @author Lvyq
 * @date 2022-01-09 13:22:36
 */
export function searchHistPage (parameter) {
  return axios({
    url: '/searchHist/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 用户查询历史/搜索发现列表
 *
 * @author Lvyq
 * @date 2022-01-09 13:22:36
 */
export function searchHistList (parameter) {
  return axios({
    url: '/searchHist/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加用户查询历史/搜索发现
 *
 * @author Lvyq
 * @date 2022-01-09 13:22:36
 */
export function searchHistAdd (parameter) {
  return axios({
    url: '/searchHist/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑用户查询历史/搜索发现
 *
 * @author Lvyq
 * @date 2022-01-09 13:22:36
 */
export function searchHistEdit (parameter) {
  return axios({
    url: '/searchHist/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除用户查询历史/搜索发现
 *
 * @author Lvyq
 * @date 2022-01-09 13:22:36
 */
export function searchHistDelete (parameter) {
  return axios({
    url: '/searchHist/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出用户查询历史/搜索发现
 *
 * @author Lvyq
 * @date 2022-01-09 13:22:36
 */
export function searchHistExport (parameter) {
  return axios({
    url: '/searchHist/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
