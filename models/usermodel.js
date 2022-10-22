const mongoose=require('mongoose');
const {isEmail}=require('validator')
const bcrypt=require('bcryptjs')

const userSchema = mongoose.Schema({
    nom: { type:String, require:true },
    email:{ 
        type:String,
        lowercase:true ,
        require:true, 
        unique:true, 
        index:true,
        validate:[isEmail,"email incorrecte"]
    },
    password:{ 
        type:String, 
        require:true, 
    },
    picture:{
        type:String
    },

    nouveauMessage:{
        type:Object,
        default:{}
    },
    statut:{
        type:String,
        default:'en ligne'
    }
}
,{
    minimize:false
})

userSchema.pre('save',function(next) {
    const user=this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password,salt, function(err,hash){
            if(err) return next(err)

            user.password=hash;
            next();
        })
    })
})



userSchema.methods.toJSON=function() {
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.statics.findByCredentials= async function(email,password){
    const user= await User.findOne({email});
    if (!user) throw new error('email ou mot de passe invalide');
   
    const isMatch=await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return user;
    }
return user;
}


const User=mongoose.model("user",userSchema);
module.exports=User;
