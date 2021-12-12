<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}</div>
      <div style="margin-bottom:10px">平台签约用户 - 宿V次方</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="金米粒" content="15600" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="房费" content="13000" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="保证金" content="20000" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="我的店铺信息"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra" @click="$refs.editForm.edit()">修改</a>
            <div class="info">
              <div class="info_item"></div>
              <table class="sysInfo_table">
                <tr>
                  <td class="sysInfo_td">店铺名称：V次方小店</td>
                  <td class="sysInfo_td">负责人：求玮</td>
                </tr>
                <tr>
                  <td class="sysInfo_td">联系方式：18405818220</td>
                  <td class="sysInfo_td">地址：浙江省杭州市滨江区</td>
                </tr>
                <tr>
                  <td class="sysInfo_td">身份证正反面：<a href="">查看</a></td>
                  <td class="sysInfo_td">手持身份证正面：<a href="">查看</a></td>
                </tr>
                <tr>
                  <td class="sysInfo_td">营业执照：<a href="">查看</a></td>
                  <td class="sysInfo_td">食品经营许可证：<a href="">查看</a></td>
                </tr>
                <tr>
                  <td class="sysInfo_td">特种行业许可证：<a href="">上传</a></td>
                </tr>
              </table>
            </div>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="民宿" :bordered="false" style="margin-bottom:24px">
            <a slot="extra">查看更多</a>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
          <a-card :loading="loading" title="资金动态" :bordered="false">
            <a slot="extra">查看更多</a>
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span
                    >&nbsp; 在&nbsp;<a href="#">{{ item.project.name }}</a
                    >&nbsp; <span>{{ item.project.action }}</span
                    >&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <edit-form ref="editForm" @ok="handleOk" />
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'
import editForm from './editForm'
const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    Radar,
    editForm
  },
  data() {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created() {
    this.user = this.userInfo
    this.avatar = process.env.VUE_APP_API_BASE_URL + '/sysFileInfo/preview?id=' + this.userInfo.avatar
  },
  mounted() {
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
  },
  methods: {
    handleOk() {},
    getProjects() {
      this.projects = [
        {
          id: 1,
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          title: 'Alipay',
          description: '那是一种内在的东西， 他们到达不了，也无法触及的',
          status: 1,
          updatedAt: '2018-07-26 00:00:00'
        },
        {
          id: 2,
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
          title: 'Angular',
          description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
          status: 1,
          updatedAt: '2018-07-26 00:00:00'
        },
        {
          id: 3,
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
          title: 'Ant Design',
          description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
          status: 1,
          updatedAt: '2018-07-26 00:00:00'
        },
        {
          id: 4,
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
          title: 'Snowy',
          description: '那时候我只会想自己想要什么，从不想自己拥有什么',
          status: 1,
          updatedAt: '2018-07-26 00:00:00'
        },
        {
          id: 5,
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
          title: 'Bootstrap',
          description: '凛冬将至',
          status: 1,
          updatedAt: '2018-07-26 00:00:00'
        },
        {
          id: 6,
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
          title: 'Vue',
          description: '生命就像一盒巧克力，结果往往出人意料',
          status: 1,
          updatedAt: '2018-07-26 00:00:00'
        }
      ]
      this.loading = false
    },
    getActivity() {
      this.activities = [
        {
          id: 1,
          user: {
            nickname: '求玮',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          },
          project: {
            name: '',
            action: '充值',
            event: '10000保证金'
          },
          time: '2018-08-23 14:47:00'
        },
        {
          id: 1,
          user: {
            nickname: '求玮',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
          },
          project: {
            name: '',
            action: '充值',
            event: '10000房费'
          },
          time: '2018-08-23 09:35:37'
        }
      ]
    },
    getTeams() {
      this.teams = [
        {
          id: 1,
          name: '民宿1',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
        },
        {
          id: 2,
          name: '民宿2',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
        }
      ]
    },
    initRadar() {
      this.radarLoading = true
      const dv = new DataSet.View().source([
        {
          item: '引用',
          个人: 70,
          团队: 30,
          部门: 40
        },
        {
          item: '口碑',
          个人: 60,
          团队: 70,
          部门: 40
        },
        {
          item: '产量',
          个人: 50,
          团队: 60,
          部门: 40
        },
        {
          item: '贡献',
          个人: 40,
          团队: 50,
          部门: 40
        },
        {
          item: '热度',
          个人: 60,
          团队: 70,
          部门: 40
        },
        {
          item: '引用',
          个人: 70,
          团队: 50,
          部门: 40
        }
      ])
      dv.transform({
        type: 'fold',
        fields: ['个人', '团队', '部门'],
        key: 'user',
        value: 'score'
      })

      this.radarData = dv.rows
      this.radarLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.sysInfo_table {
  width: 100%;
  min-height: 45px;
  line-height: 45px;
  text-align: center;
}
.sysInfo_td {
  text-align: left;
  border: 1px solid #e8e8e8;
  padding-left: 24px;
  a {
  }
}
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
