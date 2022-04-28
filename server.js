const express = require('express');

const app = express();
const PORT = 3000;

function sendFile(res) {
    return res.sendFile('index.html', { root: './dist' }, error => {
        console.log(error);
    });
}

app.use(express.static('./dist'));

app.get('*', (req, res) => sendFile(res));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});