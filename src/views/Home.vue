<template>
  <div class="home">
    <div class="sideBar">
      <h1>ARFAFA</h1>
      <div>
        <router-link :to="{name: 'Products'}">Products</router-link>
        <router-link :to="{name: 'About'}">Transactions</router-link>
        <button class="nav-logout">Logout</button>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home-Page'
}
</script>

<style scoped>
.home {
  widows: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
}

.sideBar {
  background: rgb(11, 11, 85);
  width: 15%;
  height: 100vh;
  position: fixed;
}

.sideBar h1 {
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 5px 20px;
}

.sideBar div {
  display: flex;
  flex-direction: column;
}

.sideBar button {
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px 0;
  margin-top: 20px;
  background: red !important;
  transition: .2s;
}

.sideBar button:hover {
  background: rgb(230, 31, 31) !important;
}

.sideBar a {
  font-weight: bold;
  background: rgb(11, 11, 85);
  width: 100%;
  padding: 10px;
  text-decoration: none;
  color: white !important;
  transition: .2s;
}

.sideBar a:hover {
  background: rgb(18, 131, 196);
  color: white !important;
  text-decoration: none !important;
}

.sideBar a.router-link-exact-active {
  color: white;
  background: rgb(18, 131, 196);
}

.content {
  width: 85%;
  margin-left: 15%;
  min-height: 100vh;
  padding: 20px;
}
</style>
