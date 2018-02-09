const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.static(`${__dirname}/public`));
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
