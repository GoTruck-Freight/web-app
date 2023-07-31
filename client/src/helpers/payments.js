export async function CalculatePayment (data) {
    // l deyişəni yolun uzuluğudur (km-lə)
    let l = await context.dispatch('getRoadsLength', data.Distance)
 
    // fix ən aşşağı halda gediş haqqıdır
    const arr = [
      {
        distance: 50,
        price: 1
      },
      {
        distance: 100,
        price: 1
      },
      {
        distance: 200,
        price: 0.9
      },
      {
        distance: 300,
        price: 0.8
      },
      {
        distance: 400,
        price: 0.7
      },
      {
        distance: 500,
        price: 0.7
      }
    ]
    const fix = 150
    let payment = 0
    for (let index = 0; index < arr.length; index++) {

      if (l < arr[0].distance){
        //əgər mesafə 50 km dən azdırsa l < 50
        payment += l * arr[0].price  
        break
      }
      else if (l > arr[index].distance) {
        if (index == arr.length - 1) {
          //əgər məsafə 500 km dan çoxdursa l > 500
          payment+= ( arr[index].distance - arr[index - 1].distance + l - arr[index].distance) * arr[index].price
          break
        }
        else if (index > 0) {
          // misal 453 bu kod bu kod 400 -ü hesablayır
          payment+= (arr[index].distance - arr[index - 1].distance) * arr[index].price
          if (l < arr[index + 1].distance) {
            // misal 453 bu kod 53 -ü hesablayır 
            payment += (l - arr[index].distance) * arr[index].price
            break
          }
        }
        else {
          payment+= arr[index].distance * arr[index].price
        } 
      }

    }
    payment += fix + data.extraRoads
    let min_payment = payment - (payment / 100) * 7
    let max_payment = payment + (payment / 100) * 7
    min_payment = Math.round(min_payment / 10) * 10
    max_payment = Math.round(max_payment / 10) * 10
    const payments = [min_payment,max_payment]
    // payment = Math.round(payment / 10) * 10
    context.commit('setPayment', payment)
    context.commit('setminPayment', min_payment)
    context.commit('setmaxPayment', max_payment)
    return payments

  }