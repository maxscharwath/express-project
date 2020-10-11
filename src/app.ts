import dotenv from "dotenv";
import express from "express";
import http from "http";
import internalIp from "internal-ip";
import router from "./routes/router";

dotenv.config();

const port = parseInt(process.env.SERVER_PORT);

const app = express();
const server = http.createServer(app);

app.use("/", router);

app.get("/route", (req, res) => {
    const routes: any[] = [];
    app._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            middleware.handle.stack.forEach((handler: any) => {
                const route = handler.route;
                route && routes.push(route);
            });
        }
    });
    res.json(routes.map((route) => route.path));
});

server.listen(port, "0.0.0.0", () => {
    console.log(`server started at http://${internalIp.v4.sync()}:${port}`);
});
