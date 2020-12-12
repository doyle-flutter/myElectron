const express = require('express'),
    app = express();
app.listen(3003);

app.get('/', (req,res) => res.json([1,2,3]));