const express = require('express');
const router = express.Router();



// router.get('/', transactionsController.getAll);
router.get("/", (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transactions": []
        }
    });
});

router.post("/", (req, res) => {
    res.json({
        "status": "error",
        "data": {
            "transaction": {
                "sender": "Aiden",
                "receiver": "Jesse",
                "amount": "420",
                "date": "25/12/2020"
            }
        }
    });
})

module.exports = router;