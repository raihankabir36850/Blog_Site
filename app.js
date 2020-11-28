const express = require('express');
const mongoose= require('mongoose');
const cookieParser= require('cookie-parser');
const dotenv= require('dotenv').config()

console.log(dotenv.parsed)

const blogRoutes= require('./routes/blogRoutes')
const authRoutes= require('./routes/authRoutes')

const {checkUser} = require('./middleware/authMiddleware');

//express app
const app = express();

// connect to mongoDB
const PORT = process.env.PORT || 3000
const dbURI='mongodb+srv://netninja:rifatku.com32@cluster0.km9lm.mongodb.net/nodenuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true })
   .then((result)=> app.listen(PORT))
   .catch((err) => console.log(err));


//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about',{ title:'About'});
});



//blog-routes
app.use('/blogs',blogRoutes);

//register & login
app.use(authRoutes);




//redirects
app.get('/about-me', (req,res) => {
    res.render('about',{ title:'About'});
});

app.use((req,res) => {
    res.status(404).render('404',{ title:'Error'});
});

