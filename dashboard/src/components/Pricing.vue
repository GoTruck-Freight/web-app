<script>
import { mapActions } from 'vuex'

export default {
    name: "PricingComponent",
    components: {
    },
    data() {
        return {
            data: ''
        }
    },
    methods: {
        ...mapActions(['getPrice','updatePrice']),
        async getItems(){
            const orders = await this.getPrice()
            this.data = orders.shift()
        },
        async updateItems(){
            const data = {
                    "baseFare": this.data.baseFare,
                    "farePerKilometer": this.data.farePerKilometer,
                    "farefiftyKilometer": this.data.farefiftyKilometer,
                    "fareHundredKilometer": this.data.fareHundredKilometer,
                    "fareTwoHundredKilometer": this.data.fareTwoHundredKilometer,
                    "fareThreeHundredKilometer": this.data.fareThreeHundredKilometer,
                    "fareFourHundredKilometer": this.data.fareFourHundredKilometer,
                    "percentRange": this.data.percentRange
                }

            const id = this.data._id
            const obj = { data, id}
            this.updatePrice(obj)
        }

    },
    mounted() {
        this.getItems()
    }
}
</script>
  
<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="home-tab">
                <div class="tab-content tab-content-basic">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                        <div class="row">
                            <div class="col-lg-12 d-flex flex-column">
                                <div class="row flex-grow">
                                    <div class="col-12 grid-margin stretch-card">
                                        <div class="card card-rounded">
                                            <div class="card-body">
                                                <div class="d-sm-flex justify-content-between align-items-start">
                                                    <div>
                                                        <h4 class="card-title card-title-dash">Pending Requests</h4>
                                                        <p class="card-subtitle card-subtitle-dash">You have 50+ new
                                                            requests</p>
                                                    </div>
                                                </div>
                                                <div class="table-responsive  mt-1">
                                                    <div class="d-flex flex-column">
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Basefare
                                                            </div>
                                                            <v-slider v-model="data.baseFare" step="1" thumb-label="always" min="0" max="200"></v-slider>
                                                        </div>
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Fare Per Kilometer
                                                            </div>
                                                            <v-slider v-model="data.farePerKilometer" step="0.001" thumb-label="always" min="0" max="2"></v-slider>
                                                        </div>
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Fare fifty Kilometer
                                                            </div>
                                                            <v-slider v-model="data.farefiftyKilometer" step="0.001" thumb-label="always" min="0" max="2"></v-slider>
                                                        </div>
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Fare Hundred Kilometer
                                                            </div>
                                                            <v-slider v-model="data.fareHundredKilometer" step="0.001" thumb-label="always" min="0" max="2"></v-slider>
                                                        </div>
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Fare Two Hundred Kilometer
                                                            </div>
                                                            <v-slider v-model="data.fareTwoHundredKilometer" step="0.001" thumb-label="always" min="0" max="2"></v-slider>
                                                        </div>
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Fare Three Hundred Kilometer
                                                            </div>
                                                            <v-slider v-model="data.fareThreeHundredKilometer" step="0.001" thumb-label="always" min="0" max="2"></v-slider>
                                                        </div>
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Fare four Hundred Kilometer
                                                            </div>
                                                            <v-slider v-model="data.fareFourHundredKilometer" step="0.001" thumb-label="always" min="0" max="2"></v-slider>
                                                        </div>
                                                        <div class="py-3">
                                                            <div class="text-caption">
                                                                Percent range for payment
                                                            </div>
                                                            <v-slider v-model="data.percentRange" step="0.1" thumb-label="always" min="0" max="30"></v-slider>
                                                        </div>
                                                        <div class="col-12">
                                                            <button class="btn btn-success" @click="updateItems()">Save</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style></style>