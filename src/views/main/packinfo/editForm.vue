<template>
  <a-modal
    title="编辑套餐信息"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="关联民宿" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-select
            placeholder="请选择关联民宿"
            v-decorator="['bnbId', { rules: [{ required: true, message: '请选择关联民宿！' }] }]"
          >
            <a-select-option v-for="item in roomList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关联分类" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-select
            placeholder="请选择关联分类"
            v-decorator="['category', { rules: [{ required: true, message: '请选择关联分类！' }] }]"
          >
            <a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="默认价格" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number
            placeholder="请输入默认价格"
            style="width: 100%"
            v-decorator="['defaultPrice', { rules: [{ required: true, message: '请输入默认价格！' }] }]"
          />
        </a-form-item>
        <a-form-item label="默认库存" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number
            placeholder="请输入默认库存"
            style="width: 100%"
            v-decorator="['defaultStock', { rules: [{ required: true, message: '请输入默认库存！' }] }]"
          />
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入描述"
            v-decorator="['description', { rules: [{ required: true, message: '请输入描述！' }] }]"
          />
        </a-form-item>
        <a-form-item label="包含设备" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入包含设备"
            v-decorator="['facilities', { rules: [{ required: true, message: '请输入包含设备！' }] }]"
          />
        </a-form-item>
        <a-form-item label="图文描述图ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入图文描述图ID"
            v-decorator="['graphicDescId', { rules: [{ required: true, message: '请输入图文描述图ID！' }] }]"
          />
        </a-form-item>
        <a-form-item label="热点城市" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-select
            placeholder="请选择热点城市"
            v-decorator="['hotPoint', { rules: [{ required: true, message: '请选择热点城市！' }] }]"
          >
            <a-select-option v-for="item in hotCity" :key="item.id" :value="item.id">{{ item.city }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="主标题" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入主标题"
            v-decorator="['mainTitle', { rules: [{ required: true, message: '请输入主标题！' }] }]"
          />
        </a-form-item>
        <a-form-item label="主图id" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入主图id"
            v-decorator="['picId', { rules: [{ required: true, message: '请输入主图id！' }] }]"
          />
        </a-form-item>
        <a-form-item label="商品包含图ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入商品包含图ID"
            v-decorator="['productContentId', { rules: [{ required: true, message: '请输入商品包含图ID！' }] }]"
          />
        </a-form-item>
        <a-form-item label="购买须知图ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入购买须知图ID"
            v-decorator="['purchaseNotesId', { rules: [{ required: true, message: '请输入购买须知图ID！' }] }]"
          />
        </a-form-item>
        <a-form-item label="销量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入销量"
            v-decorator="['saleAmt', { rules: [{ required: true, message: '请输入销量！' }] }]"
          />
        </a-form-item>
        <a-form-item label="商品状态 0-删除 1-下架 2-上架" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入商品状态 0-删除 1-下架 2-上架"
            v-decorator="['status', { rules: [{ required: true, message: '请输入商品状态 0-删除 1-下架 2-上架！' }] }]"
          />
        </a-form-item>
        <a-form-item label="使用说明图ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入使用说明图ID"
            v-decorator="['useExplanationId', { rules: [{ required: true, message: '请输入使用说明图ID！' }] }]"
          />
        </a-form-item>
        <a-form-item label="副标题" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入副标题"
            v-decorator="['viceTitle', { rules: [{ required: true, message: '请输入副标题！' }] }]"
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
import { packInfoEdit } from '@/api/modular/main/packinfo/packInfoManage'
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
    },
    typeList: {
      type: Array
    },
    facilities: {
      type: Array
    },
    hotCity: {
      type: Array
    }
  },
  methods: {
    // 初始化方法
    edit(record) {
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue({
          bnbId: record.bnbId,
          category: record.category,
          defaultPrice: record.defaultPrice,
          defaultStock: record.defaultStock,
          description: record.description,
          facilities: record.facilities,
          hotPoint: record.hotPoint,
          id: record.id,
          mainTitle: record.mainTitle,
          picId: record.picId,
          saleAmt: record.saleAmt,
          viceTitle: record.viceTitle,
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
          packInfoEdit(values)
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
