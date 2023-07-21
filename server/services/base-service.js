class BaseService {
  constructor(model) {
    this.model = model
  }

  save(objects) {
    return this.model.insertMany(objects)
  }

  load() {
    return this.model.find()
  }
  first() {
    return this.model.find().limit(1)
  }

  async insert(object) {
    return await this.model.create(object)
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object, { new: true });
  }

  async find(id) {
    return this.model.findById(id)
  }

  async query(obj) {
    return this.model.find(obj)
  }

  async findBy(property, value) {
    console.log(property)
    return this.model.find({ property: value })
  }
}

module.exports = BaseService
