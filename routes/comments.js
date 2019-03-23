var express = require('express');
var router = express.Router();

/* GET comments listing. */
router.get('/', function(req, res, next) {
    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function(err) {
        const db = client.db('oscillator');
        const collection = db.collection('comments');

        const comments = collection.find({})
            .sort({'when': -1}).toArray()
        .then((docs) => {
            res.json({'comments': docs});
            client.close();
        });
    });
});

/* PUT new comment. */
router.put('/add', function(req, res, next) {
    let name = req.body.name;
    let comment = req.body.comment;
    let dateFormat = require('dateformat');
    let now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function(err) {
        const db = client.db('oscillator');
        const collection = db.collection('comments');

        let newEntry = {
            "who": name,
            "when": now,
            "comment": comment
        };

        collection.insertMany([newEntry],
            function(err, result) {
                res.json(result.ops);
                client.close();
            });
    });
});

module.exports = router;
