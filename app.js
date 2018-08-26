const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const cors = require('cors')
const port = process.env.PORT || 3000

const app = express()

// app.use(cors)
app.use(bodyParser.json())

function separatePublicStashes(array){
    let publicStashes = []
    array.map(stash => {
        if (stash.public === true){
            publicStashes.push(stash)
        }
    })
    return publicStashes
}

app.get('/', (req, res) => {
    fetch('http://api.pathofexile.com/public-stash-tabs')
    .then(response => response.json()).then(response => separatePublicStashes(response.stashes))
    .then(publicStashes => res.send(publicStashes))
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})