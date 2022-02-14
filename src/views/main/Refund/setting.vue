<template>
  <a-modal
    title="退款审核"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="退款状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-radio-group v-decorator="['status', { rules: [{ required: true, message: '请选择状态！' }] }]">
            <a-radio :value="2">通过</a-radio>
            <a-radio :value="3">拒绝</a-radio>
            <a-radio :value="4">已打款</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="退款人账号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <div>{{ record.account }}</div>
        </a-form-item>
        <a-form-item label="退款人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <div>{{ record.userName }}</div>
        </a-form-item>
        <a-form-item label="退款金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <div>{{ record.amount }}</div>
        </a-form-item>
        <a-form-item label="退款备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <div>{{ record.remark }}</div>
        </a-form-item>
        <a-form-item label="审批备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入审批备注" v-decorator="['approvalRemark']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { refundApproval } from '@/api/modular/main/Refund/refundManage'
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
          refundApproval({ ...this.record, ...values })
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
