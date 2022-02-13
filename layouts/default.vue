<template>
  <div class="back-color">
    <main>
      <Nuxt />
    </main>
    <nav class="footer-backcolor">
      <ul class="footer">
        <li>
          <NuxtLink to="/">
            <img src="~/assets/icons/Home.png" alt="home">
            <div class="btn-active">
              Home
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/Portfolio">
            <img src="~/assets/icons/Portfolio.png" alt="Portfolio">
            <div class="footer-textcolor">
              Portfolio
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/Wealth">
            <img src="~/assets/icons/Wealth.png" alt="Wealth">
            <div class="footer-textcolor">
              Wealth
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/Exchange">
            <img src="~/assets/icons/Exchange.png" alt="Exchange">
            <div class="footer-textcolor">
              Exchange
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/History">
            <img src="~/assets/icons/History.png" alt="History">
            <div class="footer-textcolor">
              History
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped>
.footer-backcolor {
  background-color: #20242D;
}
.back-color {
  background-color: black;
}
.footer {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
.footer-textcolor {
  color: #7E83A6;
}
li {
    list-style: none;
}
a {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content:center;
}
.btn-active {
  color: white;
}
</style>
<style>
  div {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  a {
    text-decoration: none;
  }
</style>
