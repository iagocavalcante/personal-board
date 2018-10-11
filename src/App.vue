<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  height: 30px;
  border-radius: 4px;
  border: #2c3e50;
  margin-top: 5px;
}

.btn > .btn-md  {
  width: 80px;
}

.btn > .btn-primary {
  background-color: azure;
  color: grey;
}

.btn > .btn-primary:focus {
  background-color: azure;
  color: grey;
  border: 1px solid grey;
}
</style>
