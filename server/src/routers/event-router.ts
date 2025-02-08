import { upload } from "./../middlewares/upload-middleware";
import express from "express";

import {
  CreateEvent,
  GetSingleEvent,
  GetAllEvents,
} from "../controllers/event-controller";

const router = express.Router();

router.route("/").get(GetAllEvents).post(upload.single("image"), CreateEvent);
router.route("/:id").get(GetSingleEvent);
export default router;
