<template>
  <a-modal
    title="房态设置"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item style="display: none;" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input v-decorator="['id']" />
        </a-form-item>

        <a-form-item label="库存" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入库存"
            v-decorator="['defaultStock', { rules: [{ required: true, message: '请输入库存！' }] }]"
          />
        </a-form-item>
        <a-form-item label="价格" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入价格"
            v-decorator="['defaultPrice', { rules: [{ required: true, message: '请输入价格！' }] }]"
          />
        </a-form-item>

        <a-form-item label="商品状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-radio-group v-decorator="['status', { rules: [{ required: true, message: '请选择状态！' }] }]">
            <a-radio :value="1">下架</a-radio>
            <a-radio :value="2">上架</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { packInfoEdit } from '@/api/modular/main/packinfo/packInfoManage'

export default {
  data() {
    return {
      previewVisible: false,
      record: {},
      previewImage: '',
      fileList: [],
      fileUrl: [],
      batchFileList: [],
      uploadingFile: false,
      labelCol: {
        xs: { span: 2 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 2 },
        sm: { span: 14 }
      },
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
      this.record = record
      setTimeout(() => {
        this.form.setFieldsValue({
          ...record
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
          const params = {
            ...this.record,
            ...values
          }
          packInfoEdit(params)
            .then(res => {
              if (res.success) {
                this.$message.success('编辑成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
                this.form.resetFields()
              } else {
                this.$message.error('编辑失败：' + res.message)
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
