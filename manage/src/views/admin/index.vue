<template>
  <div class="app-container">
    <el-button class="add-admin-btn" type="primary" @click="handleAddNew">新增管理员</el-button>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="登录账号"
        min-width="140"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        min-width="140"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="角色"
        min-width="140"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码"
        min-width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.mobile || '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="微信账号"
        min-width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.wechat_id || '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="入职日期"
        min-width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ timestamp2date(scope.row.join_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="180"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            停用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      plain
      class="delete-all-btn"
      @click="handleDeleteAll"
    >
      批量停用
    </el-button>

    <!-- Dialog Modal -->
    <Dialog
      v-if="showDialog"
      :dialog-title="dialogTitle"
      :show-dialog.sync="showDialog"
      :admin-type="adminType"
      :form="form"
      @on-submit="onSubmit"
      @on-cancel="onCancel"
      @reset-form="resetForm"
      @developing="developing"
    />
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { getAllAdmin, getAdminType, addAdmin, editAdmin, removeAdmin } from '@/api/admin'
import { formatDate, removeObjFromArrayBy } from '@/utils/index'
import Dialog from './components/Dialog'

export default {
  name: 'Admin',
  components: { Dialog },
  data() {
    return {
      tableData: null,
      adminType: [],
      tableLoading: true,
      multipleSelection: [],
      showDialog: false,
      dialogTitle: '',
      form: {
        id: null,
        username: '',
        password: '',
        nickname: '',
        dingtalk_robot: '',
        mobile: '',
        wechat_id: '',
        level: ''
      },
      isCreate: true,
      message: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.tableLoading = true
      getAllAdmin().then(response => {
        this.tableData = response.data.data
        this.tableLoading = false
      })
      getAdminType().then(response => {
        this.adminType = response.data.data
      })
    },
    resetForm() {
      this.form = {
        id: null,
        username: '',
        password: '',
        nickname: '',
        dingtalk_robot: '',
        mobile: '',
        wechat_id: '',
        level: ''
      }
    },
    timestamp2date(timestamp) {
      return formatDate(timestamp)
    },
    validateForm(form) {
      if (!form.username) {
        this.message = '请输入用户名！'
        return false
      }
      if (!form.password) {
        this.message = '请输入密码！'
        return false
      }
      if (!form.level) {
        this.message = '请选择管理员类型！'
        return false
      }
      return true
    },
    onSubmit() {
      console.log('form|', this.form)
      if (!this.validateForm(this.form)) {
        Message({
          message: this.message || 'Error!',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      if (this.isCreate) {
        addAdmin(this.form).then(response => {
          if (!response) {
            return
          }
          console.log('response|', response)
          Message({
            message: '新增管理员成功！',
            type: 'success',
            duration: 5 * 1000
          })
          this.showDialog = false
        })
      } else {
        editAdmin(this.form).then(response => {
          if (!response) {
            return
          }
          console.log('response|', response)
          Message({
            message: '编辑管理员成功！',
            type: 'success',
            duration: 5 * 1000
          })
          this.showDialog = false
        })
      }
    },
    onCancel() {
      this.showDialog = false
    },
    handleAddNew() {
      this.isCreate = true
      this.showDialog = true
      this.dialogTitle = '新增管理员'
    },
    handleEdit(index, row) {
      this.isCreate = false
      const tmp = { ...row }
      tmp.level = row.type.admin_user_type_id
      this.form = tmp
      this.dialogTitle = '编辑管理员'
      this.showDialog = true
    },
    handleDelete(index, row) {
      MessageBox.confirm('确认停用管理员"' + row.nickname + '"吗？', '停用管理员确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        removeAdmin({ id }).then(response => {
          if (!response) {
            return
          }
          this.tableData.splice(index, 1)
          Message({
            message: '停用管理员"' + row.nickname + '"成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
      }).catch(e => { console.log(e) })
    },
    handleDeleteAll() {
      if (!this.multipleSelection.length) {
        return
      }
      MessageBox.confirm('确认停用管理员吗？', '停用管理员确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach(element => {
          const id = element.id
          removeAdmin({ id }).then(response => {
            if (!response) {
              return
            }
            removeObjFromArrayBy(this.tableData, { id })
          })
        })
      }).then(() => {
        const adminList = []
        this.multipleSelection.forEach(element => {
          const name = element.nickname
          adminList.push(name)
        })
        Message({
          message: '停用管理员' + adminList + '成功',
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(e => { console.log(e) })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    developing() {
      Message({
        message: '开发中...',
        type: 'info',
        duration: 2 * 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
$margin_small: 2em;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .dialog-container .el-input input {
    color: $cursor;
  }
}
.add-admin-btn {
  float: right;
  margin-bottom: $margin_small;
}
.delete-all-btn {
  margin-top: $margin_small;
}
</style>
