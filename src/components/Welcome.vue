<template>
  <div class="box">
    <div>
      <label for="Entre com o nome de seu usuário">Entre com o nome de seu usuário</label>
      <input class="username-input" type="text" name="username" id="username" v-model="username">
      <button class="btn btn-primary">Salvar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data: () => ({
    username: ''
  }),
  methods: {
    save () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.box {
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
