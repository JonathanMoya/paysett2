var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://jonathanmoya:jonathanmoya@cluster0.oh0wz.mongodb.net/paysett?retryWrites=true&w=majority";

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
    var dbo = db.db("PaySett");
    if (err) throw err;
    console.log('baseConectada');
    // rooms.createRoom();
    // dbo.createCollection("stock", function (err, res) {
    //     if (err) throw err;
    //     console.log("Collection created!");
    //     db.close();
    // });
});
exports.uploadFile = function (data, callback) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async function (err, db) {
        var dbo = db.db('PaySett');
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            if (data[i].quantity > 0) {
                await dbo.collection('stock').updateOne({productId: data[i].productId}, {
                    $inc: {quantity: data[i].quantity, totalCost: data[i].cost}
                }).then(res => {
                    if (res.result.nModified === 0) {
                        dbo.collection('stock').insertOne({
                            productId: data[i].productId,
                            quantity: data[i].quantity,
                            totalCost: data[i].cost,
                            name: data[i].name,
                            category: data[i].category
                        }).then(r => {
                            if (i === data.length - 1) {
                                callback('Termine')
                            }
                        })
                    } else {
                        if (i === data.length - 1) {
                            callback('Termine')
                        }
                    }
                })
            }
        }
    });
}

exports.getAllData = function (callback) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async function (err, db) {
        var dbo = db.db('PaySett');
        if (err) throw err;
        dbo.collection('stock').find({}, {projection: {_id: 0}}).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
}
