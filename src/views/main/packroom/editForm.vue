<template>
  <a-modal
    title="编辑套餐房型关联信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-show="false"><a-input v-decorator="['id']"/></a-form-item>
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
        <a-form-item label="房型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-select
            placeholder="请选择房型"
            v-decorator="['roomId', { rules: [{ required: true, message: '请选择房型！' }] }]"
          >
            <a-select-option v-for="item in roomTypeList" :key="item.id" :value="item.id">{{
              item.roomName
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { packRoomEdit } from '@/api/modular/main/packroom/packRoomManage'
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
      form: this.$form.createForm(this)
    }
  },
  props: {
    roomTypeList: {
      type: Array
    },
    packIList: {
      type: Array
    }
  },
  methods: {
    // 初始化方法
    edit(record) {
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue({
          id: record.id,
          packId: record.packId,
          roomId: record.roomId
        })
      }, 100)
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
          packRoomEdit(values)
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
    handleCancel() {
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
