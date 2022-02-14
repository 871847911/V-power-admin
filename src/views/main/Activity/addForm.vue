<template>
  <a-modal
    title="新增活动信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="活动时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker
            show-time
            style="width: 100%"
            placeholder="请选择活动时间"
            v-decorator="['activeDt', { rules: [{ required: true, message: '请选择活动时间！' }] }]"
            @change="activeDtOnChange"
          />
        </a-form-item>
        <a-form-item label="关联民宿" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-select
            placeholder="请选择关联民宿"
            v-decorator="['bnbId', { rules: [{ required: true, message: '请选择关联民宿！' }] }]"
          >
            <a-select-option v-for="item in roomList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="有效开始日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker
            style="width: 100%"
            placeholder="请选择有效开始日期"
            v-decorator="['startDt', { rules: [{ required: true, message: '请选择有效开始日期！' }] }]"
            @change="startDtOnChange"
          />
        </a-form-item>
        <a-form-item label="有效结束日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker
            style="width: 100%"
            placeholder="请选择有效结束日期"
            v-decorator="['endDt', { rules: [{ required: true, message: '请选择有效结束日期！' }] }]"
            @change="endDtOnChange"
          />
        </a-form-item>
        <a-form-item label="主标题" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入主标题"
            v-decorator="['mainTitle', { rules: [{ required: true, message: '请输入主标题！' }] }]"
          />
        </a-form-item>
        <a-form-item label="原价/抵扣价" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入原价/抵扣价" style="width: 100%" v-decorator="['originalPrice']" />
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
        <a-form-item label="主图id" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入主图id"
            v-decorator="['picId', { rules: [{ required: true, message: '请输入主图id！' }] }]"
          />
        </a-form-item>
        <a-form-item label="活动价格" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number
            placeholder="请输入活动价格"
            style="width: 100%"
            v-decorator="['price', { rules: [{ required: true, message: '请输入活动价格！' }] }]"
          />
        </a-form-item>
        <a-form-item label="预约金价格" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number
            placeholder="请输入预约金价格"
            style="width: 100%"
            v-decorator="['reservationPrice', { rules: [{ required: true, message: '请输入预约金价格！' }] }]"
          />
        </a-form-item>
        <a-form-item label="膨胀比例" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入膨胀比例"
            v-decorator="['scale', { rules: [{ required: true, message: '请输入膨胀比例！' }] }]"
          />
        </a-form-item>
        <a-form-item label="销量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入销量" v-decorator="['sellAmt']" />
        </a-form-item>

        <a-form-item label="库存" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入库存" v-decorator="['stock']" />
        </a-form-item>
        <a-form-item label="副标题" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入副标题" v-decorator="['viceTitle']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { activityAdd } from '@/api/modular/main/Activity/activityManage'
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
      activeDtDateString: '',
      endDtDateString: '',
      startDtDateString: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    roomList: {
      type: Array
    },
    packIList: {
      type: Array
    }
  },
  methods: {
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
          values.activeDt = this.activeDtDateString || null
          values.endDt = this.endDtDateString || null
          values.startDt = this.startDtDateString || null
          activityAdd(values)
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
    activeDtOnChange(date, dateString) {
      this.activeDtDateString = dateString
    },
    endDtOnChange(date, dateString) {
      this.endDtDateString = dateString
    },
    startDtOnChange(date, dateString) {
      this.startDtDateString = dateString
    },
    handleCancel() {
      this.activeDtDateString = ''
      this.form.getFieldDecorator('activeDt', { initialValue: null })
      this.endDtDateString = ''
      this.form.getFieldDecorator('endDt', { initialValue: null })
      this.startDtDateString = ''
      this.form.getFieldDecorator('startDt', { initialValue: null })
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
