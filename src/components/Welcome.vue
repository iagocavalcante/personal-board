<template>
  <vs-row>
    <vs-col vs-offset="2" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
      <img :src="Logo" alt="Personal Board">
    </vs-col>
    <vs-col vs-offset="2" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
      <div class="box">
        <div>
          <label :for="$t('username-label')">{{ $t("username-label") }}</label>
          <vs-input vs-icon-after="true" color="success" vs-size="large" vs-icon="person" :vs-placeholder="$t('username-placeholder')" v-model="username"/>
          <vs-button vs-size="large" vs-line-origin="left" vs-type="relief" color="success" @keyup.enter="save()" @click="save()">{{ $t("button-save") }}</vs-button>
        </div>
      </div>
    </vs-col>
  </vs-row>
</template>

<script>
import Logo from '@/assets/logo/personalboard-horiz.png'
import { mapActions } from 'vuex'
export default {
  name: 'Welcome',
  data: () => ({
    username: '',
    Logo: Logo
  }),
  methods: {
    ...mapActions('Global', ['saveUser']),
    save () {
      this.saveUser(this.username)
      this.$router.push('dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {

  text-align: center;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box div {
  vertical-align: middle;
  width: 290px;
  height: 45px;
}

.vs-input {
  margin-top: 20px;
}

.vs-button {
  margin-top: 20px;
}

</style>
