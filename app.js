const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const user_route = require("./server/routes/user")

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/client/public'));

app.get('/', (req, res) => {
    res.sendFile('./client/public/index.html', { root: __dirname });
});

user_route.configure(app);

var server = app.listen(7005, function() {
	console.log('user-ms listening on port ' + server.address().port);
});
