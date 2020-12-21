const express = require('express')
const app = express()

const exphbs = require('express-handlebars')

const movieList = require('./movieList.json')

const port = 3000

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

//querystring
app.get('/search', (req, res) => {
  const movieSearch = movieList.results.filter((movie) => {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  console.log(movieSearch)
  res.render('index', { movies: movieSearch, keyword: req.query.keyword })

})



app.get('/movies/:movie_id', (req, res) => {

  // method 1 自己想 直接從arr找
  // res.render('show', { movies: movieList.results[req.params.movie_id - 1] })

  //method 2 filter
  //req.params.movie_id  is from route
  // console.log('req.params.movie_id', req.params.movie_id)
  // const movieNum = movieList.results.filter(movie => movie.id.toString() === req.params.movie_id)
  // //movieNum is an arr having one item
  // res.render('show', { movies: movieNum[0] })

  //method 3 find
  const movieNum = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movies: movieNum })

})

app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})

// static files