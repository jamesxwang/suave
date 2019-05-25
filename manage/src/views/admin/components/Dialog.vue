<template>
  <div class="dialog-container">
    <el-dialog
      center
      :title="dialogTitle"
      :visible.sync="show"
      :before-close="handleCloseDialog"
      @visible-change="updateShowDialog"
    >
      <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="钉钉">
          <el-input v-model="form.dingtalk_robot" placeholder="请输入钉钉机器人号" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form.wechat_id" placeholder="请输入微信号" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.level" placeholder="请选择管理员类型">
            <el-option v-for="type in adminType" :key="type.id" :label="type.name" :value="type.id" />
          </el-select>
        </el-form-item>
        <el-form-item class="dialog-btn-group">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true
    },
    adminType: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      labelPosition: 'left',
      show: this.showDialog
    }
  },
  methods: {
    handleCloseDialog(done) {
      this.$emit('onCancel')
      done()
    },
    onSubmit() {
      this.$emit('developing')
      // this.$emit('onSubmit')
    },
    onCancel() {
      this.$emit('onCancel')
    },
    updateShowDialog(isVisible) {
      if (isVisible) return false
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
$margin_small: 2em;

.dialog-container {
  width: 80%;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-form {
    width: 400px;
    margin: 0 auto;
  }
  .dialog-btn-group {
    margin-top: $margin_small;
  }
}
</style>
