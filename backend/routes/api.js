const express = require('express');
const bodyParser = require('body-parser');
const db = require('./../bd')
const apiRouter = express.Router();
const Validator = require('jsonschema').Validator;

apiRouter.use(bodyParser.json());
apiRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res) => {
        db.getAllData((resp) => {
            res.send(resp);
        })
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.send('POST operation not supported on /')
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.send('PUT operation not supported on /')
    })

const schemaProducts = {
    "type": "object",
    "properties": {
        "dateAndTime": {
            "type": "string",
            "format": "date"
        },
        "madeBy": {
            "type": "string",
            maxLength: 100
        },
        "products": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "productId": {"type": "string", maxLength: 20},
                    "quantity": {"type": "number"},
                    "cost": {"type": "number"},
                    "name": {"type": "string", maxLength: 100},
                    "description": {"type": "string", maxLength: 500},
                    "category": {"type": "string"}
                },
                "required": [
                    "productId",
                    "quantity",
                    "cost",
                    "name",
                    "category"
                ]
            }
        }
    }
};

const validatorProducts = x => new Validator().validate(x, schemaProducts, {nestedErrors: true, required: true});
const uploadBd = (x,y, callback) => db[y](x, callback)

const uploadFile = (req, res) => {
    var result = validatorProducts(req.body);
    if (result.errors.length !== 0) {
        res.send(result.errors[0])
    } else {
        uploadBd(req.body.products, 'uploadFile', resp=>{
            res.send({res: 'Ok'})
        })
    }
}

apiRouter.route('/upload')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.send('GET operation not supported on /upload')
    })
    .post(uploadFile)
    .put((req, res, next) => {
        res.statusCode = 403;
        res.send('PUT operation not supported on /upload')
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.send('PUT operation not supported on /upload')
    })

module.exports = apiRouter;
