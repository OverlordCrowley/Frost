
const http = require('node:http');
const db = require("./database");
const url = require('url');

db.connect();

const server = http.createServer((req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.writeHead(200, {'Content-Type': 'application/json'});

    if(req.method === "GET" && req.url === '/category'){
        db.query(`SELECT * FROM category`, (err, result)=>{
            if(!err){
                res.end(JSON.stringify(result.rows))
                res.statusCode = 200;
            }
            else{
                console.log(err.message);
            }
        })
    }

    if(req.method === "POST" && req.url.includes('/product')){
        const parsedUrl = url.parse(req.url, true);
        const queryParameters = parsedUrl.query;

        if(queryParameters.brandId){
            console.log('ff')
            console.log('decalete but booott')
        }

        console.log(queryParameters.name)
        db.query(`SELECT * FROM category`, (err, result)=>{
            if(!err){
                res.end(JSON.stringify(result.rows))
                res.statusCode = 200;
            }
            else{
                console.log(err.message);
            }
        })

    }

    if(req.method === "GET" && req.url.includes('/model')){
        const parsedUrl = url.parse(req.url, true);
        const queryParameters = parsedUrl.query;

           db.query(`SELECT * FROM model WHERE brand_id = ${queryParameters.brandid}`, (err, result)=>{
               if(!err){
                   res.statusCode = 200;
                   res.end(JSON.stringify(result.rows))
               }
               else{
                   console.log(err.message);
                   res.end()
               }
           })
    }

    if(req.method === "GET" && req.url.includes('/generations')){
        let parsedUrlGener = url.parse(req.url, true);
        const {modelId} = parsedUrlGener.query;

        console.log(modelId)



        db.query(`SELECT * FROM generations_chain WHERE model = ${modelId}`, (err, result)=>{
            if(!err){
                res.statusCode = 200;
                res.end(JSON.stringify(result.rows))
            }
            else{
                console.log(err.message);
                res.end()
            }
        })
    }

    if(req.method === "GET" && req.url === '/mark'){
        db.query(`SELECT * FROM brand`, (err, result)=>{
            if(!err){
                res.end(JSON.stringify(result.rows))
                res.statusCode = 200;
            }
            else{
                console.log(err.message);
            }
        })
    }



})

server.listen(8080);