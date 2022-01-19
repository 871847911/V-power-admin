<template>
  <a-modal
    title="编辑活动信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="活动日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-date-picker style="width: 100%" placeholder="请选择活动日期" v-decorator="['activeDt',{rules: [{ required: true, message: '请选择活动日期！' }]}]" @change="activeDtOnChange"/>
        </a-form-item>
        <a-form-item
          label="民宿id"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入民宿id" v-decorator="['bnbId', {rules: [{required: true, message: '请输入民宿id！'}]}]" />
        </a-form-item>
        <a-form-item
          label="有效结束日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-date-picker style="width: 100%" placeholder="请选择有效结束日期" v-decorator="['endDt',{rules: [{ required: true, message: '请选择有效结束日期！' }]}]" @change="endDtOnChange"/>
        </a-form-item>
        <a-form-item v-show="false"><a-input v-decorator="['id']" /></a-form-item>
        <a-form-item
          label="主标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入主标题" v-decorator="['mainTitle', {rules: [{required: true, message: '请输入主标题！'}]}]" />
        </a-form-item>
        <a-form-item
          label="原价/抵扣价"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input-number placeholder="请输入原价/抵扣价" style="width: 100%" v-decorator="['originalPrice']" />
        </a-form-item>
        <a-form-item
          label="套餐id"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入套餐id" v-decorator="['packId', {rules: [{required: true, message: '请输入套餐id！'}]}]" />
        </a-form-item>
        <a-form-item
          label="主图id"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入主图id" v-decorator="['picId', {rules: [{required: true, message: '请输入主图id！'}]}]" />
        </a-form-item>
        <a-form-item
          label="活动价格"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input-number placeholder="请输入活动价格" style="width: 100%" v-decorator="['price', {rules: [{required: true, message: '请输入活动价格！'}]}]" />
        </a-form-item>
        <a-form-item
          label="预约金价格"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input-number placeholder="请输入预约金价格" style="width: 100%" v-decorator="['reservationPrice', {rules: [{required: true, message: '请输入预约金价格！'}]}]" />
        </a-form-item>
        <a-form-item
          label="膨胀比例"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入膨胀比例" v-decorator="['scale', {rules: [{required: true, message: '请输入膨胀比例！'}]}]" />
        </a-form-item>
        <a-form-item
          label="销量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入销量" v-decorator="['sellAmt']" />
        </a-form-item>
        <a-form-item
          label="有效开始日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-date-picker style="width: 100%" placeholder="请选择有效开始日期" v-decorator="['startDt',{rules: [{ required: true, message: '请选择有效开始日期！' }]}]" @change="startDtOnChange"/>
        </a-form-item>
        <a-form-item
          label="库存"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入库存" v-decorator="['stock']" />
        </a-form-item>
        <a-form-item
          label="副标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入副标题" v-decorator="['viceTitle']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import { activityEdit } from '@/api/modular/main/Activity/activityManage'
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
        activeDtDateString: '',
        endDtDateString: '',
        startDtDateString: '',
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
              bnbId: record.bnbId,
              id: record.id,
              mainTitle: record.mainTitle,
              originalPrice: record.originalPrice,
              packId: record.packId,
              picId: record.picId,
              price: record.price,
              reservationPrice: record.reservationPrice,
              scale: record.scale,
              sellAmt: record.sellAmt,
              stock: record.stock,
              viceTitle: record.viceTitle
            }
          )
        }, 100)
        // 时间单独处理
        if (record.activeDt) {
            this.form.getFieldDecorator('activeDt', { initialValue: moment(record.activeDt, 'YYYY-MM-DD') })
            this.activeDtDateString = moment(record.activeDt).format('YYYY-MM-DD')
        }
        // 时间单独处理
        if (record.endDt) {
            this.form.getFieldDecorator('endDt', { initialValue: moment(record.endDt, 'YYYY-MM-DD') })
            this.endDtDateString = moment(record.endDt).format('YYYY-MM-DD')
        }
        // 时间单独处理
        if (record.startDt) {
            this.form.getFieldDecorator('startDt', { initialValue: moment(record.startDt, 'YYYY-MM-DD') })
            this.startDtDateString = moment(record.startDt).format('YYYY-MM-DD')
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
            values.activeDt = this.activeDtDateString || null
            values.endDt = this.endDtDateString || null
            values.startDt = this.startDtDateString || null
            activityEdit(values).then((res) => {
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
      activeDtOnChange(date, dateString) {
        this.activeDtDateString = dateString
      },
      endDtOnChange(date, dateString) {
        this.endDtDateString = dateString
      },
      startDtOnChange(date, dateString) {
        this.startDtDateString = dateString
      },
      handleCancel () {
        this.activeDtDateString =''
        this.form.getFieldDecorator('activeDt', { initialValue: null })
        this.endDtDateString =''
        this.form.getFieldDecorator('endDt', { initialValue: null })
        this.startDtDateString =''
        this.form.getFieldDecorator('startDt', { initialValue: null })
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
