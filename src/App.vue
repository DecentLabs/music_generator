<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html, body {
  height: 100%;
  width: 100%;
}
body {

}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Helvetica neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  height: 100vh;
  width: 100%;
  /* background-image: url('./assets/bg2.jpg'); */
  background-size: cover;
  background-blend-mode: multiply;
  background-color: rgba(20, 17, 30, 1)
}
</style>
