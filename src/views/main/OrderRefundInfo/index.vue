<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('orderRefundInfo:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="订单编号">
                <a-input v-model="queryParam.orderId" allow-clear placeholder="请输入订单编号" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="申请用户">
                <a-input v-model="queryParam.applyUserId" allow-clear placeholder="请输入申请用户" />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="申请时间">
                  <a-date-picker
                    style="width: 100%"
                    placeholder="请选择申请时间"
                    v-model="queryParam.applyTimeDate"
                    @change="onChangeapplyTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="退款原因">
                  <a-input v-model="queryParam.refundReason" allow-clear placeholder="请输入退款原因" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="审批时间">
                  <a-date-picker
                    style="width: 100%"
                    placeholder="请选择审批时间"
                    v-model="queryParam.approvalTimeDate"
                    @change="onChangeapprovalTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="审批用户">
                  <a-input v-model="queryParam.approvalUserId" allow-clear placeholder="请输入审批用户" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="审批备注">
                  <a-input v-model="queryParam.approvalRemark" allow-clear placeholder="请输入审批备注" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="审批状态 （0-待审批 1-同意 2-拒绝）">
                  <a-input-number
                    v-model="queryParam.approvalStatus"
                    style="width: 100%"
                    allow-clear
                    placeholder="请输入审批状态 （0-待审批 1-同意 2-拒绝）"
                  />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowKey="record => record.id"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('orderRefundInfo:add')">
          <!-- <a-button type="primary" v-if="hasPerm('orderRefundInfo:add')" icon="plus" @click="$refs.addForm.add()">新增订单退款信息</a-button> -->
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('orderRefundInfo:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('orderRefundInfo:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="record.approvalStatus === 0" @click="$refs.setIng.edit(record)">审核</a>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <set-ing ref="setIng" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
import setIng from './setting'
import {
  orderRefundInfoPage,
  orderRefundInfoDelete,
  orderRefundInfoExport
} from '@/api/modular/main/OrderRefundInfo/orderRefundInfoManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
export default {
  components: {
    STable,
    addForm,
    editForm,
    XDown,
    setIng
  },
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '订单编号',
          align: 'center',
          dataIndex: 'orderId'
        },
        {
          title: '申请用户',
          align: 'center',
          dataIndex: 'applyUserName'
        },
        {
          title: '申请时间',
          align: 'center',
          dataIndex: 'applyTime'
        },
        {
          title: '退款原因',
          align: 'center',
          dataIndex: 'refundReason'
        },
        {
          title: '审批时间',
          align: 'center',
          dataIndex: 'approvalTime'
        },
        {
          title: '审批用户',
          align: 'center',
          dataIndex: 'approvalUserId'
        },
        {
          title: '审批备注',
          align: 'center',
          dataIndex: 'approvalRemark'
        },
        {
          title: '审批状态 ',
          align: 'center',
          dataIndex: 'approvalStatus',
          customRender: text => {
            const list = ['待审批', '同意', '拒绝）']
            return list[text]
          }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return orderRefundInfoPage(Object.assign(parameter, this.switchingDate())).then(res => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  created() {
    if (this.hasPerm('orderRefundInfo:edit') || this.hasPerm('orderRefundInfo:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
  },
  methods: {
    handleOk() {
      this.$refs.table.refresh()
    },
    moment,
    /**
     * 查询参数组装
     */
    switchingDate() {
      const queryParamapplyTime = this.queryParam.applyTimeDate
      if (queryParamapplyTime != null) {
        this.queryParam.applyTime = moment(queryParamapplyTime).format('YYYY-MM-DD')
        if (queryParamapplyTime.length < 1) {
          delete this.queryParam.applyTime
        }
      }
      const queryParamapprovalTime = this.queryParam.approvalTimeDate
      if (queryParamapprovalTime != null) {
        this.queryParam.approvalTime = moment(queryParamapprovalTime).format('YYYY-MM-DD')
        if (queryParamapprovalTime.length < 1) {
          delete this.queryParam.approvalTime
        }
      }
      const obj = JSON.parse(JSON.stringify(this.queryParam))
      return obj
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ id: record.id }]
      this.orderRefundInfoDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.orderRefundInfoDelete(paramIds)
    },
    orderRefundInfoDelete(record) {
      orderRefundInfoDelete(record).then(res => {
        if (res.success) {
          this.$message.success('删除成功')
          this.$refs.table.clearRefreshSelected()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    onChangeapplyTime(date, dateString) {
      this.applyTimeDateString = dateString
    },
    onChangeapprovalTime(date, dateString) {
      this.approvalTimeDateString = dateString
    },
    /**
     * 批量导出
     */
    batchExport() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      orderRefundInfoExport(paramIds).then(res => {
        this.$refs.batchExport.downloadfile(res)
      })
    },
    f() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
<style lang="less">
.table-operator {
  margin-bottom: 18px;
}
button {
  margin-right: 8px;
}
</style>
