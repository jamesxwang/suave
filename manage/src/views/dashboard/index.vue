<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">Welcome, {{ name }}!</div>
    <div class="dashboard-text">管理员权限: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import superDashboard from './super'
import normalDashboard from './normal'

export default {
  name: 'Dashboard',
  components: { superDashboard, normalDashboard },
  data() {
    return {
      currentRole: 'superDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('super')) {
      this.currentRole = 'normalDashboard'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
