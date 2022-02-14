<template>
  <a-modal
    title="编辑热门城市"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="城市" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入城市"
            v-decorator="['city', { rules: [{ required: true, message: '请输入城市！' }] }]"
          />
        </a-form-item>
        <a-form-item v-show="false"><a-input v-decorator="['id']"/></a-form-item>
        <a-form-item label="图片" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            :action="`${BASE_URL}/sysFileInfo/upload`"
            listType="picture-card"
            :headers="{
              Authorization: Authorization
            }"
            v-decorator="[
              'picId',
              {
                rules: [{ required: true, message: '请上传图片' }],
                initialValue: fileList,
                valuePropName: 'fileList',
                getValueFromEvent: normFiles
              }
            ]"
          >
            <div v-if="fileList.length < 1 && uploadingFile == false">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
            <img v-else-if="url" :src="url" alt="" />
          </a-upload>
        </a-form-item>
        <a-form-item label="热度分" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入热度分"
            v-decorator="['point', { rules: [{ required: true, message: '请输入热度分！' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { hotCityEdit } from '@/api/modular/main/hotcity/hotCityManage'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const token = Vue.ls.get(ACCESS_TOKEN)
export default {
  data() {
    return {
      BASE_URL: process.env.VUE_APP_API_BASE_URL,
      url: '',
      fileList: [],
      uploadingFile: false,
      Authorization: 'Bearer ' + token,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
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
        this.url = ''
        this.uploadingFile = false
      }
      return e && e.fileList
    },
    // 初始化方法
    edit(record) {
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue({
          city: record.city,
          id: record.id,
          point: record.point
        })
        this.fileList = [record.picId]
        this.url = `${this.BASE_URL}/sysFileInfo/preview?id=${record.picId}`
      }, 100)
    },
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
            picId: this.fileList[0]
          }
          hotCityEdit(parmas)
            .then(res => {
              if (res.success) {
                this.$message.success('编辑成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('编辑失败') //  + res.message
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
      this.visible = false
    }
  }
}
</script>
