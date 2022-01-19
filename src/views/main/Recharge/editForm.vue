<template>
  <a-modal
    title="编辑充值记录"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="帐户" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入帐户" v-decorator="['account']" />
        </a-form-item>
        <a-form-item label="金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number
            placeholder="请输入金额"
            style="width: 100%"
            v-decorator="['amount', { rules: [{ required: true, message: '请输入金额！' }] }]"
          />
        </a-form-item>
        <a-form-item label="审批备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入审批备注" v-decorator="['approvalRemark']" />
        </a-form-item>
        <a-form-item label="审批时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker
            style="width: 100%"
            placeholder="请选择审批时间"
            v-decorator="['approvalTime']"
            @change="approvalTimeOnChange"
          />
        </a-form-item>
        <a-form-item label="审批人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入审批人" v-decorator="['approvalUser']" />
        </a-form-item>
        <a-form-item v-show="false"><a-input v-decorator="['id']"/></a-form-item>
        <a-form-item label="充值截图" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入充值截图"
            v-decorator="['rechargeImg', { rules: [{ required: true, message: '请输入充值截图！' }] }]"
          />
        </a-form-item>
        <a-form-item label="充值人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入充值人" v-decorator="['rechargeUser']" />
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备注" v-decorator="['remark']" />
        </a-form-item>
        <a-form-item label="充值状态 1-待审批 2-通过 3-拒绝" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入充值状态 1-待审批 2-通过 3-拒绝" v-decorator="['status']" />
        </a-form-item>
        <a-form-item label="户名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入户名" v-decorator="['userName']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { rechargeEdit } from '@/api/modular/main/Recharge/rechargeManage'
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
      approvalTimeDateString: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
    // 初始化方法
    edit(record) {
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue({
          account: record.account,
          amount: record.amount,
          approvalRemark: record.approvalRemark,
          approvalUser: record.approvalUser,
          id: record.id,
          rechargeImg: record.rechargeImg,
          rechargeUser: record.rechargeUser,
          remark: record.remark,
          status: record.status,
          userName: record.userName
        })
      }, 100)
      // 时间单独处理
      if (record.approvalTime) {
        this.form.getFieldDecorator('approvalTime', { initialValue: moment(record.approvalTime, 'YYYY-MM-DD') })
        this.approvalTimeDateString = moment(record.approvalTime).format('YYYY-MM-DD')
      }
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
          values.approvalTime = this.approvalTimeDateString || null
          rechargeEdit(values)
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
    approvalTimeOnChange(date, dateString) {
      this.approvalTimeDateString = dateString
    },
    handleCancel() {
      this.approvalTimeDateString = ''
      this.form.getFieldDecorator('approvalTime', { initialValue: null })
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
