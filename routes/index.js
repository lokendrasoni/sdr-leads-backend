const authRoutes = require("./auth");
const { isAuth } = require("../middlewares");

module.exports = (app) => {
    app.use("/api/auth", authRoutes);

    app.all('/*', (req, res) => {
        res.status(404).send({ errno: 404, message: 'Endpoint not found', type: "INVALID_ENDPOINT" });
    });
}