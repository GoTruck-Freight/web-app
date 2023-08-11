export function getRoadLength(distance) {
    let length = distance
    length = length.split(" ")
    if (length[1] == "m") {
      length = length[0] * 0.001
    }
    else {
      length = length[0]
    }
    length = parseInt(length)
    return length;
  }
  export function filterRoads(data) {
    const { roads, steps } = data
    let results = 0;
    steps.forEach(async item => {
      for (let index = 0; index < roads.length; index++) {
        if (item.instructions.search(roads[index].number) > -1 || item.instructions.search(roads[index].name) > -1) {
          let roadlength = item.distance.text.split(" ")
          roadlength = parseInt(roadlength[0])
          // ** context.dispatch('getRoadsLength')
          results += roadlength * roads[index].factor
        }
      }
    });
    return results;
  }

  export async function routeConverter(origin,destination){
    const DirectionService = new google.maps.DirectionsService();

    const result = await DirectionService.route(
        {
            origin: { placeId: origin },
            destination: { placeId: destination },
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    )
    return result
  }
  export async function calcRoute(start,end) {
    const DirectionService = new google.maps.DirectionsService();

    const request = {
      origin: { placeId: start },
      destination: { placeId: end },
      travelMode: google.maps.TravelMode.DRIVING,
    }
    return await DirectionService.route(request, function(result, status) {
      if (status == 'OK') {
        return result
      }
    })
  }