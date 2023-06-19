<script>
import { Loader } from '@googlemaps/js-api-loader'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Map',
  data() {
    return {
      DirectionRenderer: '',
      map: ''
    }
  },
  mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyDDuK0Ovh6M1VRvICDiq321wzBwbsT5FSA",
      version: "weekly",
      libraries: ["places"],
      language: 'az',
      region: 'AZ'
    });
    const mapOptions = {
      center: {
        lat: 40.4402505,
        lng: 49.8670924
      },
      zoom: 9,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    };
    loader.loadCallback(e => {
      if (e) {
        console.log(e);
      } else {
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      }
      this.DirectionsRenderer = new google.maps.DirectionsRenderer();
      this.DirectionsRenderer.setMap(this.map);
    });
  },
  computed: {
    ...mapState(['OriginAndDestinationPlace']),
    ...mapMutations(['setPayment']),
  },
  methods: {
    
  },
  watch: {
    // bu funksiyan state -ə uyğun dəyər alır
    async OriginAndDestinationPlace ( newValue ) {
      const DirectionService = new google.maps.DirectionsService();

      const results = await DirectionService.route(
        {
          origin: { placeId: newValue[0].place_id },
          destination: { placeId: newValue[1].place_id },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            this.DirectionsRenderer.setDirections(response)

          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      )
    }
  }

}
</script>
<template>
  <div id="map">
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>