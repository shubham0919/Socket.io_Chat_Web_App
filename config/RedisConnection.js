const redis = require('redis')
const client = redis.createClient()
client.connect(console.log('Redis Connected...')).catch(console.error)
module.exports = client