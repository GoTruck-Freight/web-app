export default interface ItemType {
    _id: string,
    _v: number,
    number: string,
    minpayment: number,
    maxpayment: number,
    payment: number,
    propsalpayment: number,
    route: string,
    trucktype: string,
    weight: string,
    status: object,
    created_at: string,
    feedback: string
  }