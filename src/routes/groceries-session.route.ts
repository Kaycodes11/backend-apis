import {NextFunction, Request, Response, Router} from "express";

const router = Router();

type Grocery = { item: string, quantity: number };

const groceriesList: Grocery[] = [{item: "milk", quantity: 2}, {item: "juice", quantity: 1}];

// applying this middleware for just this "grocery" routes

// router.use((req, res, next) => {
//   if (req.session.user) {
//     return next();
//   }
//   res.status(401);
// });


router.get("/", (req, res) => {
    // cookies data will be kept within client's browser cookie section
    res.cookie("visited", "true", {maxAge: 60000});
    res.status(200).json(groceriesList);
});

router.get("/:item", (req, res) => {
    // to be able to get cookies from req.cookies "use the cookie-parser library"
    console.log("cookie: ", req.cookies);
    const grocery = groceriesList.find((g) => g.item === req.params.item) || null;
    res.status(200).json(grocery);
});

router.post("/", (req, res) => {
    groceriesList.push(req.body);
    res.status(201).json(groceriesList);
});

router.get("/shopping/cart", (req, res) => {
    // @ts-ignore
    const {cart} = req.session;
    console.log(cart);
    if (!cart) {
        res.send("U have no cart session");
    } else {
        res.status(200).json(cart);
    }
});

router.post("/shopping/cart/item", (req, res) => {
    const {item, quantity} = req.body;
    const cartItem = {item, quantity};
    // @ts-ignore
    if (req.session.cart) {
        // @ts-ignore
        req.session.cart.items.push(cartItem);
    } else {
        // @ts-ignore
        req.session.cart = {
            items: [cartItem],
        };
    }
    res.send(201);
});

export default router;

