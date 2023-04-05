import express from "express";
import { getAll, getOne,createFighter, updateFighter, deleteFighter} from "./fighter.controller.js";
import { authSecury } from "../middleware/auth.middleware.js";
import { check } from "express-validator";

const router = express.Router()

router.route('/').post(
    authSecury,
    [
        check('name','name is required').notEmpty(),
        check('age','age is required').notEmpty(),
        check('category','category is required').notEmpty(),
        check('weight','weight is required').notEmpty()

    ],
    createFighter
)
router.route('/').get(getAll)
router.route('/:id').put(authSecury,updateFighter)

router.route('/:id').get(getOne)
router.route('/:id').delete(authSecury,deleteFighter)

export default router