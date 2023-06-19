<script>
import Map from '@/components/Map.vue'
import Ride from '@/components/Ride.vue'
import Header from '@/components/Header.vue'

import { mapState,mapMutations } from 'vuex'

export default {
    name: 'OrderView',
    components: {
        Map,
        Ride,
        Header
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['payment']),
    },
    methods: {
        setPayment (){
            this.setPropasalPayment(this.propasalPayment)
            this.$router.push('/ConfirmOrder')
        }
    }
}
</script>
<template>
    <div class="Order_Page">
        <Header />
        <Ride />
        <Map />
    </div>
</template>
<style scoped lang="scss">
.Order_Page {
    width: 100%;
    height: 100%;
}
body {
    display:flex;
}
</style>