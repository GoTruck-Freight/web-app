const BaseService = require('./base-service')
const Status = require('../models/status')

class StatusService extends BaseService {
    async findByStatusName(data) {
      const obj ={
        name : data
      }
       return this.query(obj)
      }
}
module.exports = new StatusService(Status)