<template>
  <a-modal
    title="房态设置"
    :width="600"
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
          <div class="radio-box">
            <a-radio-group v-decorator="['status', { rules: [{ required: true, message: '请选择状态！' }] }]">
              <a-radio :value="1">下架</a-radio>
              <a-radio :value="2">上架</a-radio>
            </a-radio-group>
          </div>
        </a-form-item>
        <a-form-item label="周末选项" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-select
            mode="multiple"
            placeholder="请选择周末选项"
            v-decorator="['weekendSelect', { rules: [{ required: false, message: '请选择周末选项' }] }]"
          >
            <a-select-option :value="'1'">周五</a-select-option>
            <a-select-option :value="'2'">周六</a-select-option>
            <a-select-option :value="'3'">周日</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="周末价格" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input
            placeholder="请输入周末价格"
            v-decorator="['weekendPrice', { rules: [{ required: false, message: '请输入周末价格！' }] }]"
          />
        </a-form-item>
        <a-form-item
          v-for="(k, index) in form.getFieldValue('keys')"
          v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
          has-feedback
          :key="k"
          :label="index === 0 ? '节日价格' : ''"
          :required="false"
        >
          <div class="flexBox">
            <a-range-picker
              v-decorator="[
                `rangePicker[${k}]`,
                {
                  rules: [{ type: 'array', required: true, message: '请选择日期区间' }]
                }
              ]"
            />
            <a-input
              v-decorator="[
                `rangePrice[${k}]`,
                {
                  validateTrigger: ['change', 'blur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入价格'
                    }
                  ]
                }
              ]"
              placeholder="请输入价格"
              style="width: 100px; margin:0 12px"
            />
            <a-icon
              v-if="form.getFieldValue('keys').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('keys').length === 1"
              @click="() => remove(k)"
            />
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="dashed" style="width: 30%;margin-left:90px" @click="add">
            <a-icon type="plus" /> 设置自定义价格
          </a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { packInfoEdit, packInfoDetail } from '@/api/modular/main/packinfo/packInfoManage'
import moment from 'moment'
let id = 0
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
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      roomInfos: {}
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    // this.form.getFieldDecorator('rangePrice', { initialValue: [], preserve: true })
    // this.form.getFieldDecorator('rangePicker', { initialValue: [], preserve: true })
  },
  methods: {
    remove(k) {
      const { form } = this
      const keys = form.getFieldValue('keys')
      if (keys.length === 1) {
        return
      }
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    },

    add() {
      console.log('增加')
      const keys = this.form.getFieldValue('keys') || []
      const nextKeys = keys.concat(id++)
      console.log(keys, nextKeys)
      this.form.setFieldsValue({
        keys: nextKeys
      })
    },
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
    edit(record) {
      this.visible = true
      this.record = record
      packInfoDetail({ id: record.id }).then(data => {
        this.roomInfos = data.data || {}
        const { packPrices = [] } = data.data || {}
        const keys = []
        const rangePrice = []
        const rangePicker = []
        id = packPrices.length > 0 ? packPrices.length + 1 : 0
        packPrices.map((item, index) => {
          const startTime = moment(item.startTime)
          const endTime = moment(item.endTime)
          keys.push(index)
          rangePrice.push(`${item.price}`)
          rangePicker.push([startTime, endTime])
        })
        console.log({
          ...record,
          keys,
          rangePrice,
          rangePicker,
          weekendSelect: (record.weekendSelect && record.weekendSelect.split(',')) || []
        })
        setTimeout(() => {
          this.form.setFieldsValue({
            ...record,
            keys,
            weekendSelect: (record.weekendSelect && record.weekendSelect.split(',')) || []
          })
          setTimeout(() => {
            this.form.setFieldsValue({
              rangePrice,
              rangePicker
            })
          }, 1000)
        }, 100)
      })
    },

    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log(values)
          const keys = values.keys || []
          const rangePrice = values.rangePrice || []
          const rangePicker = values.rangePicker || []
          const packPriceParams = []
          keys.map(key => {
            const startTime = rangePicker[key][0]
            const endTime = rangePicker[key][1]
            packPriceParams.push({
              price: rangePrice[key],
              startTime: startTime && moment(startTime).format('YYYY-MM-DD 00:00:00'),
              endTime: endTime && endTime.format('YYYY-MM-DD 00:00:00')
            })
          })
          const list = this.roomInfos.roomInfos || []
          const packRoomParams = []
          list.map(item => {
            console.log(item)
            packRoomParams.push({ roomId: item.id })
          })
          const params = {
            ...this.record,
            ...values,
            weekendSelect: values.weekendSelect && values.weekendSelect.join(','),
            packPriceParams,
            packRoomParams
          }
          delete params.keys
          delete params.rangePrice
          delete params.rangePicker
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
<style lang="less" scoped>
.flexBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /deep/ .ant-form-item-children-icon {
    display: none;
  }
}
/deep/ .ant-form-item-children-icon {
  display: none;
}
</style>
