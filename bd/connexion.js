const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://Mayembe:0827579017m@cluster0.6xdmeic.mongodb.net/chatbd?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log(err));