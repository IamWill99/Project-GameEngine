import { Router, Request, Response } from "express";

export const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({
        hello: "world",
    });
});

router.post("/gameobject/add", (req: Request, res: Response) => {
    console.log(req.body);
    res.sendStatus(204);
});
