<template>
  <a-modal
    title="新增订单退款信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="订单编号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入订单编号" v-decorator="['orderId', {rules: [{required: true, message: '请输入订单编号！'}]}]" />
        </a-form-item>
        <a-form-item
          label="申请用户"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入申请用户" v-decorator="['applyUserId', {rules: [{required: true, message: '请输入申请用户！'}]}]" />
        </a-form-item>
        <a-form-item
          label="申请时间"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-date-picker style="width: 100%" placeholder="请选择申请时间" v-decorator="['applyTime',{rules: [{ required: true, message: '请选择申请时间！' }]}]" @change="applyTimeOnChange"/>
        </a-form-item>
        <a-form-item
          label="退款原因"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入退款原因" v-decorator="['refundReason', {rules: [{required: true, message: '请输入退款原因！'}]}]" />
        </a-form-item>
        <a-form-item
          label="审批时间"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-date-picker style="width: 100%" placeholder="请选择审批时间" v-decorator="['approvalTime',{rules: [{ required: true, message: '请选择审批时间！' }]}]" @change="approvalTimeOnChange"/>
        </a-form-item>
        <a-form-item
          label="审批用户"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入审批用户" v-decorator="['approvalUserId', {rules: [{required: true, message: '请输入审批用户！'}]}]" />
        </a-form-item>
        <a-form-item
          label="审批备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入审批备注" v-decorator="['approvalRemark', {rules: [{required: true, message: '请输入审批备注！'}]}]" />
        </a-form-item>
        <a-form-item
          label="审批状态 （0-待审批 1-同意 2-拒绝）"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input-number placeholder="请输入审批状态 （0-待审批 1-同意 2-拒绝）" style="width: 100%" v-decorator="['approvalStatus', {rules: [{required: true, message: '请输入审批状态 （0-待审批 1-同意 2-拒绝）！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { orderRefundInfoAdd } from '@/api/modular/main/OrderRefundInfo/orderRefundInfoManage'
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
        applyTimeDateString: '',
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
            values.applyTime = this.applyTimeDateString || null
            values.approvalTime = this.approvalTimeDateString || null
            orderRefundInfoAdd(values).then((res) => {
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
      applyTimeOnChange(date, dateString) {
        this.applyTimeDateString = dateString
      },
      approvalTimeOnChange(date, dateString) {
        this.approvalTimeDateString = dateString
      },
      handleCancel () {
        this.applyTimeDateString =''
        this.form.getFieldDecorator('applyTime', { initialValue: null })
        this.approvalTimeDateString =''
        this.form.getFieldDecorator('approvalTime', { initialValue: null })
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
