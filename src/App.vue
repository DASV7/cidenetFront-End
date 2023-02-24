<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <headerCidenet />
    <nav>
      <router-link to="/">Consulta de Empleados</router-link> |
      <router-link to="/about">Más informacion</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import headerCidenet from "./components/headerCidenet.vue"
export default {
  name: 'app',
  components: {
    headerCidenet
  }
}
</script>

