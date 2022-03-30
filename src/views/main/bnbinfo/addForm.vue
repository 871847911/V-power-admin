<template>
  <a-modal
    title="新增民宿基本信息"
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
            <a-form-item label="民宿名字" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入民宿名字"
                v-decorator="['name', { rules: [{ required: true, message: '请输入民宿名字！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="关联用户" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择用户"
                v-decorator="['userId', { rules: [{ required: true, message: '请选择关联用户！' }] }]"
              >
                <a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
                  item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="负责人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入负责人"
                v-decorator="['principal', { rules: [{ required: true, message: '请输入负责人！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="国家" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入国家"
                v-decorator="['country', { rules: [{ required: true, message: '请输入国家！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="省份" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入省份"
                v-decorator="['province', { rules: [{ required: true, message: '请输入省份！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="城市" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入城市"
                v-decorator="['city', { rules: [{ required: true, message: '请输入城市！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="区或县" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入区或县"
                v-decorator="['district', { rules: [{ required: true, message: '请输入区或县！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="镇/街道" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入镇/街道" v-decorator="['town']" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="区块" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入区块（如：港澳台、江浙沪)"
                v-decorator="['block', { rules: [{ required: true, message: '请输入区块（如：港澳台、江浙沪）！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="具体地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入具体地址"
                v-decorator="['address', { rules: [{ required: true, message: '请输入具体地址！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入纬度" v-decorator="['lat']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入经度" v-decorator="['lng']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="VR" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入VR" v-decorator="['vr']" /> </a-form-item
          ></a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入描述" v-decorator="['description']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入联系电话"
                v-decorator="['tel', { rules: [{ required: true, message: '请输入联系电话！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"> </a-col>
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
            <a-form-item label="营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'businessLicense',
                  {
                    rules: [{ required: true, message: '请上传营业执照' }],
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
            <a-form-item label="食品经营许可证" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'foodBusinessLicense',
                  {
                    rules: [{ required: true, message: '请上传食品经营许可证' }],
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
            <a-form-item label="身份证-正面" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'idCardFront',
                  {
                    rules: [{ required: true, message: '请上传身份证-正面' }],
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
            </a-form-item></a-col
          >
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="身份证-反面" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'idCardBack',
                  {
                    rules: [{ required: true, message: '请上传身份证-反面' }],
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
          <a-col :md="12" :sm="24">
            <a-form-item label="特种行业许可证" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-upload
                :action="`${BASE_URL}/sysFileInfo/upload`"
                listType="picture-card"
                :headers="{
                  Authorization: Authorization
                }"
                v-decorator="[
                  'specialBusinessLicense',
                  {
                    rules: [{ required: true, message: '请上传特种行业许可证' }],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFiles6
                  }
                ]"
              >
                <div v-if="fileList6.length < 1 && uploadingFile6 == false">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { bnbInfoAdd } from '@/api/modular/main/bnbinfo/bnbInfoManage'
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
      fileList6: [],
      uploadingFile6: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    userList: {
      type: Array
    }
  },
  methods: {
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
    normFiles6(e) {
      if (e.file.status === 'uploading') {
        this.uploadingFile6 = true
      }
      if (e.file.status === 'removed') {
        this.fileList6 = []
        this.uploadingFile6 = false
        return {} && []
      }
      if (e.file.status === 'done') {
        this.fileList6.push(e.file.response.data)
        this.uploadingFile6 = false
      }
      return e && e.fileList
    },
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
          const parmas = {
            ...values,
            picId: this.fileList[0],
            businessLicense: this.fileList2[0],
            foodBusinessLicense: this.fileList3[0],
            idCardFront: this.fileList4[0],
            idCardBack: this.fileList5[0],
            specialBusinessLicense: this.fileList6[0]
          }
          bnbInfoAdd(parmas)
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
      this.fileList6 = []
      this.visible = false
    }
  }
}
</script>
