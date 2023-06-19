<script>
import { mapActions,mapState } from 'vuex'
import { vMaska } from "maska"
import emailjs from 'emailjs-com'

export default {
    directives: { maska: vMaska },
    data() {
        return {
            handleForm: {
                PhoneNumber: ''
            },
            status: false
        }
    },
    computed: {
        ...mapState(['min_payment', 'max_payment','Route'])
    },
    methods: {
        ...mapActions(['confirmOrder','getStatusbyName']),
        submitForm: async function ()  {
            const status = await this.getStatusbyName('active')
            // start bu kod sifaris etdikde bildiris(email) getmesi ucundu
            // emailjs.send(process.env.VUE_APP_EMAIL_SERVICE, process.env.VUE_APP_EMAIL_TEMPLATE, { route: this.Route,min:this.min_payment,max:this.max_payment },process.env.VUE_APP_EMAIL_API_KEY)
            //     .then(function (response) {
            //         console.log('SUCCESS!', response.status, response.text);
            //     }, function (error) {
            //         console.log('FAILED...', error);
            //     });
            // finish bu kod sifaris etdikde bildiris(email) getmesi ucundu
            this.handleForm.status = status.data.shift()
            this.confirmOrder(this.handleForm)
            this.status = true
            // setTimeout(() => {
            //     window.location.href = 'http://gotruck.online';
            // }, 2500);
        }
    }
}
</script>
<template>
    <div class="login">
        <div class="login-panel container">
            <div class="row">
                <div class="col-12 login-panel-content">
                    <h1 class="h1">Yolun sonu</h1>
                </div>
                <div class="col-12 login-panel-content">
                    <p>Telefun nömrənizi qeyd edin və sifarişnizi yekunlaşdırın.</p>
                </div>
                <form class="row" @submit.prevent="submitForm">
                    <div class="col-12 login-panel-content">
                        <!-- <input class="input-d1" /> -->
                        <input v-maska data-maska="(###)-###-##-##" v-model="handleForm.PhoneNumber" class="input-d1"
                            placeholder="055-000-00-00">
                    </div>
                    <div class="col-12 login-panel-content">
                        <button class="button-s1">Sifariş Et</button>
                    </div>

                    <div class="col-12 alert alert-primary" role="alert" v-if="status">
                        Müraciətniz qeydə alındı tezliklə sizinlə əlaqə yaradacayıq.
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="scss"></style>