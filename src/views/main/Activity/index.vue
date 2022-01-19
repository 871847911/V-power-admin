<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('activity:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="活动日期">
                <a-date-picker
                  style="width: 100%"
                  placeholder="请选择活动日期"
                  v-model="queryParam.activeDtDate"
                  @change="onChangeactiveDt"
                />
              </a-form-item>
            </a-col>
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
                <a-form-item label="主标题">
                  <a-input v-model="queryParam.mainTitle" allow-clear placeholder="请输入主标题" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="套餐">
                  <a-select placeholder="请选择套餐" v-model="queryParam.packId">
                    <a-select-option v-for="item in packIList" :key="item.id" :value="item.id">{{
                      item.mainTitle
                    }}</a-select-option>
                  </a-select>
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
        <template class="table-operator" slot="operator" v-if="hasPerm('activity:add')">
          <a-button type="primary" v-if="hasPerm('activity:add')" icon="plus" @click="$refs.addForm.add()"
            >新增活动信息</a-button
          >
          <a-button
            type="danger"
            :disabled="selectedRowKeys.length < 1"
            v-if="hasPerm('activity:delete')"
            @click="batchDelete"
            ><a-icon type="delete" />批量删除</a-button
          >
          <x-down v-if="hasPerm('activity:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('activity:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('activity:edit') & hasPerm('activity:delete')" />
          <a-popconfirm
            v-if="hasPerm('activity:delete')"
            placement="topRight"
            title="确认删除？"
            @confirm="() => singleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form :packIList="packIList" :roomList="roomList" ref="addForm" @ok="handleOk" />
      <edit-form :packIList="packIList" :roomList="roomList" ref="editForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
import { activityPage, activityDelete, activityExport } from '@/api/modular/main/Activity/activityManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
import { packInfoPage } from '@/api/modular/main/packinfo/packInfoManage'
import { bnbInfoPage } from '@/api/modular/main/bnbinfo/bnbInfoManage'
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
      packIList: [],
      roomList: [],
      // 表头
      columns: [
        {
          title: '活动日期',
          align: 'center',
          dataIndex: 'activeDt'
        },
        {
          title: '民宿id',
          align: 'center',
          dataIndex: 'bnbId'
        },
        {
          title: '有效结束日期',
          align: 'center',
          dataIndex: 'endDt'
        },
        {
          title: '主标题',
          align: 'center',
          dataIndex: 'mainTitle'
        },
        {
          title: '原价/抵扣价',
          align: 'center',
          dataIndex: 'originalPrice'
        },
        {
          title: '套餐id',
          align: 'center',
          dataIndex: 'packId'
        },
        {
          title: '主图id',
          align: 'center',
          dataIndex: 'picId'
        },
        {
          title: '活动价格',
          align: 'center',
          dataIndex: 'price'
        },
        {
          title: '预约金价格',
          align: 'center',
          dataIndex: 'reservationPrice'
        },
        {
          title: '膨胀比例',
          align: 'center',
          dataIndex: 'scale'
        },
        {
          title: '销量',
          align: 'center',
          dataIndex: 'sellAmt'
        },
        {
          title: '有效开始日期',
          align: 'center',
          dataIndex: 'startDt'
        },
        {
          title: '库存',
          align: 'center',
          dataIndex: 'stock'
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
        return activityPage(Object.assign(parameter, this.switchingDate())).then(res => {
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
    if (this.hasPerm('activity:edit') || this.hasPerm('activity:delete')) {
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
      packInfoPage().then(res => {
        this.packIList = res.data.rows || []
      })
    },
    moment,
    /**
     * 查询参数组装
     */
    switchingDate() {
      const queryParamactiveDt = this.queryParam.activeDtDate
      if (queryParamactiveDt != null) {
        this.queryParam.activeDt = moment(queryParamactiveDt).format('YYYY-MM-DD')
        if (queryParamactiveDt.length < 1) {
          delete this.queryParam.activeDt
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
      this.activityDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      this.activityDelete(paramIds)
    },
    activityDelete(record) {
      activityDelete(record).then(res => {
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
    onChangeactiveDt(date, dateString) {
      this.activeDtDateString = dateString
    },
    /**
     * 批量导出
     */
    batchExport() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { id: d }
      })
      activityExport(paramIds).then(res => {
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
