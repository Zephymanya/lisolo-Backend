const router = require("express").Router();
const User = require("../models/usermodel");
const jwt=require('jwt-simple')
const bcrypt=require('bcryptjs')


router.post("/", async (req, res) => {
  try {
    const { nom, email, password, picture } = req.body;
    console.log(nom);
    const user = await User.create({
      nom,
      email,
      password,
      picture,
    });
    res.status(201).json({ message: user });
  } catch (error) {
    let msg;
    if (error.cod == 18900) msg = "l'utilisateur n'existe pas";
    console.log(error);
    res.status(404).json(msg);
  }
});

// Connexion de l'utilisateur

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByCredentials(email, password);
//     user.status = "ligne";
//     await user.save();
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json(error.message);
//     console.log(error);
//   }
// });



// usage de Passport js

router.get("/liste_sers",(req,res)=>{
User.find()
  .then((user)=>{
    res.status(201).json({user})
  })
  .catch((err)=>{
    res.status(404).json({message:"impossible d'avoir la liste"})
    console.log(err);
  })
})

router.post("/login", (req, res)=>{
  User.findOne({email : req.body.email})
  .then(user =>{
      if(!user){res.status(401).json({
          message: 'email ou mot de passe incorrect'
      })}
      else{
          const payload = {
              id:user._id,
              nom : user.userName,
              email : user.email,
              expire : 24*60*60*1000
          }
          const token = jwt.encode(payload, '|Bk28051996|')
          bcrypt.compare(req.body.password, user.password)
          .then(valid =>{
              if(!valid){res.status(401).json({
                  message: 'email ou mot de passe incorrect'
              })}
              else{
                  delete user.password
                  res.status(200).json({
                      userId: user._id,
                      token : `Bearer ${token}`,
                      userName : user.userName
                  })
              }
          })
          .catch(err => res.status(400).json({err}))
      }
  })
}) 



module.exports = router;
