const authRoutes = require("./auth");
const leadsRoutes = require("./leads");

module.exports = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/leads", leadsRoutes);

    app.all('/*', (req, res) => {
        res.status(404).send({ errno: 404, message: 'Endpoint not found', type: "INVALID_ENDPOINT" });
    });
}