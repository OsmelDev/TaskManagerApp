const User = require("../schemas/user")
const bcrypt = require('bcrypt')
const createAccessToken = require('../libs/jwt')
const { SECRET_KEY, SALT_ROUNDS } = require("../config")
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const {email, password, name} = req.body
    const userFound = await User.findOne({ email:email })  
    if (userFound) return res.status(400).send({ message: "Ya existe un usuario con ese correo" })
    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = new User({
      email,
      name,
      password:hashedPassword
    })

    const userSaved = await newUser.save()

    const token = await createAccessToken({ id: userSaved._id })
    return res.status(200).cookie("flowToken", token).json({message:"Cuenta creada"})
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({ email }) 
    
    if (!userFound) {
      return res.status(404).send({ message: "No se encuentra el usuario" })
    }
    
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) return res.status(400).send({message:"Password incorrect"});
  
    const token = await createAccessToken({ id: userFound._id });
    

    return res.status(200).cookie("flowToken", token).json({
     id:userFound._id,
      email: userFound.email,
      name:userFound.name,
      createAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  
  } catch (error) {
    return res.status(500).send(error)
  }
}
 
const verifyToken = async (req, res) => {
  const { flowToken } = req.cookies;
  
  if (!flowToken) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(flowToken, SECRET_KEY, async (err, user) => {
    if (err) return res.status(500).json({ message: "Error desde el servidor" });;
    try {
      const userFound = await User.findById(user.id);

      if (!userFound) return res.status(401).json({ message: "Unauthorized" });

      return res.status(200).json({
        email: userFound.email,
        id:userFound._id,
        name:userFound.name,
        createAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
    } catch (error) {
     return res.status(400).send(error)
    }
  })
}
 

  const logout = (req, res) => {
    return res.status(200)
      .cookie("flowToken", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
      .json({ message: "Sesión cerrada" });
  };


module.exports = {register, login, verifyToken, logout}