<template>
  <a-modal
    title="店铺信息修改"
    :width="800"
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

        <a-form-item label="店铺名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入店铺名称"
            v-decorator="['name', { rules: [{ required: true, message: '请输入店铺名称！' }] }]"
          />
        </a-form-item>
        <a-form-item label="店铺地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入店铺名称"
            v-decorator="['address', { rules: [{ required: true, message: '请输入店铺地址！' }] }]"
          />
        </a-form-item>

        <a-form-item label="负责人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入负责人"
            v-decorator="['user', { rules: [{ required: true, message: '请输入负责人！' }] }]"
          />
        </a-form-item>

        <a-form-item label="联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入联系方式"
            v-decorator="['phone', { rules: [{ required: true, message: '请输入联系方式！' }] }]"
          />
        </a-form-item>
        <a-form-item label="身份证正反面" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            @preview="handlePreview"
            v-decorator="[
              'headImage',
              {
                rules: [{ required: true, message: '请上传身份证正反面' }],
                initialValue: fileList,
                valuePropName: 'fileList',
                getValueFromEvent: normFiles
              }
            ]"
          >
            <div v-if="fileList.length < 1 && uploadingFile == false">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item label="手持身份证正反面" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            @preview="handlePreview"
            v-decorator="[
              'headImage2',
              {
                rules: [{ required: true, message: '请上传手持身份证正反面' }],
                initialValue: fileList,
                valuePropName: 'fileList',
                getValueFromEvent: normFiles
              }
            ]"
          >
            <div v-if="fileList.length < 1 && uploadingFile == false">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            @preview="handlePreview"
            v-decorator="[
              'headImage3',
              {
                rules: [{ required: true, message: '请上传营业执照' }],
                initialValue: fileList,
                valuePropName: 'fileList',
                getValueFromEvent: normFiles
              }
            ]"
          >
            <div v-if="fileList.length < 1 && uploadingFile == false">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="食品经营许可证（选填）" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            @preview="handlePreview"
            v-decorator="[
              'headImage4',
              {
                rules: [{ required: false }],
                initialValue: fileList,
                valuePropName: 'fileList',
                getValueFromEvent: normFiles
              }
            ]"
          >
            <div v-if="fileList.length < 1 && uploadingFile == false">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="特种行业许可证（选填）" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            @preview="handlePreview"
            v-decorator="[
              'headImage5',
              {
                rules: [{ required: false }],
                initialValue: fileList,
                valuePropName: 'fileList',
                getValueFromEvent: normFiles
              }
            ]"
          >
            <div v-if="fileList.length < 1 && uploadingFile == false">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { sysPosEdit } from '@/api/modular/system/posManage'

export default {
  data() {
    return {
      previewVisible: false,
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
      setTimeout(() => {
        this.form.setFieldsValue({
          id: record.id,
          name: record.name,
          code: record.code,
          sort: record.sort,
          remark: record.remark
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
          sysPosEdit(values)
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
