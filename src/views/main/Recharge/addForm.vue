<template>
  <a-modal
    title="新增充值记录"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="帐户"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入帐户" v-decorator="['account']" />
        </a-form-item>
        <a-form-item
          label="金额"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input-number placeholder="请输入金额" style="width: 100%" v-decorator="['amount', {rules: [{required: true, message: '请输入金额！'}]}]" />
        </a-form-item>
        <a-form-item
          label="审批备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入审批备注" v-decorator="['approvalRemark']" />
        </a-form-item>
        <a-form-item
          label="审批时间"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-date-picker style="width: 100%" placeholder="请选择审批时间" v-decorator="['approvalTime']" @change="approvalTimeOnChange"/>
        </a-form-item>
        <a-form-item
          label="审批人"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入审批人" v-decorator="['approvalUser']" />
        </a-form-item>
        <a-form-item
          label="充值截图"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入充值截图" v-decorator="['rechargeImg', {rules: [{required: true, message: '请输入充值截图！'}]}]" />
        </a-form-item>
        <a-form-item
          label="充值人"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入充值人" v-decorator="['rechargeUser']" />
        </a-form-item>
        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入备注" v-decorator="['remark']" />
        </a-form-item>
        <a-form-item
          label="充值状态 1-待审批 2-通过 3-拒绝"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入充值状态 1-待审批 2-通过 3-拒绝" v-decorator="['status']" />
        </a-form-item>
        <a-form-item
          label="户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入户名" v-decorator="['userName']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { rechargeAdd } from '@/api/modular/main/Recharge/rechargeManage'
  export default {
    data () {
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
      // 初始化方法
      add (record) {
        this.visible = true
      },
      /**
       * 提交表单
       */
      handleSubmit () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            for (const key in values) {
              if (typeof (values[key]) === 'object' && values[key] != null) {
                values[key] = JSON.stringify(values[key])
              }
            }
            values.approvalTime = this.approvalTimeDateString || null
            rechargeAdd(values).then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败')// + res.message
              }
            }).finally((res) => {
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
      handleCancel () {
        this.approvalTimeDateString =''
        this.form.getFieldDecorator('approvalTime', { initialValue: null })
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
