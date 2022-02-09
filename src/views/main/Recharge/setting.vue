<template>
  <a-modal
    title="充值审核"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="充值状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-radio-group v-decorator="['status', { rules: [{ required: true, message: '请选择状态！' }] }]">
            <a-radio :value="2">通过</a-radio>
            <a-radio :value="3">拒绝</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="充值截图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <img style="width:200px;height:200px" :src="fileUrl" alt="" />
        </a-form-item>
        <a-form-item label="审批备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入审批备注" v-decorator="['approvalRemark']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { rechargeApproval } from '@/api/modular/main/Recharge/rechargeManage'
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileUrl: '',
      batchFileList: [],
      uploadingFile: false,
      labelCol: {
        xs: { span: 3 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 3 },
        sm: { span: 16 }
      },
      record: {},
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
    // 初始化方法
    edit(record) {
      this.visible = true
      setTimeout(() => {
        // this.form.setFieldsValue({ ...record })
        this.record = record
        this.fileUrl = process.env.VUE_APP_API_BASE_URL + '/sysFileInfo/preview?id=' + record.rechargeImg
      }, 100)
    },

    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          rechargeApproval({ ...this.record, ...values })
            .then(res => {
              if (res.success) {
                this.$message.success('审核通过')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
                this.form.resetFields()
              } else {
                this.$message.error('操作失败：' + res.message)
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
