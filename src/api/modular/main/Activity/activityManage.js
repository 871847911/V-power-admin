import { axios } from '@/utils/request'

/**
 * 查询Activity
 *
 * @author lvyq
 * @date 2021-12-29 23:28:16
 */
export function activityPage (parameter) {
  return axios({
    url: '/activity/page',
    method: 'get',
    params: parameter
  })
}

/**
 * Activity列表
 *
 * @author lvyq
 * @date 2021-12-29 23:28:16
 */
export function activityList (parameter) {
  return axios({
    url: '/activity/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加Activity
 *
 * @author lvyq
 * @date 2021-12-29 23:28:16
 */
export function activityAdd (parameter) {
  return axios({
    url: '/activity/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑Activity
 *
 * @author lvyq
 * @date 2021-12-29 23:28:16
 */
export function activityEdit (parameter) {
  return axios({
    url: '/activity/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除Activity
 *
 * @author lvyq
 * @date 2021-12-29 23:28:16
 */
export function activityDelete (parameter) {
  return axios({
    url: '/activity/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出Activity
 *
 * @author lvyq
 * @date 2021-12-29 23:28:16
 */
export function activityExport (parameter) {
  return axios({
    url: '/activity/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
