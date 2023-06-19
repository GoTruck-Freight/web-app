<script >
import { Loader } from '@googlemaps/js-api-loader'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
    name: 'Ride',
    data() {
        return {
            OriginPlace: '',
            DestinationPlace: '',
            DirectionsRenderer: '',
            Next_step: false, //Next step ride componentinde 2 ci sehifeye girmek ucundu
            start: ''
        }
    },
    components: {

    },
    mounted() {
        const loader = new Loader({
            apiKey: "AIzaSyDDuK0Ovh6M1VRvICDiq321wzBwbsT5FSA",
            version: "weekly",
            libraries: ["places"],
            language: 'az',
            region: 'AZ'
        });
        loader.loadCallback(e => {
            this.OriginPlace = new google.maps.places.Autocomplete(
                this.$refs["origin"],
                { fields: ["place_id"] }
            );
            this.DestinationPlace = new google.maps.places.Autocomplete(
                this.$refs["destination"],
                { fields: ["place_id"] }
            );
            this.DirectionsRenderer = new google.maps.DirectionsRenderer();
        });
    },
    computed: {
        ...mapState(['min_payment', 'max_payment','trucktype'])
    },
    methods: {
        ...mapMutations(['setRoute','setOrigin','setDestination','setOriginAndDestinationPlace','setPayment','setTrucktype']),
        ...mapActions(['getOrder']),
        //bu funksiya tirin(yuk masinin) tipini secmek ucundu misal tentli soyuduculu
        setTruck(value) {
            this.setTrucktype(value)
            // if (this.trucktype == value) {
            //     this.setTrucktype(false)
            // }
            // else {
            //     this.setTrucktype(value)
            // }
        },
        async setRoutemethod() {
            if (this.OriginPlace.getPlace() != undefined && this.DestinationPlace.getPlace() != undefined) {
                const origin =  this.OriginPlace.gm_accessors_.place.Uj.formattedPrediction
                const destination = this.DestinationPlace.gm_accessors_.place.Uj.formattedPrediction
                // start bu kod mapsda rota cizmaq ucundu
                const OriginAndDestinationPlace = [this.OriginPlace.getPlace(), this.DestinationPlace.getPlace()]
                this.setOriginAndDestinationPlace(OriginAndDestinationPlace)
                
                // finsh bu kod mapsda rota cizmaq ucundu
                const DirectionService = new google.maps.DirectionsService();

                const results = await DirectionService.route(
                    {
                        origin: { placeId: this.OriginPlace.getPlace().place_id },
                        destination: { placeId: this.DestinationPlace.getPlace().place_id },
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (response, status) => {
                        if (status === "OK") {
                            this.Next_step = true
                            this.setOrigin(origin)
                            this.setDestination(destination)
                            // setroute funksiyasi admin panele (emaile ) rotani bildirmek  ucundu
                            this.setRoute(origin + ' -> '+destination)
                            // this.DirectionsRenderer.setDirections(response)

                        } else {
                            window.alert("Directions request failed due to " + status);
                        }
                    }
                )
                // this.setPayment(this.CalculatePayment(RoadDistance, RoadsName))
                const data = {
                    Steps: results.routes[0].legs[0].steps,
                    Distance: results.routes[0].legs[0].distance.text
                }
                await this.getOrder(data)
            }
        },

    },

}
</script>
<template>
    <div class="Ride">

        <div class="container ride-steps ride-step-one" v-show="!Next_step">
            <div class="row ride-steps-a">
                <div class="col-12">
                <h1 class="h2 ride-title">Yola davam</h1>
            </div>
            <div class="col-12 ">
                <input type="text" class="form-control input-s1" placeholder="Yük götrülmə yerini daxil edin"
                    @keyup="onChange" ref="origin" v-model="start" />
                <input type="text" class="form-control input-s1 destination_input" placeholder="Hara gediləcək"
                    @keyup="onChange" ref="destination" />
            </div>
            </div>
            <div class="col-12 ride-next">
                <button class="button-s1" @click="setRoutemethod()">Davam et</button>
            </div>
        </div>

        <div class="container ride-steps ride-step-two" v-show="Next_step">
            <div class="row ride-steps-a">
                <div class="col-12">
                    <h3 class="h3 ride-title">Qiymət təxmini</h3>
                </div>
                <div class="col-12 ride-desc">
                    <p class="text-muted">Qiymətlər göstərilən aralıqda təxmin olunur.Davam etdikdən sonra seçilmiş aralıqda
                        dəqiq qiymət təklif olunacaq.</p>
                </div>
                <div class="col-12 choose-truck">
                    <button class="button-80" :class="[{ 'button-80-clicked': trucktype == 'standart' }, { '': !trucktype }]" @click="setTruck('standart')">
                        <div class="row button-row">
                            <div class="col-3">
                                <img class="" src="../assets/public/trailer-truck.png" />
                            </div>
                            <div class="col-5">
                                <p>Tentli TIR</p>
                                <p>
                                    <font-awesome-icon icon="fa-solid fa-weight-scale" />
                                    <span> 26 ton</span>
                                </p>
                                <p>
                                    <font-awesome-icon icon="fa-solid fa-up-right-and-down-left-from-center" /><span> 96
                                        kub</span>
                                </p>
                            </div>
                            <div class="col-4">
                                <font-awesome-icon icon="fa-solid fa-manat-sign" /><span>{{ min_payment }} - {{ max_payment
                                }}</span>
                            </div>
                        </div>
                    </button>
                    <button class="button-80" :class="[{ 'button-80-clicked': trucktype == 'mega' }, { '': !trucktype }]" @click="setTruck('mega')">
                        <div class="row button-row">
                            <div class="col-3">
                                <img class="" src="../assets/public/trailer-truck.png" />
                            </div>
                            <div class="col-5">
                                <p>Tentli TIR XL</p>
                                <p>
                                    <font-awesome-icon icon="fa-solid fa-weight-scale" />
                                    <span> 26 ton</span>
                                </p>
                                <p>
                                    <font-awesome-icon icon="fa-solid fa-up-right-and-down-left-from-center" /><span> 105
                                        kub</span>
                                </p>
                            </div>
                            <div class="col-4">
                                <font-awesome-icon icon="fa-solid fa-manat-sign" /><span>{{ min_payment }} - {{ max_payment
                                }}</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div class="col-12 ride-next">
                <router-link to="/login" class="button-s1 disabled">Sifariş et</router-link>
                <!-- <button class="button-s1">Davam et</button> -->
            </div>
        </div>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Ride {
    z-index: 2;
    position: fixed;
    background-color: white;
    padding: 1.4% 1.2%;
    border-radius: 8px;

    // >div {
    //     height: 80%;
    // }
    .ride-next {
        position: absolute;
        padding: 1%;
        bottom: 1%;
        left: 0;
        right: 0;
        height: 18%;
        background-color: white;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }

    .ride-steps {
        height: 100%;
        .ride-steps-a {
            overflow: scroll;
            height: 88%;
            align-content: flex-start;
            .ride-title {
                font-weight: bold;
                margin-bottom: 3%;
            }
        }
    }

    .destination_input {
        margin-top: 2%;
    }

    

    .button-row {
        align-items: center
    }

    .choose-truck {
        margin-top: 1%;

        button {
            margin: 1% 0;
        }

        div>img {
            width: 100%;

        }
    }
}
</style>