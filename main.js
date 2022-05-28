
const express = require('express')
const path = require('path')
const fsPromises = require('fs/promises')

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('public/index.html')
})

async function buildHTML(data) {
    const video = data.video['1080p']
    return `<video controls autoplay width='100%' max-height='100%' src="${video}">`
}

app.get('/random', async (req,res) => {
    // const file = await fsPromises.readFile('./data.json')
    try {
        const blob = await fetch('https://owen-wilson-wow-api.herokuapp.com/wows/random')
        const data = await blob.json()
        const html = await buildHTML(data[0])
        res.send(html)
    }
    catch (e) {
        console.error(e)
    }
})

app.listen(port, () => {
    console.log('Listening on 3000')
})