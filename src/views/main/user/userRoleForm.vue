<template>
  <a-modal
    title="余额初始化"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="保证金额度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入保证金额度"
            v-decorator="['bailVal', { rules: [{ required: true, message: '请输入保证金额度！' }] }]"
          />
        </a-form-item>
        <a-form-item label="金米粒额度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入金米粒额度"
            v-decorator="['goldVal', { rules: [{ required: true, message: '请输入金米粒额度！' }] }]"
          />
        </a-form-item>
        <a-form-item label="房费额度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入房费额度"
            v-decorator="['roomRateVal', { rules: [{ required: true, message: '请输入房费额度！' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { initializeBalance } from '@/api/modular/main/user/userManage'
export default {
  data() {
    return {
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
      form: this.$form.createForm(this),
      record: {}
    }
  },
  methods: {
    // 初始化方法
    userRole(record) {
      this.visible = true
      this.record = record
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
          initializeBalance({ ...values, userId: this.record.id })
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
      this.visible = false
    }
  }
}
</script>
