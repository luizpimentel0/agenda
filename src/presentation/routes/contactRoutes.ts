import { ContactController } from "@presentation/controllers/ContactController";
import { validateDTO } from "@presentation/controllers/middlewares/validateDTO";
import { ContactDTO } from "@presentation/dtos/ContactDTO";
import { Router } from "express";

const router = Router();

const contactController = new ContactController();

router.post('/contacts', validateDTO(ContactDTO), async (req, res, next) => {
  try {
    await contactController.createContact(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/contacts/:username', async (req, res, next) => {
  try {
    await contactController.getContactByUsername(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
