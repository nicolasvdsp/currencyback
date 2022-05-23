const Transaction = require('../models/Transactions');
const User = require('../models/Users');
const auth = require('../controllers/auth')
  
const getAll = async (req, res) => {
    try {
        const user = auth.decodeToken(req.body.token);

        const result = await Transaction.find(
            { $or: [{receiver: user.username}, {sender: user.username}]}
        ).sort(
            { date: 'desc' }
        )

        res.json({
            "status": "success",
            "data": {
                "transactions": result
            }
        })
    } catch {
        res.json({
            "status": "error",
            "message": "Could not load all the transactions"
        });
    }
}    

const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Transaction.findById(id);

        res.json({
            "status": "success",
            "data": {
                "transactions": result
            }
        });
    } catch {
        res.json({
            "status": "error",
            "message": "Could not load your transaction"
        })
    }
}

const create = async (req, res) => {
    try {
        console.log(req.body.token);
        const user = auth.decodeToken(req.body.token);
        const amount = req.body.amount;
        const sender = await User.find(
            { username: user.username}
        );
        const senderBalance = sender[0].balance;
        
        if(senderBalance >= amount) {
            let transaction = new Transaction();
            transaction.sender = user.username;
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
    getOne,
    create
}