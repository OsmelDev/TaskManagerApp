const dotenv = require('dotenv').config();

const PORT = process.env.PORT_NODE
const HOST = process.env.HOST 
const SECRET_KEY = process.env.SECRET_KEY
const MONGOOSE_CONECT = process.env.MONGOOSE_CONECT
const PASS = process.env.MONGO_DB_PASS
const SALT_ROUNDS = 10
const taskFlowUser = {
  email: "taskflow@suport.com",
  id:"505025" 
}
 module.exports = {PORT, HOST, SECRET_KEY, SALT_ROUNDS,  MONGOOSE_CONECT, PASS, taskFlowUser}  