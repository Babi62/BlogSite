const exp = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { filter } = require('lodash');


// express app
const app = exp();

//connection to mangodb
const connectionURI = 'mongodb+srv://Bloger:blogAdmin@cluster0.i2axhcj.mongodb.net/NodeProj?retryWrites=true&w=majority';
mongoose.connect(connectionURI)
    .then((result) => {
        // listening for requests
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })

//register view engine
app.set('view engine', 'ejs');
app.set('views', 'templates'); // telling server views are found in templates folder

// listening for requests
// app.listen(3000);

//custom middelware
/* app.use((req, res, next) => {
    console.log('New request made:')
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();// continue to the next middelware app.get() function.
}); */

//middleware & staticfiles
app.use(exp.static('public'));

//middleware to convert all data that come into a string
app.use(exp.urlencoded({ extended: true }));

// 3rd party middleware
app.use(morgan('dev'));

/* 
// mongosse and mango snadbox routes
// saving data to the database
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about blog 2',
        body: 'more about blog 2'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// getting data to the database
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
})

// finding a single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('65c9c9a82514987db67e5867')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
})
 */

//routes
app.get('/', (req, res) => {
    //res.send('<h1>Home page</h1>')
    //res.sendFile('./Html/index.html', { root: __dirname });

    // Passing data into views
    /* const blogs = [
        { blogTitle: 'Unhealthy Foods You Should Cut Out', snippet: 'Maintaining a healthy lifestyle is a priority for many', blogBody: '' },
        { blogTitle: '“We deserved to be in the finals, not Nigeria” – South Africa Coach', snippet: 'Abidjan, Cote D’ Ivoire, Feb. 08, GNA – Hugo Broos Head Coach of South Africa', blogBody: '' },
        { blogTitle: 'Zelenskyy\'s military command shakeup divides Ukrainians, but soldiers unfazed', snippet: 'Commander of the Ukrainian army, Col. Gen. Oleksandr Syrskyi, gives instructions in a shelter in Soledar, the site of heavy battles with the Russian forces, Donetsk region', blogBody: '' },
    ]; */

    //using ejs rendering views 
    //res.render('index', { title: 'Home', blogs });

    // redirecting 
    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    //res.sendFile('./Html/about.html', { root: __dirname });


    //using ejs rendering views 
    res.render('about', { title: 'About' });

});


// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'blogs Details' })
        })
        .catch((err) => {
            console.log(err)
        })
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            console.log('Blog deleted successfully');
            res.json({ redirect: '/blogs', showAlert: true });
        })
        .catch((err) => {
            console.log(err)
        })
});

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about')
});

// 404 page
// should always be at the bottom 
app.use((req, res) => {
    res.status(404).render('404', { title: 'Error' })
});