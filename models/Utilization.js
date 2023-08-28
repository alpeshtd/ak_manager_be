const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const utilizationSchema = new Schema({
    item: String,
    quantity: Number,
    rate: Number,
    utilizationT: String,
    orderId: { type: Schema.Types.ObjectId, ref: 'Order'},
    performedById: { type: Schema.Types.ObjectId, ref: 'User'},
    performedT: String,
    description: String,
    changeLog: [String]
})

module.exports = mongoose.model('Utilization', utilizationSchema);