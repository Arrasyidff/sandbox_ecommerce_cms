<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">Transactions</router-link>
      <button class="nav-logout">Logout</button>
    </div>
    <div class="view">
    </div> -->
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  position: relative; */
  width: 100%;
  min-height: 100vh;
  /* background: blue; */
}

#nav {
  display: flex;
  flex-direction: column;
  background: rgb(11, 11, 85);
  width: 15%;
  height: 100vh;
  position: fixed;
}

#nav button {
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px 0;
  margin-top: 20px;
  background: red !important;
  transition: .2s;
}

#nav button:hover {
  background: rgb(230, 31, 31) !important;
}

#nav a {
  font-weight: bold;
  background: rgb(11, 11, 85);
  width: 100%;
  padding: 10px 0;
  text-decoration: none;
  color: white;
  transition: .2s;
}

#nav a:hover {
  background: rgb(18, 131, 196);
}

#nav a.router-link-exact-active {
  color: white;
  background: rgb(18, 131, 196);
}

.view {
  padding-top: 20px;
  width: 85%;
  /* background: red; */
  min-height: 100vh;
  margin-left: 15%;
}
</style>
