<template>
  <div class="box">
    <div>
      <label for="Entre com o nome de seu usuário">{{ $t("username-label") }}</label>
      <input class="username-input" type="text" name="username" id="username" :placeholder="$t('username-placeholder')" v-model="username">
      <button @click="save()" class="btn btn-primary btn-md">{{ $t("button-save") }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Welcome',
  data: () => ({
    username: ''
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
  width: 270px;
  height: 45px;
}

.username-input {
  width: 270px;
  height: 25px;
  background-color: azure;
  border: .5px solid grey;
  border-radius: 3px;
  margin-top: 10px;
}
</style>
