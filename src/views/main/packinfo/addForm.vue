<template>
  <a-modal
    title="新增套餐信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="关联民宿" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
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
                allowClear
                placeholder="请选择关联分类"
                v-decorator="['category', { rules: [{ required: false, message: '请选择关联分类！' }] }]"
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
          <a-col :md="12" :sm="24">
            <a-form-item label="跨天数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input-number
                placeholder="请输入跨天数"
                style="width: 100%"
                v-decorator="['dayCount', { rules: [{ required: true, message: '请输入跨天数！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-form-item
            label="主标题"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 4 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 19 }
            }"
            has-feedback
          >
            <a-input
              placeholder="请输入主标题"
              v-decorator="['mainTitle', { rules: [{ required: true, message: '请输入主标题！' }] }]"
            />
          </a-form-item>
        </a-row>
        <a-row :gutter="24">
          <a-form-item
            label="副标题"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 4 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 19 }
            }"
            has-feedback
          >
            <a-input
              placeholder="请输入副标题"
              v-decorator="['viceTitle', { rules: [{ required: true, message: '请输入副标题！' }] }]"
            />
          </a-form-item>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24"
            ><a-form-item label="套餐开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                style="width: 100%"
                placeholder="请选择套餐开始时间"
                v-decorator="['startTime', { rules: [{ required: true, message: '请选择套餐开始时间！' }] }]"
                @change="startDtOnChange"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"
            ><a-form-item label="套餐结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                style="width: 100%"
                placeholder="请选择套餐结束时间"
                v-decorator="['endTime', { rules: [{ required: true, message: '请选择套餐结束时间！' }] }]"
                @change="endDtOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24"
            ><a-form-item label="券开始时间	" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                style="width: 100%"
                placeholder="请选择券开始时间	"
                v-decorator="['couponStartTime', { rules: [{ required: true, message: '请选择券开始时间	！' }] }]"
                @change="exclusiveStartDtChange"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"
            ><a-form-item label="券结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                style="width: 100%"
                placeholder="请选择券结束时间"
                v-decorator="['couponEndTime', { rules: [{ required: true, message: '请选择券结束时间	！' }] }]"
                @change="exclusiveEndDtOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="商品状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
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
                placeholder="请输入默认库存"
                style="width: 100%"
                v-decorator="['defaultStock', { rules: [{ required: true, message: '请输入默认库存！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"
            ><a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
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
                placeholder="请输入销量"
                v-decorator="['saleAmt', { rules: [{ required: true, message: '请输入销量！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="VR" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入VR"
                v-decorator="['vr', { rules: [{ required: true, message: '请输入VR！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="订单必读" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入订单必读"
                style="width: 100%"
                v-decorator="['orderMustRead', { rules: [{ required: true, message: '请输入订单必读	！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="主图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'picId',
                  {
                    rules: [{ required: true, message: '请上传主图' }],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFiles
                  }
                ]"
              >
                <div v-if="fileList.length < 1 && uploadingFile == false">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="图文描述图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'graphicDescId',
                  {
                    rules: [{ required: true, message: '请上传图文描述图' }],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFiles2
                  }
                ]"
              >
                <div v-if="fileList2.length < 1 && uploadingFile2 == false">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="商品包含图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'productContentId',
                  {
                    rules: [{ required: true, message: '请上传商品包含图' }],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFiles3
                  }
                ]"
              >
                <div v-if="fileList3.length < 1 && uploadingFile3 == false">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="购买须知图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'purchaseNotesId',
                  {
                    rules: [{ required: true, message: '请上传购买须知图' }],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFiles4
                  }
                ]"
              >
                <div v-if="fileList4.length < 1 && uploadingFile4 == false">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="使用说明图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'useExplanationId',
                  {
                    rules: [{ required: true, message: '请上传使用说明图' }],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFiles5
                  }
                ]"
              >
                <div v-if="fileList5.length < 1 && uploadingFile5 == false">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"> </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { packInfoAdd } from '@/api/modular/main/packinfo/packInfoManage'
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
      roomTypeList: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      endDtDateString: '',
      startDtDateString: '',
      exclusiveStartDt: '',
      exclusiveEndDt: ''
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
    endDtOnChange(date, dateString) {
      this.endDtDateString = dateString
    },
    startDtOnChange(date, dateString) {
      this.startDtDateString = dateString
    },
    exclusiveStartDtChange(date, dateString) {
      this.exclusiveStartDt = dateString
    },
    exclusiveEndDtOnChange(date, dateString) {
      this.exclusiveEndDt = dateString
    },
    // 初始化方法
    normFiles(e) {
      if (e.file.status === 'uploading') {
        this.uploadingFile = true
      }
      if (e.file.status === 'removed') {
        this.fileList = []
        this.uploadingFile = false
        return {} && []
      }
      if (e.file.status === 'done') {
        this.fileList.push(e.file.response.data)
        this.uploadingFile = false
      }
      return e && e.fileList
    },
    normFiles2(e) {
      if (e.file.status === 'uploading') {
        this.uploadingFile2 = true
      }
      if (e.file.status === 'removed') {
        this.fileList2 = []
        this.uploadingFile2 = false
        return {} && []
      }
      if (e.file.status === 'done') {
        this.fileList2.push(e.file.response.data)
        this.uploadingFile2 = false
      }
      return e && e.fileList
    },
    normFiles3(e) {
      if (e.file.status === 'uploading') {
        this.uploadingFile3 = true
      }
      if (e.file.status === 'removed') {
        this.fileList3 = []
        this.uploadingFile3 = false
        return {} && []
      }
      if (e.file.status === 'done') {
        this.fileList3.push(e.file.response.data)
        this.uploadingFile3 = false
      }
      return e && e.fileList
    },
    normFiles4(e) {
      if (e.file.status === 'uploading') {
        this.uploadingFile4 = true
      }
      if (e.file.status === 'removed') {
        this.fileList4 = []
        this.uploadingFile4 = false
        return {} && []
      }
      if (e.file.status === 'done') {
        this.fileList4.push(e.file.response.data)
        this.uploadingFile4 = false
      }
      return e && e.fileList
    },
    normFiles5(e) {
      if (e.file.status === 'uploading') {
        this.uploadingFile5 = true
      }
      if (e.file.status === 'removed') {
        this.fileList5 = []
        this.uploadingFile5 = false
        return {} && []
      }
      if (e.file.status === 'done') {
        this.fileList5.push(e.file.response.data)
        this.uploadingFile5 = false
      }
      return e && e.fileList
    },
    onchange(e) {
      this.roomTypeList = []
      roomInfoPage({ bnbId: e }).then(res => {
        this.roomTypeList = res.data.rows || []
      })
    },
    // 初始化方法
    add(record) {
      this.visible = true
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          for (const key in values) {
            if (typeof values[key] === 'object' && values[key] != null) {
              values[key] = JSON.stringify(values[key])
            }
          }
          const list = JSON.parse(values.fangxId) || []
          const packRoomParams = []
          list.map(item => {
            packRoomParams.push({ roomId: item })
          })
          values.endTime = this.endDtDateString || null
          values.startTime = this.startDtDateString || null
          values.couponStartTime = this.exclusiveStartDt || null
          values.couponEndTime = this.exclusiveEndDt || null
          const params = {
            ...values,
            facilities: JSON.parse(values.facilities).join(','),
            packRoomParams,
            picId: this.fileList[0],
            graphicDescId: this.fileList2[0],
            productContentId: this.fileList3[0],
            purchaseNotesId: this.fileList4[0],
            useExplanationId: this.fileList5[0]
          }
          packInfoAdd(params)
            .then(res => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败') // + res.message
              }
            })
            .finally(res => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.form.resetFields()
      this.fileList = []
      this.fileList2 = []
      this.fileList3 = []
      this.fileList4 = []
      this.fileList5 = []
      this.visible = false
      this.form.getFieldDecorator('endTime', { initialValue: null })
      this.startDtDateString = ''
      this.form.getFieldDecorator('startTime', { initialValue: null })
      this.exclusiveStartDt = ''
      this.form.getFieldDecorator('couponStartTime', { initialValue: null })
      this.exclusiveEndDt = ''
      this.form.getFieldDecorator('couponEndTime', { initialValue: null })
      this.form.resetFields()
    }
  }
}
</script>
