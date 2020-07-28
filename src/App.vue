<template>
  <div id="app">
    <router-view/>
    <footer>
      <p class="footer">
        Personal Board, Version {{appVersion}} - Developed by Iago Cavalcante
      </p>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('Global', ['appVersion'])
  }
}
</script>

<style>

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

footer {
  width: 100%;
  position: fixed;
  bottom: 0;
}

.footer {
  background-color: #e5e5e5;
  padding: 10px;
  text-align: center;
  color: rgb(31,116,255)
}

</style>
