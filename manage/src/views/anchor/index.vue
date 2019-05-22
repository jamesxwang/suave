<template>
  <div class="table-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中"
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-carousel indicator-position="outside" type="card" height="500px">
              <el-carousel-item v-for="img in props.row.image" :key="img">
                <img :src="getImage(img)">
              </el-carousel-item>
            </el-carousel>
            <el-form-item label="语音">
              <audio controls>
                <source :src="getAudio(props.row.audio)" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
            </el-form-item>
            <el-form-item label="申请时间">
              <span>{{ props.row.apply_date }}</span>
            </el-form-item>
             <el-form-item label="昵称">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="城市">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="职位">
              <span>{{ props.row.occupation }}</span>
            </el-form-item>
            <el-form-item label="在线时间">
              <span>{{ props.row.online }}</span>
            </el-form-item>
            <el-form-item label="技能">
              <span>{{ props.row.skill }}</span>
            </el-form-item>
            <el-form-item label="个人介绍">
              <span>{{ props.row.slogan || '无' }}</span>
            </el-form-item>
            <el-form-item label="微信号">
              <span>{{ props.row.wechat_id }}</span>
            </el-form-item>
            <el-form-item label="陪聊经验">
              <span v-if="props.row.experience">有</span>
              <span v-else>无</span>
            </el-form-item>
            <el-form-item label="标签">
              <span v-if="props.row.tags.length">{{ props.row.tags }}</span>
              <span v-else>无</span>
            </el-form-item>
            <el-row class="audit-btn-group">
              <el-button type="danger" @click="confirmAudit(false, props.row.id)">审核失败</el-button>
              <el-button type="success" @click="confirmAudit(true, props.row.id)">审核通过</el-button>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        prop="nickname">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="gender">
      </el-table-column>
      <el-table-column
        label="城市"
        prop="city">
      </el-table-column>
      <el-table-column
        label="职位"
        prop="occupation">
      </el-table-column>
    </el-table>

    <!-- 确认弹窗 -->
    <el-dialog title="审核确认" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="店员等级设定：" :label-width="formLabelWidth">
          <el-select v-model="form.level" placeholder="请选择店员等级">
            <el-option v-for="(level,i) in allLevels" :key="i" :label="level.name" :value="level.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="pass()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { getUnauditList, auditPass, auditReject, getAllLevel } from '@/api/audit'
import { getImageURL, getAudioURL } from '@/utils/ali-oss'

export default {
  name: 'Anchor',
  data() {
    return {
      allLevels: null,
      list: null,
      listLoading: true,
      form: {
        id: '',
        level: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '180px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUnauditList().then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
      getAllLevel().then(response => {
        this.allLevels = response.data.data
      })
    },
    confirmAudit(pass, id) {
      if (pass) {
        this.dialogFormVisible = true
        this.form.id = id
      } else {
        MessageBox.confirm('确认审核失败吗？', '审核确认', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          auditReject({id}).then(response => {
            const res = response.data.data
            this.list.forEach((element,index) => {
              if (element.id === res.id) {
                this.list.splice(index, 1)
              }
            })
            Message({
              message: '用户：' + res.name + '，审核不通过',
              type: 'success',
              duration: 5 * 1000
            })
          })
        })
      }
    },
    pass() {
      if (!this.form.level) {
        Message({
          message: '请选择店员等级',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      auditPass(this.form).then(response => {
        const res = response.data.data
        this.list.forEach((element,index) => {
          if (element.id === res.id) {
            this.list.splice(index, 1)
          }
        })
        Message({
          message: '用户：' + res.name + '，审核通过',
          type: 'success',
          duration: 5 * 1000
        })
        this.dialogFormVisible = false
      })
    },
    getImage(name) {
      return getImageURL(name)
    },
    getAudio(name) {
      return getAudioURL(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  height: 100%;
}
.table-expand {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
}
.audit-btn-group {
  margin-top: 20px;
  float: right;
}
.el-carousel__item {
  img {
    width: 100%;
    height: auto;
  }
}
</style>
