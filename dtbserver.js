var express = require("express")
var app = express()
var db = require("./datastore.js")
var md5 = require("md5")
var server = require("http").createServer(app)
var https = require("https")
var fs = require("fs")
var WebSocket = require("ws")
var mqtt = require("mqtt")

var HTTP_PORT = 3000 
const MQTT_HOST = "3.144.125.66"
const MQTT_PORT = 1883
const MQTT_ID = "MAIN_SERVER" 
var hostIp = "localhost"
const connect_url = `mqtt://${MQTT_HOST}:${MQTT_PORT}`

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const MQTT_CLIENT = mqtt.connect(connect_url, {
    MQTT_ID, clean: true,
    connectTimeout: 4000,
    username: "jack",
    password: "password",
    reconnectPeriod: 1000
})

const topic = 'Home/lamp1'
MQTT_CLIENT.on('connect', () => {
  console.log(`Connected to MQTT server at ${MQTT_HOST}`)
  MQTT_CLIENT.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  MQTT_CLIENT.publish(topic, '0', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})

MQTT_CLIENT.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

const wss = new WebSocket.Server({ server:server })
app.use(express.static(__dirname +'/open'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

 
wss.on('connection', function connection(ws) {
    console.log("New client connected")
    ws.send('something');

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
});

app.get("/",(req,res)=>{ 
    res.send("SERVER IS ON")
    console.log("HTTP CLIENT CONNECTED")
});

app.get("/white",(req,res)=>{ 
  res.sendStatus(200)
  console.log("White light trigger")
  MQTT_CLIENT.publish("Home/ctrl", 'A', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })

});

app.get("/warm",(req,res)=>{ 
  res.sendStatus(200)
  console.log("Warm light trigger")
  MQTT_CLIENT.publish("Home/ctrl", 'B', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })

});

app.get("/fan",(req,res)=>{ 
  res.sendStatus(200)
  console.log("fan trigger")
  MQTT_CLIENT.publish("Home/ctrl", 'C', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })

});


// Start server
server.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

https.createServer(options, app)
.listen(8000, function (req, res) {
  //res.writeHead(200);
  //res.end("Secure server\n");
  console.log("HTTPS SERVER AT 8000")
});
