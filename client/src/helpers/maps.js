export function getFormattedPrediction (obj){
    for (const key in obj) {
        if (obj[key].formattedPrediction != undefined){
            return obj[key].formattedPrediction
            break
        }
    }
}