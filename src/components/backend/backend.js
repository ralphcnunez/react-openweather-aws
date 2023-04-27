

const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;



let data1 = JSON.stringify({"city":{"id":292932,"name":"Ajman","coord":{"lat":25.3994,"lon":55.4797},"country":"AE","population":226172,"timezone":14400,"sunrise":1682559917,"sunset":1682606762},"cod":"200","message":0,"cnt":40,"list":[]})

const s3 = new AWS.S3();

   (async () => { s3.putObject({
        Body: data1,
        Bucket: "ruby-api-s3-test",
        Key: "my-file.txt"
     }).promise();
    })();





