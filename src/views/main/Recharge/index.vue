<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('recharge:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="帐户">
                <a-input v-model="queryParam.account" allow-clear placeholder="请输入帐户" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="金额">
                <a-input-number v-model="queryParam.amount" style="width: 100%" allow-clear placeholder="请输入金额" />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="充值人">
                  <a-input v-model="queryParam.rechargeUser" allow-clear placeholder="请输入充值人" />
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
        <template class="table-operator" slot="operator" v-if="hasPerm('recharge:add')">
          <a-button type="primary" v-if="hasPerm('recharge:add')" icon="plus" @click="$refs.addForm.add()"
            >新增充值记录</a-button
          >
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('recharge:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('recharge:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('recharge:edit')" @click="$refs.editForm.edit(record)">审批</a>
          <a-divider type="vertical" v-if="hasPerm('recharge:edit') & hasPerm('recharge:delete')" />
          <a v-if="hasPerm('recharge:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('recharge:edit') & hasPerm('recharge:delete')" />
          <a-popconfirm
            v-if="hasPerm('recharge:delete')"
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
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import { rechargePage, rechargeDelete, rechargeExport } from '@/api/modular/main/Recharge/rechargeManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
export default {
  components: {
    STable,
    addForm,
    editForm,
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
          title: '帐户',
          align: 'center',
          dataIndex: 'account'
        },
        {
          title: '金额',
          align: 'center',
          dataIndex: 'amount'
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
          title: '审批人',
          align: 'center',
          dataIndex: 'approvalUser'
        },
        {
          title: '充值截图',
          align: 'center',
          dataIndex: 'rechargeImg'
        },
        {
          title: '充值人',
          align: 'center',
          dataIndex: 'rechargeUser'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remark'
        },
        {
          title: '充值状态 1-待审批 2-通过 3-拒绝',
          align: 'center',
          dataIndex: 'status'
        },
        {
          title: '户名',
          align: 'center',
          dataIndex: 'userName'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return rechargePage(Object.assign(parameter, this.queryParam)).then(res => {
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
    if (this.hasPerm('recharge:edit') || this.hasPerm('recharge:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
  },
  methods: {
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ id: record.id }]
      this.rechargeDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.rechargeDelete(paramIds)
    },
    rechargeDelete(record) {
      rechargeDelete(record).then(res => {
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
    /**
     * 批量导出
     */
    batchExport() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      rechargeExport(paramIds).then(res => {
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
