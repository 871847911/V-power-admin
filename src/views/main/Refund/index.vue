<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('refund:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="退款人">
                <a-input v-model="queryParam.refundUser" allow-clear placeholder="请输入退款人" />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="审批人">
                  <a-input v-model="queryParam.approvalUser" allow-clear placeholder="请输入审批人" />
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
                <a-form-item label="退款状态">
                  <a-select placeholder="请选择状态" v-model="queryParam.status">
                    <a-select-option :value="1">待审批</a-select-option>
                    <a-select-option :value="2">通过</a-select-option>
                    <a-select-option :value="3">拒绝</a-select-option>
                    <a-select-option :value="4">已打款</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="帐户">
                  <a-input v-model="queryParam.account" allow-clear placeholder="请输入帐户" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="户名">
                  <a-input v-model="queryParam.userName" allow-clear placeholder="请输入户名" />
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
        <template class="table-operator" slot="operator" v-if="hasPerm('refund:add')">
          <!-- <a-button type="primary" v-if="hasPerm('refund:add')" icon="plus" @click="$refs.addForm.add()"
            >新增保证金退款记录</a-button
          > -->
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('refund:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('refund:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <!-- <a v-if="hasPerm('refund:edit')" @click="$refs.editForm.edit(record)">编辑</a> -->
          <a v-if="record.status === 1" @click="$refs.setIng.edit(record)">审核</a>
          <a-popconfirm
            v-if="record.status === 2"
            placement="topRight"
            title="是否完成打款？"
            @confirm="() => forceExist(record)"
          >
            <a>完成打款</a>
          </a-popconfirm>
          <a-divider type="vertical" v-if="record.status === 1 || record.status === 2" />
          <a-popconfirm
            v-if="hasPerm('refund:delete')"
            placement="topRight"
            title="确认删除？"
            @confirm="() => singleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
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
import { refundPage, refundDelete, refundExport, makePayment } from '@/api/modular/main/Refund/refundManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
import setIng from './setting'
export default {
  components: {
    STable,
    addForm,
    editForm,
    setIng,
    XDown
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
          title: '退款人',
          align: 'center',
          dataIndex: 'refundUserName'
        },
        {
          title: '金额',
          align: 'center',
          dataIndex: 'amount'
        },
        {
          title: '审批人',
          align: 'center',
          dataIndex: 'approvalUserName'
        },
        {
          title: '审批备注',
          align: 'center',
          dataIndex: 'approvalRemark'
        },
        {
          title: '审批时间',
          align: 'center',
          dataIndex: 'approvalTime'
        },
        {
          title: '退款状态',
          align: 'center',
          dataIndex: 'status',
          customRender: text => {
            return text === 1 ? '待审批' : text === 2 ? '通过' : text === 3 ? '拒绝' : '已打款'
          }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return refundPage(Object.assign(parameter, this.switchingDate())).then(res => {
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
    if (this.hasPerm('refund:edit') || this.hasPerm('refund:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
  },
  methods: {
    moment,
    forceExist(record) {
      makePayment({ ...record, status: 4 }).then(res => {
        if (res.success) {
          this.$refs.table.refresh()
        } else {
          this.$message.error('操作失败：' + res.message)
        }
      })
    },
    /**
     * 查询参数组装
     */
    switchingDate() {
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
      this.refundDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.refundDelete(paramIds)
    },
    refundDelete(record) {
      refundDelete(record).then(res => {
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
      refundExport(paramIds).then(res => {
        this.$refs.batchExport.downloadfile(res)
      })
    },
    handleOk() {
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
