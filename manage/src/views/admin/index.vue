<template>
  <div class="app-container">
    <el-button class="add-admin-btn" @click="handleAddNew" type="primary">新增管理员</el-button>
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
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="delete-all-btn" @click="handleDeleteAll" plain>批量删除</el-button>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { getAllAdmin } from '@/api/admin'
import { formatDate } from '@/utils/index'

export default {
  name: 'Dashboard',
  data() {
    return {
      tableData: null,
      tableLoading: true,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.tableLoading = true
      getAllAdmin().then(response => {
        console.log(response.data.data)
        this.tableData = response.data.data
        this.tableLoading = false
      })
    },
    timestamp2date(timestamp) {
      return formatDate(timestamp)
    },
    handleAddNew(index, row) {
      return this.developing()
      console.log(index, row)
    },
    handleEdit(index, row) {
      return this.developing()
      console.log(index, row)
    },
    handleDelete(index, row) {
      return this.developing()
      console.log(index, row)
    },
    handleDeleteAll(index, row) {
      return this.developing()
      console.log(index, row)
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
.add-admin-btn {
  float: right;
}
.delete-all-btn {
  margin-top: 2em;
}
</style>
