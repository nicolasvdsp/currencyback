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

    } catch {
        res.json({
            "status": "error",
            "message": "Could not make the transaction"
        });
    }
}

//updateBalanceSender niet als aparte functie, (te beel php achtige code)
//eerst met callbacks werken, nadien eventueel refactoren naar promises (await async)
//increment kan je rechtstreeks in een User.update({username: sender} {balance $inc{....}}) iets in die aard doen

let currentBalance;
const updateBalanceSender = (sender, amount) => {
    let newBalance;
    User.find({username: sender}, (err, user) => {
        User.update
        currentBalance = user[0].balance;
        newBalance = currentBalance + amount;
        console.log(`${currentBalance} becomes ${newBalance}`);
        user.balance = newBalance;
        console.log(user);
        res.send
    });
}

module.exports = {
    getAll,
    create
}