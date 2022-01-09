<template>
  <a-modal
    title="新增民宿基本信息"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="民宿名字" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入民宿名字"
                v-decorator="['name', { rules: [{ required: true, message: '请输入民宿名字！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="主图id" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入主图id"
                v-decorator="['picId', { rules: [{ required: true, message: '请输入主图id！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="关联用户" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择用户"
                v-decorator="['userId', { rules: [{ required: true, message: '请选择关联用户！' }] }]"
              >
                <a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
                  item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="负责人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入具体地址"
                v-decorator="['principal', { rules: [{ required: true, message: '请输入负责人！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24"
            ><a-form-item label="国家" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入国家"
                v-decorator="['country', { rules: [{ required: true, message: '请输入国家！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="省份" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入省份"
                v-decorator="['province', { rules: [{ required: true, message: '请输入省份！' }] }]"
              /> </a-form-item
          ></a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="城市" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入城市"
                v-decorator="['city', { rules: [{ required: true, message: '请输入城市！' }] }]"
              /> </a-form-item
          ></a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="区或县" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入区或县"
                v-decorator="['district', { rules: [{ required: true, message: '请输入区或县！' }] }]"
              /> </a-form-item
          ></a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="镇/街道" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入镇/街道" v-decorator="['town']" /> </a-form-item
          ></a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="区块" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入区块（如：港澳台、】江浙沪）"
                v-decorator="[
                  'block',
                  { rules: [{ required: true, message: '请输入区块（如：港澳台、】江浙沪）！' }] }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="具体地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入具体地址"
                v-decorator="['address', { rules: [{ required: true, message: '请输入具体地址！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"> </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入纬度" v-decorator="['Xvalue']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入经度" v-decorator="['Yvalue']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入联系电话"
                v-decorator="['tel', { rules: [{ required: true, message: '请输入联系电话！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入营业执照" v-decorator="['businessLicense']" /> </a-form-item
          ></a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="食品经营许可证" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入食品经营许可证" v-decorator="['foodBusinessLicense']" /> </a-form-item
          ></a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="身份证-反面" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入身份证-反面" v-decorator="['idCardBack']" /> </a-form-item
          ></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="身份证-正面" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入身份证-正面" v-decorator="['idCardFront']" /> </a-form-item
          ></a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="特种行业许可证" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入特种行业许可证" v-decorator="['specialBusinessLicense']" /> </a-form-item
          ></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="VR" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入VR" v-decorator="['vr']" /> </a-form-item
          ></a-col>
          <a-col :md="12" :sm="24"
            ><a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入描述" v-decorator="['description']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { bnbInfoAdd } from '@/api/modular/main/bnbinfo/bnbInfoManage'
export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    userList: {
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
          bnbInfoAdd(values)
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
    handleCancel() {
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
