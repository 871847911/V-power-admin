<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('roomInfo:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="民宿">
                <a-select placeholder="请选择民宿" v-model="queryParam.bnbId">
                  <a-select-option v-for="item in roomList" :key="item.id" :value="item.id">{{
                    item.name
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="房型名称">
                  <a-input v-model="queryParam.roomName" allow-clear placeholder="请输入房型名称" />
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
        <template class="table-operator" slot="operator" v-if="hasPerm('roomInfo:add')">
          <a-button type="primary" v-if="hasPerm('roomInfo:add')" icon="plus" @click="$refs.addForm.add()"
            >新增房型信息</a-button
          >
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('roomInfo:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('roomInfo:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('roomInfo:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('roomInfo:edit') & hasPerm('roomInfo:delete')" />
          <a-popconfirm
            v-if="hasPerm('roomInfo:delete')"
            placement="topRight"
            title="确认删除？"
            @confirm="() => singleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form :roomList="roomList" ref="addForm" @ok="handleOk" />
      <edit-form :roomList="roomList" ref="editForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import { roomInfoPage, roomInfoDelete, roomInfoExport } from '@/api/modular/main/RoomInfo/roomInfoManage'
import { bnbInfoPage } from '@/api/modular/main/bnbinfo/bnbInfoManage'
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
      roomList: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '增项费用',
          align: 'center',
          dataIndex: 'addPrice'
        },
        {
          title: '民宿',
          align: 'center',
          dataIndex: 'bnbId',
          customRender: text => {
            const name = (this.roomList.find(item => item.id === text) || {}).name
            return name
          }
        },
        {
          title: '房型名称',
          align: 'center',
          dataIndex: 'roomName'
        },
        {
          title: 'VR',
          align: 'center',
          dataIndex: 'vr'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return roomInfoPage(Object.assign(parameter, this.queryParam)).then(res => {
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
    if (this.hasPerm('roomInfo:edit') || this.hasPerm('roomInfo:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
    this.getMock()
  },
  methods: {
    getMock() {
      bnbInfoPage().then(res => {
        this.roomList = res.data.rows || []
      })
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ id: record.id }]
      this.roomInfoDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.roomInfoDelete(paramIds)
    },
    roomInfoDelete(record) {
      roomInfoDelete(record).then(res => {
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
      roomInfoExport(paramIds).then(res => {
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
