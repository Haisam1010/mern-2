import { Router } from "express";
import { logOut, login,register } from "../controllers/authController.js";
import { validateRegisterInput,validateLoginInput, updateValidation} from "../middleware/validationMiddleware.js";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { authPermission } from "../middleware/authMiddleware.js";



const router = Router()

router.get('/currentuser',getCurrentUser)
router.get('/admin/stats',[
    authPermission('admin'),
],getApplicationStats)
router.patch('/updateuser',updateValidation,updateUser)

export default router
