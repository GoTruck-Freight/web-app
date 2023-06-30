<template>
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
        <li class="nav-item active">
            <router-link class="nav-link" to="orders">
              <i class="mdi mdi-grid-large menu-icon"></i>
              <span class="menu-title">Orders</span>
            </router-link>
          </li> 
          <li class="nav-item active">
            <router-link class="nav-link" to="roads">
              <i class="mdi mdi-grid-large menu-icon"></i>
              <span class="menu-title">Roads</span>
            </router-link>
          </li>
        </ul>
      </nav>
</template>

<script>
export default {
    name: "SidebarLeft",
}
</script>

<style></style>