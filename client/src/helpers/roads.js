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
    // const roads = [
    //   { number: 'M4', name: 'Bakı-Şamaxı-Yevlax', factor: 0.37 },
    //   { number: 'R22', name: 'Şəmkir-Gədəbəy', factor: 0.37 },
    //   { number: 'R-8', name: 'Muğanlı-İsmayıllı', factor: 0.37 },
    // ]
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