<template>
  <div>
    <x-card>
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="民宿名称">
                <a-select placeholder="请选择民宿">
                  <a-select-option v-for="(item, index) in 2" :key="index" :value="index">{{
                    '民宿名称' + index
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="商品名称">
                <a-input v-model="queryParam.code" allow-clear placeholder="请输入商品名称" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
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
          <a-button @click="$refs.addForm.add()" icon="plus" type="primary">新增商品</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <a>上架</a>
          <a-divider type="vertical" />
          <a @click="$refs.editForm.edit(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
        <span slot="setting" slot-scope="text, record">
          <a @click="$refs.setIng.edit(record)">设置</a>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <set-ing ref="setIng" @ok="handleOk" />
    </a-card>
  </div>
</template>

<script>
import { STable, XCard, XDown } from '@/components'
import { packInfoList } from '@/api/modular/main/goods/goodsManage'
import addForm from './addForm'
import editForm from './editForm'
import setIng from './setting'

export default {
  components: {
    XDown,
    XCard,
    STable,
    addForm,
    editForm,
    setIng
  },

  data() {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '民宿名字',
          dataIndex: 'name'
        },
        {
          title: '套餐售卖名称',
          dataIndex: 'user'
        },
        {
          title: '简称',
          dataIndex: 'phone'
        },
        {
          title: '套餐售卖特点',
          dataIndex: 'remark'
        },
        {
          title: '价格设置',
          dataIndex: 'remark'
        },
        {
          title: '全景链接上传',
          dataIndex: 'remark'
        },
        {
          title: '套餐房间图片',
          dataIndex: 'remark'
        },
        {
          title: '房态',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'setting' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return packInfoList(Object.assign(parameter, this.queryParam)).then(res => {
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
      width: '250px',
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
