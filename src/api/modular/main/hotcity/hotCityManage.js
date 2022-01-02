import { axios } from '@/utils/request'

/**
 * 查询热门城市
 *
 * @author Lvyq
 * @date 2022-01-01 22:05:59
 */
export function hotCityPage (parameter) {
  return axios({
    url: '/hotCity/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 热门城市列表
 *
 * @author Lvyq
 * @date 2022-01-01 22:05:59
 */
export function hotCityList (parameter) {
  return axios({
    url: '/hotCity/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加热门城市
 *
 * @author Lvyq
 * @date 2022-01-01 22:05:59
 */
export function hotCityAdd (parameter) {
  return axios({
    url: '/hotCity/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑热门城市
 *
 * @author Lvyq
 * @date 2022-01-01 22:05:59
 */
export function hotCityEdit (parameter) {
  return axios({
    url: '/hotCity/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除热门城市
 *
 * @author Lvyq
 * @date 2022-01-01 22:05:59
 */
export function hotCityDelete (parameter) {
  return axios({
    url: '/hotCity/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出热门城市
 *
 * @author Lvyq
 * @date 2022-01-01 22:05:59
 */
export function hotCityExport (parameter) {
  return axios({
    url: '/hotCity/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
