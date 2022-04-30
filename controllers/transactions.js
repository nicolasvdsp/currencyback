const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    sender: String,
    receiver: String,
    amount: Number,
    date: {type: Date, default: Date.now }
})
const Transaction = mongoose.model('Transaction', transactionSchema);

const getAll = (req, res) => {
    Transaction.find((err, docs) => {
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transactions": docs
                }
            });
        }
    })
}    

const create = (req, res) => {
    let transaction = new Transaction();
    transaction.sender = "Aiden";
    transaction.receiver = "Jesse";
    transaction.amount = 3;
    transaction.save((err, doc) => {
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transaction": doc
                }
            });
        }
    })
}

module.exports = {
    getAll,
    create
}