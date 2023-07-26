<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img src="../../images/logo.svg" alt="logo">
              </div>
              <h4>Hello! let's get started</h4>
              <h6 class="fw-light">Sign in to continue.</h6>
              <form class="pt-3" @submit.prevent="onSubmit">
                <div class="form-group">
                  <input type="email" v-model="user.email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username">
                </div>
                <div class="form-group">
                  <input type="password" v-model="user.password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="mt-3">
                  <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" @click="onSubmit">SIGN IN</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
import axios from "axios"

export default {
    data () {
        return {
            user: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch("login", { ...this.user }).then((result) => {
                console.log(result)
                this.$router.push("/")
            }).catch((err) => {
                console.log(err)
            });
            

        }
    }
}
</script>

<style>

</style>