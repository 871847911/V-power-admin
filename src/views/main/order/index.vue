<template>
  <div>
    <x-card>
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="民宿名称">
                <a-select placeholder="请选择民宿">
                  <a-select-option v-for="(item, index) in 2" :key="index" :value="index">{{
                    '民宿名称' + index
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="商品名称">
                <a-input v-model="queryParam.code" allow-clear placeholder="请输入商品名称" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="状态">
                <a-select placeholder="请选择状态">
                  <a-select-option :value="1">待入住</a-select-option>
                  <a-select-option :value="2">待使用</a-select-option>
                  <a-select-option :value="3">已入住</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </x-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowKey="record => record.id"
        :rowSelection="options.rowSelection"
      >
        <template slot="operator">
          <!-- <x-down ref="batchExport" @batchExport="batchExport" /> -->
        </template>
        <span slot="action" slot-scope="text, record">
          <a @click="$refs.editForm.edit(record)">详情</a>
          <a-divider type="vertical" />
          <a-popconfirm placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>取消并退款</a>
          </a-popconfirm>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable, XCard, XDown } from '@/components'
import { orderGeneralPage } from '@/api/modular/main/Orders/orders'

export default {
  components: {
    XDown,
    XCard,
    STable
  },

  data() {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '民宿名称',
          dataIndex: 'name'
        },
        {
          title: '商品名称',
          dataIndex: 'user'
        },
        {
          title: '购买人',
          dataIndex: 'phone'
        },
        {
          title: '购买人联系方式',
          dataIndex: 'phone'
        },
        {
          title: '状态',
          dataIndex: 'remark'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return orderGeneralPage(Object.assign(parameter, this.queryParam)).then(res => {
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
    this.columns.push({
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
    })
  },

  methods: {
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ id: record.id }]
      this.sysPosDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.sysPosDelete(paramIds)
    },
    /**
     * 删除
     */
    sysPosDelete(param) {
      // sysPosDelete(param)
      //   .then(res => {
      //     if (res.success) {
      //       this.$message.success('删除成功')
      //       this.$refs.table.clearRefreshSelected()
      //     } else {
      //       this.$message.error('删除失败：' + res.message)
      //     }
      //   })
      //   .catch(err => {
      //     this.$message.error('删除错误：' + err.message)
      //   })
    },
    /**
     * 批量导出
     */
    batchExport() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      console.log(paramIds)
      // sysPosExport(paramIds).then(res => {
      //   this.$refs.batchExport.downloadfile(res)
      // })
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
