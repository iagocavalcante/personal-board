<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.btn {
  height: 30px;
  border-radius: 4px;
  border: none;
  margin-top: 5px;
}

.btn, .btn-md  {
  width: 80px;
}

.btn, .btn-primary {
  background-color: #2c3e50;
  color: white;
}

.btn-primary:focus {
  background-color: azure;
  color: grey;
  border: 1px solid grey;
}
</style>
