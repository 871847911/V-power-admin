import { axios } from '@/utils/request'

/**
 * 查询轮播图管理
 *
 * @author Lvyq
 * @date 2022-01-01 21:59:01
 */
export function bannerPage (parameter) {
  return axios({
    url: '/banner/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 轮播图管理列表
 *
 * @author Lvyq
 * @date 2022-01-01 21:59:01
 */
export function bannerList (parameter) {
  return axios({
    url: '/banner/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加轮播图管理
 *
 * @author Lvyq
 * @date 2022-01-01 21:59:01
 */
export function bannerAdd (parameter) {
  return axios({
    url: '/banner/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑轮播图管理
 *
 * @author Lvyq
 * @date 2022-01-01 21:59:01
 */
export function bannerEdit (parameter) {
  return axios({
    url: '/banner/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除轮播图管理
 *
 * @author Lvyq
 * @date 2022-01-01 21:59:01
 */
export function bannerDelete (parameter) {
  return axios({
    url: '/banner/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出轮播图管理
 *
 * @author Lvyq
 * @date 2022-01-01 21:59:01
 */
export function bannerExport (parameter) {
  return axios({
    url: '/banner/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
