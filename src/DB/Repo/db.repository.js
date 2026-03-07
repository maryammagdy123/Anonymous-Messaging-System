export class DBRepository {
  constructor(model) {
    this.Model = model;
  }

  // Create
  async create(data) {
    return await this.Model.create(data);
  }

  // Find One
  async findOne({
    filter = {},
    projection = null,
    options = {},
    populate = [],
  }) {
    let query = this.Model.findOne(filter, projection, options);

    // populate support
    if (populate.length) {
      populate.forEach((pop) => {
        query = query.populate(pop);
      });
    }

    return await query;
  }

  //  Find By Id
  async findById({
    id,
    projection = null,
    options = {},
    populate = [],
  }) {
    let query = this.Model.findById(id, projection, options);

    if (populate.length) {
      populate.forEach((pop) => {
        query = query.populate(pop);
      });
    }

    return await query;
  }

  // Find Many
  async find({
    filter = {},
    projection = null,
    options = {},
    populate = [],
  }) {
    let query = this.Model.find(filter, projection, options);

    if (populate.length) {
      populate.forEach((pop) => {
        query = query.populate(pop);
      });
    }

    return await query;
  }

  //  Update One
  async updateOne({ filter = {}, update = {}, options = {} }) {
    return await this.Model.updateOne(filter, update, options);
  }

  //  Update By Id
  async findByIdAndUpdate({ id, update = {}, options = { new: true } }) {
    return await this.Model.findByIdAndUpdate(id, update, options);
  }

  //  Delete One
  async deleteOne(filter) {
    return await this.Model.deleteOne(filter);
  }

  //  Delete By Id
  async findByIdAndDelete(id) {
    return await this.Model.findByIdAndDelete(id);
  }

  // 🔹 Count
  async countDocuments(filter = {}) {
    return await this.Model.countDocuments(filter);
  }

  // 🔹 Pagination + Sorting
  async paginate({
    filter = {},
    projection = null,
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    populate = [],
  }) {
    const skip = (page - 1) * limit;

    let query = this.Model.find(filter, projection)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    if (populate.length) {
      populate.forEach((pop) => {
        query = query.populate(pop);
      });
    }

    const data = await query;
    const total = await this.Model.countDocuments(filter);

    return {
      page,
      totalPages: Math.ceil(total / limit),
      total,
      data,
    };
  }

  // 🔹 Aggregation
  async aggregate(pipeline = []) {
    return await this.Model.aggregate(pipeline);
  }
}