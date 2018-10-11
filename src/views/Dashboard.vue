<template>
  <div class="about">
    <h1>{{ $t('welcome-user')}} {{ this.data.username }}</h1>
    <button>PLUS ICON HERE</button>
    <div class="boards">
      <span :key="board.id" v-for="board in data.boards">{{board.name}}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapState('Global', ['data'])
  }
}
</script>

