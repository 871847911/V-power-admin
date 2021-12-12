<template>
  <a-modal
    title="新增民宿"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="民宿名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入民宿名称"
            v-decorator="['name', { rules: [{ required: true, message: '请输入民宿名称！' }] }]"
          />
        </a-form-item>
        <a-form-item label="民宿地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入民宿名称"
            v-decorator="['address', { rules: [{ required: true, message: '请输入民宿地址！' }] }]"
          />
        </a-form-item>

        <a-form-item label="负责人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入负责人"
            v-decorator="['user', { rules: [{ required: true, message: '请输入负责人！' }] }]"
          />
        </a-form-item>

        <a-form-item label="联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入联系方式"
            v-decorator="['phone', { rules: [{ required: true, message: '请输入联系方式！' }] }]"
          />
        </a-form-item>
        <a-form-item label="民宿封面" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            @preview="handlePreview"
            v-decorator="[
              'headImage',
              {
                rules: [{ required: true, message: '请上传身份证正反面' }],
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
          </a-upload>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-textarea :rows="4" placeholder="请输入备注" v-decorator="['remark']"></a-textarea>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { sysPosAdd } from '@/api/modular/system/posManage'
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileUrl: [],
      batchFileList: [],
      uploadingFile: false,
      labelCol: {
        xs: { span: 2 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 2 },
        sm: { span: 14 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
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
        this.fileList.push(e.file.response)
        this.uploadingFile = false
      }
      return e && e.fileList
    },
    // 初始化方法
    add(record) {
      this.visible = true
    },

    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          sysPosAdd(values)
            .then(res => {
              if (res.success) {
                this.$message.success('新增成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
                this.form.resetFields()
              } else {
                this.$message.error('新增失败：' + res.message)
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
      this.previewVisible = false
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
