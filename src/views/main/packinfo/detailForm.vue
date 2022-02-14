<template>
  <a-modal
    title="文件信息详情"
    :footer="null"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="关联民宿" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                disabled
                @change="onchange"
                placeholder="请选择关联民宿"
                v-decorator="['bnbId', { rules: [{ required: true, message: '请选择关联民宿！' }] }]"
              >
                <a-select-option v-for="item in roomList" :key="item.id" :value="item.id">{{
                  item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="关联分类" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                disabled
                placeholder="请选择关联分类"
                v-decorator="['category', { rules: [{ required: true, message: '请选择关联分类！' }] }]"
              >
                <a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{
                  item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="关联房型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                disabled
                mode="multiple"
                placeholder="请选择关联房型"
                v-decorator="['fangxId', { rules: [{ required: true, message: '请选择关联房型' }] }]"
              >
                <a-select-option v-for="item in roomTypeList" :key="item.id" :value="item.id">{{
                  item.roomName
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24"> </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="主标题" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                disabled
                placeholder="请输入主标题"
                v-decorator="['mainTitle', { rules: [{ required: true, message: '请输入主标题！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="副标题" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                disabled
                placeholder="请输入副标题"
                v-decorator="['viceTitle', { rules: [{ required: true, message: '请输入副标题！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="商品状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                disabled
                placeholder="请选择商品状态"
                v-decorator="['status', { rules: [{ required: true, message: '请选择商品状态！' }] }]"
              >
                <!-- <a-select-option v-for="item in typeDictTypeDropDown" :key="item.id" :value="item.id">{{
              item.name
            }}</a-select-option> -->
                <a-select-option :key="1" :value="1">下架</a-select-option>
                <a-select-option :key="2" :value="2">上架</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="默认价格" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input-number
                disabled
                placeholder="请输入默认价格"
                style="width: 100%"
                v-decorator="['defaultPrice', { rules: [{ required: true, message: '请输入默认价格！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24"
            ><a-form-item label="默认库存" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input-number
                disabled
                placeholder="请输入默认库存"
                style="width: 100%"
                v-decorator="['defaultStock', { rules: [{ required: true, message: '请输入默认库存！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"
            ><a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                disabled
                placeholder="请输入描述"
                v-decorator="['description', { rules: [{ required: true, message: '请输入描述！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="包含设备" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                disabled
                mode="multiple"
                placeholder="请选择设备"
                v-decorator="['facilities', { rules: [{ required: true, message: '请选择设备！' }] }]"
              >
                <a-select-option v-for="item in facilities" :key="item.id" :value="item.id">{{
                  item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="热点城市" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                disabled
                placeholder="请选择热点城市"
                v-decorator="['hotPoint', { rules: [{ required: true, message: '请选择热点城市！' }] }]"
              >
                <a-select-option v-for="item in hotCity" :key="item.id" :value="item.id">{{
                  item.city
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="销量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                disabled
                placeholder="请输入销量"
                v-decorator="['saleAmt', { rules: [{ required: true, message: '请输入销量！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="VR" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                disabled
                placeholder="请输入VR"
                v-decorator="['vr', { rules: [{ required: true, message: '请输入VR！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="主图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <img style="width: 200px;height:auto" :src="url" alt="" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="图文描述图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <img style="width: 200px;height:auto" :src="url2" alt="" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="商品包含图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <img style="width: 200px;height:auto" :src="url3" alt="" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="购买须知图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <img style="width: 200px;height:auto" :src="url4" alt="" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="使用说明图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <img style="width: 200px;height:auto" :src="url5" alt="" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"> </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { packInfoDetail } from '@/api/modular/main/packinfo/packInfoManage'
import { roomInfoPage } from '@/api/modular/main/RoomInfo/roomInfoManage'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const token = Vue.ls.get(ACCESS_TOKEN)
export default {
  data() {
    return {
      BASE_URL: process.env.VUE_APP_API_BASE_URL,
      Authorization: 'Bearer ' + token,
      fileList: [],
      uploadingFile: false,
      fileList2: [],
      uploadingFile2: false,
      fileList3: [],
      uploadingFile3: false,
      fileList4: [],
      uploadingFile4: false,
      fileList5: [],
      uploadingFile5: false,
      url: '',
      url2: '',
      url3: '',
      url4: '',
      url5: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      fileDetail: {},
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    roomList: {
      type: Array
    },
    typeList: {
      type: Array
    },
    facilities: {
      type: Array
    },
    typeDictTypeDropDown: {
      type: Array
    },
    hotCity: {
      type: Array
    }
  },
  methods: {
    // 初始化方法
    detail(record) {
      this.visible = true
      packInfoDetail({ id: record.id }).then(res => {
        roomInfoPage({ bnbId: record.bnbId }).then(res => {
          this.roomTypeList = res.data.rows || []
          let facilities = record.facilities.split(',')
          facilities = facilities.map(item => Number(item))
          setTimeout(() => {
            this.form.setFieldsValue({
              fangxId: record.fangxId,
              bnbId: record.bnbId,
              category: record.category,
              defaultPrice: record.defaultPrice,
              defaultStock: record.defaultStock,
              description: record.description,
              facilities,
              hotPoint: record.hotPoint,
              id: record.id,
              mainTitle: record.mainTitle,
              picId: record.picId,
              saleAmt: record.saleAmt,
              viceTitle: record.viceTitle,
              status: record.status,
              vr: record.vr
            })
          }, 100)
          this.url = `${this.BASE_URL}/sysFileInfo/preview?id=${record.picId}`
          this.url2 = `${this.BASE_URL}/sysFileInfo/preview?id=${record.graphicDescId}`
          this.url3 = `${this.BASE_URL}/sysFileInfo/preview?id=${record.productContentId}`
          this.url4 = `${this.BASE_URL}/sysFileInfo/preview?id=${record.purchaseNotesId}`
          this.url5 = `${this.BASE_URL}/sysFileInfo/preview?id=${record.useExplanationId}`
        })
      })
    },
    handleCancel() {
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
