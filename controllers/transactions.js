const getAll = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transactions": []
        }
    });
}

const create = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transaction": {
                "sender": "Aiden",
                "receiver": "Jesse",
                "amount": "420",
                "date": "25/12/2020"
            }
        }
    });
}

module.exports = {
    getAll,
    create
}