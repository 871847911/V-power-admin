<template>
  <a-modal
    title="新增轮播图管理"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="图片" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            :action="`${BASE_URL}/sysFileInfo/upload`"
            listType="picture-card"
            :headers="{
              Authorization: Authorization
            }"
            v-decorator="[
              'imgId',
              {
                rules: [{ required: true, message: '请上传图片' }],
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
        <a-form-item label="套餐" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-select
            placeholder="请选择套餐"
            v-decorator="['packId', { rules: [{ required: true, message: '请选择套餐！' }] }]"
          >
            <a-select-option v-for="item in packIList" :key="item.id" :value="item.id">{{
              item.mainTitle
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { bannerAdd } from '@/api/modular/main/banner/bannerManage'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const token = Vue.ls.get(ACCESS_TOKEN)
export default {
  data() {
    return {
      BASE_URL: process.env.VUE_APP_API_BASE_URL,
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
  props: {
    roomTypeList: {
      type: Array
    },
    packIList: {
      type: Array
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
        this.uploadingFile = false
      }
      return e && e.fileList
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
          const parmas = {
            packId: values.packId,
            imgId: this.fileList[0]
          }
          console.log(parmas)
          bannerAdd(parmas)
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
      this.fileList = []
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
