const app = require("./app.js");
const { PORT } = require("./config");

app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
});