import express from 'express';
import {Child, ChildModel, ParentModel} from "../models/oneToMany/parent-child";

const router = express.Router();

// get children by parentId
router.get('/:id', async (req: express.Request, res: express.Response) => {
    const children = await ParentModel.findById(req.params.id).populate<{child: Child}>('child').orFail();
    res.status(200).json(children);
});

router.post('/newChild', async (req: express.Request, res: express.Response) => {
    const child = new ChildModel({name: req.body.name});
    await child.save();
    const parent = await ParentModel.create({
        name: "Goku",
        child: child._id
    });
    res.status(201).json(parent);
});

export default router;
