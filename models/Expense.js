const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    amount: Number,
    expenseT: String,
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor'},
    paymentMode: {              // "cash"/"online"/"gpay"/"phonepay"
        label: String,
        id: String,
        value: String,
    },      
    description: String,
    performedById: { type: Schema.Types.ObjectId, ref: 'User'},
    performedT: String,
    changeLog: [String]
})

module.exports = mongoose.model('Expense', expenseSchema);