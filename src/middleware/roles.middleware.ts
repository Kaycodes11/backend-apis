import AuthRoute from "../routes/auth.route";
import {NextFunction, Request, Response} from "express";

type UserRole = "USER" | "ADMIN" | "EDITOR" | "GUEST";

interface CustomRequest extends Request {
    roles: UserRole[];
}

type Roles = {
    roles: UserRole[];
}


// const r1: UserRole[] | UserRole = ["ADMIN", "USER", "EDITOR"];


function verifyRoles(...roles: UserRole[]) {
    return (req: Request & Roles, res: Response, next: NextFunction) => {
        if (!req.roles) return res.sendStatus(401);
        const rolesArray = [...roles];
        console.log("ROLES: ", rolesArray, req.roles);
        const result = req.roles.map((role: UserRole) => rolesArray.includes(role)).find((val) => val);
        if (!result) return res.sendStatus(401);
        next();
    }
}

export default verifyRoles;
