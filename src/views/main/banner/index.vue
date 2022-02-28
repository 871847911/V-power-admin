<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle"> </a-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowKey="record => record.id"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('banner:add')">
          <a-button type="primary" v-if="hasPerm('banner:add')" icon="plus" @click="$refs.addForm.add()"
            >新增轮播图管理</a-button
          >
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('banner:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('banner:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <div slot="imgId" slot-scope="text">
          <img style="width: 100px;" :src="`${BASE_URL}/sysFileInfo/preview?id=${text}`" />
        </div>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('banner:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('banner:edit') & hasPerm('banner:delete')" />
          <a-popconfirm
            v-if="hasPerm('banner:delete')"
            placement="topRight"
            title="确认删除？"
            @confirm="() => singleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form :packIList="packIList" ref="addForm" @ok="handleOk" />
      <edit-form :packIList="packIList" ref="editForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import { bannerPage, bannerDelete, bannerExport } from '@/api/modular/main/banner/bannerManage'
import { packInfoPage } from '@/api/modular/main/packinfo/packInfoManage'
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
      BASE_URL: process.env.VUE_APP_API_BASE_URL,
      packIList: [],
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '套餐id',
          align: 'center',
          dataIndex: 'packId'
        },
        {
          title: '图片',
          align: 'center',
          dataIndex: 'imgId',
          scopedSlots: { customRender: 'imgId' }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return bannerPage(Object.assign(parameter, this.queryParam)).then(res => {
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
    if (this.hasPerm('banner:edit') || this.hasPerm('banner:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
      this.getMock()
    }
  },
  methods: {
    getMock() {
      packInfoPage().then(res => {
        this.packIList = res.data.rows || []
      })
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ id: record.id }]
      this.bannerDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.bannerDelete(paramIds)
    },
    bannerDelete(record) {
      bannerDelete(record).then(res => {
        if (res.success) {
          this.$message.success('删除成功')
          this.$refs.table.clearRefreshSelected()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    },
    /**
     * 批量导出
     */
    batchExport() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      bannerExport(paramIds).then(res => {
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
