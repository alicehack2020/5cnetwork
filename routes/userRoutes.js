import express from "express"
const router=express.Router();

import userController from "../controllers/userController.js"
//public routes
router.get('/getAllUser',userController.getAllUser);
router.get('/add/:username',userController.addUser);
router.get('/searchUser',userController.searchUser);
router.delete('/deleteUser/:username',userController.deleteUser);
router.patch('/updateUser/:username',userController.updateUser);
router.get('/sortUser',userController.sortUser);
router.get('/mutually/:username',userController.mutually);




 

  

export default router;