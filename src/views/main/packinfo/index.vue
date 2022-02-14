<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('packInfo:page')">
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
            <a-col :md="8" :sm="24">
              <a-form-item label="套餐分类">
                <a-select placeholder="请选择套餐分类" v-model="queryParam.category">
                  <a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{
                    item.name
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="主标题">
                  <a-input v-model="queryParam.mainTitle" allow-clear placeholder="请输入主标题" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="副标题">
                  <a-input v-model="queryParam.viceTitle" allow-clear placeholder="请输入副标题" />
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
        <template class="table-operator" slot="operator" v-if="hasPerm('packInfo:add')">
          <a-button type="primary" v-if="hasPerm('packInfo:add')" icon="plus" @click="$refs.addForm.add()"
            >新增套餐信息</a-button
          >
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('packInfo:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('packInfo:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <a>上架</a>
          <a-divider type="vertical" />
          <a @click="$refs.setIng.edit(record)">设置</a>
          <a-divider type="vertical" />
          <a @click="$refs.editForm.edit(record)">详情</a>
          <a-divider type="vertical" />
          <a v-if="hasPerm('packInfo:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('packInfo:edit') & hasPerm('packInfo:delete')" />
          <a-popconfirm
            v-if="hasPerm('packInfo:delete')"
            placement="topRight"
            title="确认删除？"
            @confirm="() => singleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <set-ing ref="setIng" @ok="handleOk" />
      <add-form
        :roomList="roomList"
        :typeList="typeList"
        :facilities="facilities"
        :typeDictTypeDropDown="typeDictTypeDropDown"
        :hotCity="hotCity"
        ref="addForm"
        @ok="handleOk"
      />
      <edit-form
        :roomList="roomList"
        :typeList="typeList"
        :facilities="facilities"
        :typeDictTypeDropDown="typeDictTypeDropDown"
        :hotCity="hotCity"
        ref="editForm"
        @ok="handleOk"
      />
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import { packInfoPage, packInfoDelete, packInfoExport } from '@/api/modular/main/packinfo/packInfoManage'
import { packCategoryPage } from '@/api/modular/main/PackCategory/packCategoryManage'
import { bnbInfoPage } from '@/api/modular/main/bnbinfo/bnbInfoManage'
import { facilitiesPage } from '@/api/modular/main/facilities/facilitiesManage'
import { sysDictTypeDropDown } from '@/api/modular/system/dictManage'
import { hotCityPage } from '@/api/modular/main/hotcity/hotCityManage'
import setIng from './setting'
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
      roomList: [],
      typeList: [],
      facilities: [],
      typeDictTypeDropDown: [],
      hotCity: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '主标题',
          align: 'center',
          dataIndex: 'mainTitle'
        },
        {
          title: '默认价格',
          align: 'center',
          dataIndex: 'defaultPrice'
        },
        {
          title: '默认库存',
          align: 'center',
          dataIndex: 'defaultStock'
        },
        {
          title: '描述',
          align: 'center',
          dataIndex: 'description'
        },
        {
          title: '包含设备',
          align: 'center',
          dataIndex: 'facilities'
        },
        {
          title: '热点城市',
          align: 'center',
          dataIndex: 'hotPoint'
        },
        {
          title: '主图id',
          align: 'center',
          dataIndex: 'picId'
        },
        {
          title: '销售数量',
          align: 'center',
          dataIndex: 'saleAmt'
        },
        {
          title: '副标题',
          align: 'center',
          dataIndex: 'viceTitle'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return packInfoPage(Object.assign(parameter, this.queryParam)).then(res => {
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
    if (this.hasPerm('packInfo:edit') || this.hasPerm('packInfo:delete')) {
      this.columns.push({
        title: '操作',
        width: '250px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
      this.getMock()
    }
  },
  methods: {
    getMock() {
      bnbInfoPage().then(res => {
        this.roomList = res.data.rows || []
      })
      packCategoryPage().then(res => {
        this.typeList = res.data.rows || []
      })
      facilitiesPage().then(res => {
        this.facilities = res.data.rows || []
      })
      sysDictTypeDropDown({ code: 'pack_status' }).then(res => {
        this.typeDictTypeDropDown = res.data
      })
      hotCityPage().then(res => {
        this.hotCity = res.data.rows || []
      })
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ id: record.id }]
      this.packInfoDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.packInfoDelete(paramIds)
    },
    packInfoDelete(record) {
      packInfoDelete(record).then(res => {
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
      packInfoExport(paramIds).then(res => {
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
