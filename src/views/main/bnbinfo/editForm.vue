<template>
  <a-modal
    title="编辑民宿基本信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="具体地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入具体地址" v-decorator="['address']" />
        </a-form-item>
        <a-form-item
          label="区块"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入区块" v-decorator="['block']" />
        </a-form-item>
        <a-form-item
          label="营业执照"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入营业执照" v-decorator="['businessLicense']" />
        </a-form-item>
        <a-form-item
          label="城市"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入城市" v-decorator="['city', {rules: [{required: true, message: '请输入城市！'}]}]" />
        </a-form-item>
        <a-form-item
          label="国家"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入国家" v-decorator="['country', {rules: [{required: true, message: '请输入国家！'}]}]" />
        </a-form-item>
        <a-form-item
          label="描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入描述" v-decorator="['description']" />
        </a-form-item>
        <a-form-item
          label="区或县"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入区或县" v-decorator="['district', {rules: [{required: true, message: '请输入区或县！'}]}]" />
        </a-form-item>
        <a-form-item
          label="食品经营许可证"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入食品经营许可证" v-decorator="['foodBusinessLicense']" />
        </a-form-item>
        <a-form-item v-show="false"><a-input v-decorator="['id']" /></a-form-item>
        <a-form-item
          label="身份证-反面"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入身份证-反面" v-decorator="['idCardBack']" />
        </a-form-item>
        <a-form-item
          label="身份证-正面"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入身份证-正面" v-decorator="['idCardFront']" />
        </a-form-item>
        <a-form-item
          label="纬度"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
        </a-form-item>
        <a-form-item
          label="经度"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
        </a-form-item>
        <a-form-item
          label="民宿名字"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入民宿名字" v-decorator="['name', {rules: [{required: true, message: '请输入民宿名字！'}]}]" />
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
          label="省份"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入省份" v-decorator="['province', {rules: [{required: true, message: '请输入省份！'}]}]" />
        </a-form-item>
        <a-form-item
          label="特种行业许可证"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入特种行业许可证" v-decorator="['specialBusinessLicense']" />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入联系电话" v-decorator="['tel', {rules: [{required: true, message: '请输入联系电话！'}]}]" />
        </a-form-item>
        <a-form-item
          label="镇"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入镇" v-decorator="['town']" />
        </a-form-item>
        <a-form-item
          label="VR"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入VR" v-decorator="['vr']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { bnbInfoEdit } from '@/api/modular/main/bnbinfo/bnbInfoManage'
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
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      edit (record) {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              address: record.address,
              block: record.block,
              businessLicense: record.businessLicense,
              city: record.city,
              country: record.country,
              description: record.description,
              district: record.district,
              foodBusinessLicense: record.foodBusinessLicense,
              id: record.id,
              idCardBack: record.idCardBack,
              idCardFront: record.idCardFront,
              lat: record.lat,
              lng: record.lng,
              name: record.name,
              picId: record.picId,
              province: record.province,
              specialBusinessLicense: record.specialBusinessLicense,
              tel: record.tel,
              town: record.town,
              vr: record.vr
            }
          )
        }, 100)
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
            bnbInfoEdit(values).then((res) => {
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
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
