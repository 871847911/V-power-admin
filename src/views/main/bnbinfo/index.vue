<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('bnbInfo:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="关联用户">
                <a-select placeholder="请选择用户" v-model="queryParam.userId">
                  <a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
                    item.name
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="民宿名字">
                  <a-input v-model="queryParam.name" allow-clear placeholder="请输入民宿名字" />
                </a-form-item>
              </a-col>

              <a-col :md="8" :sm="24">
                <a-form-item label="联系电话">
                  <a-input v-model="queryParam.tel" allow-clear placeholder="请输入联系电话" />
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
        <template class="table-operator" slot="operator" v-if="hasPerm('bnbInfo:add')">
          <a-button type="primary" v-if="hasPerm('bnbInfo:add')" icon="plus" @click="$refs.addForm.add()"
            >新增民宿基本信息</a-button
          >
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('bnbInfo:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('bnbInfo:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('bnbInfo:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('bnbInfo:edit') & hasPerm('bnbInfo:delete')" />
          <a-popconfirm
            v-if="hasPerm('bnbInfo:delete')"
            placement="topRight"
            title="确认删除？"
            @confirm="() => singleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form :userList="userList" ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import { bnbInfoPage, bnbInfoDelete, bnbInfoExport } from '@/api/modular/main/bnbinfo/bnbInfoManage'
import { sysUserSelector } from '@/api/modular/main/user/userManage'
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
      userList: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '具体地址',
          align: 'center',
          dataIndex: 'address'
        },
        {
          title: '区块',
          align: 'center',
          dataIndex: 'block'
        },
        {
          title: '城市',
          align: 'center',
          dataIndex: 'city'
        },
        {
          title: '国家',
          align: 'center',
          dataIndex: 'country'
        },
        {
          title: '描述',
          align: 'center',
          dataIndex: 'description'
        },
        {
          title: '区或县',
          align: 'center',
          dataIndex: 'district'
        },
        {
          title: '纬度',
          align: 'center',
          dataIndex: 'lat'
        },
        {
          title: '经度',
          align: 'center',
          dataIndex: 'lng'
        },
        {
          title: '民宿名字',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '省份',
          align: 'center',
          dataIndex: 'province'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'tel'
        },
        {
          title: '镇',
          align: 'center',
          dataIndex: 'town'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return bnbInfoPage(Object.assign(parameter, this.queryParam)).then(res => {
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
    if (this.hasPerm('bnbInfo:edit') || this.hasPerm('bnbInfo:delete')) {
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
      sysUserSelector().then(res => {
        this.userList = res.data || []
      })
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ id: record.id }]
      this.bnbInfoDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.bnbInfoDelete(paramIds)
    },
    bnbInfoDelete(record) {
      bnbInfoDelete(record).then(res => {
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
      bnbInfoExport(paramIds).then(res => {
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
