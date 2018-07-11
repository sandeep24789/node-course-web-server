const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('View Engine', 'hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=> {
        if(err) {
            console.log('Unable to write log');
        }
    });
     next();
});

// app.use((req,res,next)=> {
// res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res)=>{
    // res.send('<h1>Hello World!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        WelcomeMsg: 'Welcome to our website!'
    });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        WelcomeMsg: 'Welcome to our website!'
    });
});

app.get('/projects', (req,res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        WelcomeMsg: 'Welcome to Node World!'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errormessage: 'Unable to handle the request' 
    });
});


app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
});