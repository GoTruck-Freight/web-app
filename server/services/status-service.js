const BaseService = require('./base-service')
const Status = require('../models/status')

class StatusService extends BaseService {
    async findByStatusName(name) {
      const obj ={
        name : name
      }
       return this.query(obj)
      }
}
module.exports = new StatusService(Status)