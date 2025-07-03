const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST 
const SECRET_KEY = "password_secret_undefined"
const SALT_ROUNDS = 10
const MONGOOSE_CONECT = "mongodb+srv://Osmel:ZifG631cs8HgquXW@cluster0.0ub87.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PASS = process.env.MONGO_DB_PASS
const taskFlowUser = {
  email: "taskflow@suport.com",
  id:"505025"
}
 module.exports = {PORT, HOST, SECRET_KEY, SALT_ROUNDS,  MONGOOSE_CONECT, PASS, taskFlowUser} 