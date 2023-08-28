const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    quantity: Number,
    item: String,
    purchaseRate: Number,
    totalAmount: Number,
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor'},
    purchaseT: String,
    description: String,
    purchaseTypeId: { type: Schema.Types.ObjectId, ref: 'Stock'},   // scrap/others etc
    performedById: { type: Schema.Types.ObjectId, ref: 'User'},
    performedT: String,
    transactionType: { type: String, default: 'purchase' },     // "income"/"purchase"
    changeLog: [String]
})

module.exports = mongoose.model('Purchase', purchaseSchema);