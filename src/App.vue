<template>
  <a-config-provider :locale="locale">
    <div id="app" class="app app1">
      <router-view class="scrollbar" />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { refundPage } from '@/api/modular/main/Refund/refundManage'
import { AppDeviceEnquire } from '@/utils/mixin'
import { orderRefundInfoPage } from '@/api/modular/main/OrderRefundInfo/orderRefundInfoManage'
import { notification } from 'ant-design-vue'
export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  },
  mounted() {
    setInterval(() => {
      refundPage({ pageNo: 1, pageSize: 10 }).then(res => {
        const dataList = res.data.rows || []
        if (dataList.some(item => item.status === 1)) {
          notification['info']({
            message: '有新的退款申请'
          })
        }
      })
    }, 1000 * 60 * 5)
    setInterval(() => {
      orderRefundInfoPage({ pageNo: 1, pageSize: 10 }).then(res => {
        const dataList = res.data.rows || []
        if (dataList.some(item => item.approvalStatus === 0)) {
          notification['info']({
            message: '有新的订单退款申请'
          })
        }
      })
    }, 1000 * 60 * 5)
  }
}
</script>
<style>
.app {
  overflow: auto;
  border: none;
}
.scrollbar {
  margin: 0 auto;
}
.app1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
}
.app1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 6px;
  background: #aaa;
}
.app1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 8px;
  background: #ffffff;
}
</style>
