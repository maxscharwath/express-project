import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
    res.send("OK");
});

export default router;
