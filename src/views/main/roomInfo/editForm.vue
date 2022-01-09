<template>
  <a-modal
    title="编辑房型信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="增项费用" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入增项费用"
            v-decorator="['addPrice', { rules: [{ required: true, message: '请输入增项费用！' }] }]"
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
        <a-form-item v-show="false"><a-input v-decorator="['id']"/></a-form-item>
        <a-form-item label="房型名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入房型名称"
            v-decorator="['roomName', { rules: [{ required: true, message: '请输入房型名称！' }] }]"
          />
        </a-form-item>
        <a-form-item label="VR" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入VR"
            v-decorator="['vr', { rules: [{ required: true, message: '请输入VR！' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { roomInfoEdit } from '@/api/modular/main/RoomInfo/roomInfoManage'
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
    roomList: {
      type: Array
    }
  },
  methods: {
    // 初始化方法
    edit(record) {
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue({
          addPrice: record.addPrice,
          bnbId: record.bnbId,
          id: record.id,
          roomName: record.roomName,
          vr: record.vr
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
          roomInfoEdit(values)
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
