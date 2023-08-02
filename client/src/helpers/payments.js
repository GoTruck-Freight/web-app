export function calculatePayment ({ distance,extraRoads,price }) {
    //distancedeyişəni yolun uzuluğudur (km-lə)
    // fix ən aşşağı halda gediş haqqıdır
    const arr = [
      {
        distance: 50,
        price: price.farefiftyKilometer
      },
      {
        distance: 100,
        price: price.fareHundredKilometer
      },
      {
        distance: 200,
        price: price.fareTwoHundredKilometer
      },
      {
        distance: 300,
        price: price.fareThreeHundredKilometer
      },
      {
        distance: 400,
        price: price.fareFourHundredKilometer
      }
    ]
    let payment = 0
    for (let index = 0; index < arr.length; index++) {

      if (distance < arr[0].distance){
        //əgər mesafə 50 km dən azdırsa distance< 50
        payment += distance* arr[0].price  
        break
      }
      else if (distance > arr[index].distance) {
        if (index == arr.length - 1) {  //distance > 400
          console.log("the end")
          payment += ( distance -arr[index - 1].distance ) * arr[index].price
          break
        }
        else if (index > 0) { 
          // misal 453 bu kod bu kod 400 -ü hesablayır
          payment+= (arr[index].distance - arr[index - 1].distance) * arr[index].price
          if (distance < arr[index + 1].distance) {
            // misal 453 bu kod 53 -ü hesablayır
            payment += (distance - arr[index].distance) * arr[index].price
            break
          }
        }
        else {
          payment+= arr[index].distance * arr[index].price
        }
      }

    }
    payment += distance*price.farePerKilometer + extraRoads
    if (payment < price.baseFare) {
      payment = price.baseFare;
    }
    let min_payment = payment - (payment / 100) * price.percentRange //buradakı 7 faiz aralığını göstərir
    let max_payment = payment + (payment / 100) * price.percentRange
    const payments = { 
      standart: payment,
      minimum: Math.round(min_payment / 10) * 10,
      maximum: Math.round(max_payment / 10) * 10
     }
    return payments
  }