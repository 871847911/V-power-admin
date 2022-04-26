<template>
  <a-modal
    title="编辑订单退款信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-show="false"><a-input v-decorator="['id']" /></a-form-item>
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
  import moment from 'moment'
  import { orderRefundInfoEdit } from '@/api/modular/main/OrderRefundInfo/orderRefundInfoManage'
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
      moment,
      // 初始化方法
      edit (record) {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              id: record.id,
              orderId: record.orderId,
              applyUserId: record.applyUserId,
              refundReason: record.refundReason,
              approvalUserId: record.approvalUserId,
              approvalRemark: record.approvalRemark,
              approvalStatus: record.approvalStatus
            }
          )
        }, 100)
        // 时间单独处理
        if (record.applyTime) {
            this.form.getFieldDecorator('applyTime', { initialValue: moment(record.applyTime, 'YYYY-MM-DD') })
            this.applyTimeDateString = moment(record.applyTime).format('YYYY-MM-DD')
        }
        // 时间单独处理
        if (record.approvalTime) {
            this.form.getFieldDecorator('approvalTime', { initialValue: moment(record.approvalTime, 'YYYY-MM-DD') })
            this.approvalTimeDateString = moment(record.approvalTime).format('YYYY-MM-DD')
        }
      },
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
            orderRefundInfoEdit(values).then((res) => {
              if (res.success) {
                this.$message.success('编辑成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('编辑失败')//  + res.message
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
