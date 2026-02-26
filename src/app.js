const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Paths for Express
const plcDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Handblebar setup
app.set('view engine', 'hbs') //handlebar caller
app.set('views', viewPath) //handlebar pather
hbs.registerPartials(partialPath)

//Static dir setup
app.use(express.static(plcDirPath))

// Render root
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Vagif'
    })
})

// Render About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vagif Hasanli'
    })
})

// Render Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'Help you get started',
        name: 'Vagif Hasanli'

    })
})

// Render Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Search item required'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search item required!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 Not Found page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'HELP NOT FOUND',
        name: 'Vagif Hasanli'
    })
})


// 404 Not Found page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 NOT FOUND',
        name: 'Vagif Hasanli'
    })
})

app.listen(3000, () => {
    console.log('Server is up.')
})