
const express = require('express')
const path = require('path')
const fsPromises = require('fs/promises')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('public/index.html')
})

app.get('/random', async (req,res) => {
    const file = await fsPromises.readFile('./data.json')
    const data = JSON.parse(file)
    res.send(`<video controls autoplay width='100%' max-height='100%' src="${data.video['1080p']}">`)
})

app.listen(port, () => {
    console.log('Listening on 3000')
})