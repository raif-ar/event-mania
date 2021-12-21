<template>
  <div class="header-container">
    <router-link class="home-link" :to="{ name: 'Home' }"
      ><h1>event<span>mania</span></h1></router-link
    >
    <p>Bringing you all your favorite events in one place!</p>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header-container {
  background-color: #6200ee;
  color: #ffffff;
  overflow: hidden;
}

h1 {
  margin: 0;
  text-transform: uppercase;
}

p {
  margin-top: 0;
}

span {
  font-size: 80px;
  text-transform: lowercase;
}

.home-link {
  text-decoration: none;
  color: #ffffff;
}
</style>
