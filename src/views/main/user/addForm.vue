<template>
  <a-modal
    title="用户增加"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-divider orientation="left">基本信息</a-divider>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form :form="form">
            <a-form-item label="账号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入账号"
                v-decorator="[
                  'account',
                  { rules: [{ required: true, min: 5, message: '请输入至少五个字符的账号！' }] }
                ]"
              />
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form :form="form">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入姓名"
                v-decorator="['name', { rules: [{ required: true, message: '请输入姓名！' }] }]"
              />
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form :form="form">
            <a-form-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入密码"
                type="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '请输入密码！' },
                      {
                        validator: validateToNextPassword
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form :form="form">
            <a-form-item label="重复密码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请再次输入密码"
                type="password"
                v-decorator="[
                  'confirm',
                  {
                    rules: [
                      { required: true, message: '请再次输入密码！' },
                      {
                        validator: compareToFirstPassword
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form :form="form">
            <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['sex', { rules: [{ required: true, message: '请选择性别！' }] }]">
                <a-radio :value="1">男</a-radio>
                <a-radio :value="2">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form :form="form">
            <a-form-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入手机号"
                v-decorator="['phone', { rules: [{ required: true, message: '请输入手机号！' }] }]"
              />
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import { sysUserAdd } from '@/api/modular/main/user/userManage'
import { getOrgTree, getOrgList } from '@/api/modular/system/orgManage'
import { sysPosList } from '@/api/modular/system/posManage'
import moment from 'moment'
export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      // 机构行样式
      labelCol_JG: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol_JG: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      count: 1,
      columns: [
        {
          title: '附属机构',
          dataIndex: 'extOrgId',
          width: '45%',
          scopedSlots: { customRender: 'extOrgId' }
        },
        {
          title: '附属岗位',
          dataIndex: 'extPosId',
          width: '45%',
          scopedSlots: { customRender: 'extPosId' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      visible: false,
      confirmLoading: false,
      orgTree: [],
      orgList: [],
      posList: [],
      sysEmpParamExtList: [],
      memberLoading: false,
      form: this.$form.createForm(this),
      data: [],
      birthdayString: []
    }
  },
  methods: {
    // 初始化方法
    add() {
      this.visible = true
      // this.getOrgDate()
      // this.getPosList()
    },
    /**
     * 增行
     */
    newMember() {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        extOrgId: '',
        extPosId: '',
        editable: true,
        isNew: true
      })
    },
    /**
     * 删除
     */
    remove(key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    /**
     * 选择子表单单项触发
     */
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    /**
     * 获取机构树，并加载于表单中
     */
    getOrgDate() {
      getOrgTree().then(res => {
        this.orgTree = res.data
      })
      getOrgList().then(res => {
        this.orgList = res.data
      })
    },
    /**
     * 获取职位list列表
     */
    getPosList() {
      sysPosList().then(res => {
        this.posList = res.data
      })
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('请确认两次输入密码的一致性！')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    /**
     * 选择树机构，初始化机构名称于表单中
     */
    initrOrgName(value) {
      this.form.getFieldDecorator('sysEmpParam.orgName', {
        initialValue: this.orgList.find(item => value === item.id).name
      })
    },
    /**
     * 子表单json重构
     */
    JsonReconsitution() {
      this.sysEmpParamExtList = []
      const newData = [...this.data]
      newData.forEach(item => {
        // eslint-disable-next-line eqeqeq
        if ((item.extOrgId != '') & (item.extPosId != '')) {
          this.sysEmpParamExtList.push({ orgId: item.extOrgId, posId: item.extPosId })
        }
      })
    },
    /**
     * 日期需单独转换
     */
    onChange(date, dateString) {
      if (date == null) {
        this.birthdayString = []
      } else {
        this.birthdayString = moment(date).format('YYYY-MM-DD')
      }
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          // this.JsonReconsitution()
          // values.sysEmpParam['extIds'] = this.sysEmpParamExtList
          if (this.birthdayString.length > 0) {
            values.birthday = this.birthdayString
          }
          sysUserAdd(values)
            .then(res => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败：' + res.message)
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
      // 清理子表单中数据
      this.data = []
      // 清理时间
      this.birthdayString = []
    }
  }
}
</script>
