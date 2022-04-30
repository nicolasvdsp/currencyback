const Transaction = require('../models/Transactions');


const getAll = (req, res) => {
    Transaction.find((err, docs) => {
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transactions": docs
                }
            });
        } else {
            res.json({
                "status": "error",
                "message": "Could not load all the transactions"
            });
        }
    })
}    

const create = (req, res) => {
    let transaction = new Transaction();
    transaction.sender = req.body.sender;
    transaction.receiver = req.body.receiver;
    transaction.amount = req.body.amount;
    transaction.save((err, doc) => {
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transaction": doc
                }
            });
        } else {
            res.json({
                "status": "error",
                "message": "Could not make the transaction"
            });
        }
    })
}

module.exports = {
    getAll,
    create
}