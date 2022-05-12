const Transaction = require('../models/Transactions');
const User = require('../models/Users');


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

const create = async (req, res) => {
    try {
        const amount = req.body.amount;
        const sender = await User.find(
            { username: req.body.sender}, 'balance'
        );
        const senderBalance = sender[0].balance;
        
        if(senderBalance >= amount) {
            let transaction = new Transaction();
            transaction.sender = req.body.sender;
            transaction.receiver = req.body.receiver;
            transaction.amount = req.body.amount;
        
            const transactionSaved = await transaction.save();

            await User.updateOne(
                { username: transaction.receiver },
                { $inc: {balance: (transaction.amount)} }
            );
            await User.updateOne(
                { username: transaction.sender },
                { $inc: {balance: -(transaction.amount)} }
            );

            res.json({
                "status": "success",
                "data": {
                    "transaction": transactionSaved
                }
            });
        } else {
            res.json({
                "status": "error",
                "message": "You're to broke for this man"
            })
        }
    } catch {
        res.json({
            "status": "error",
            "message": "Could not make the transaction"
        });
    }
}

module.exports = {
    getAll,
    create
}