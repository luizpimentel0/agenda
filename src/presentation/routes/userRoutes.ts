import { Router } from "express";
import { UserController } from "@presentation/controllers/UserController";
import { validateDTO } from "@presentation/controllers/middlewares/validateDTO";
import { UserDTO } from "@presentation/dtos/UserDTO";

const router = Router();

const userController = new UserController();

router.post("/users", validateDTO(UserDTO), async (req, res, next) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    next(error);
  }
});

// router.get("/users", (req, res) => {res.send ("User routes")});

export default router;
