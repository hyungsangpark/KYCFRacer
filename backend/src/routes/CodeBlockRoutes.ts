import express from "express";
import CodeBlockController from "../controllers/CodeBlockController";
import {
  Schemas,
  ValidateBody,
  ValidateQuery,
} from "../middleware/InputValidation/Joi";

const router = express.Router();

/**
 * Router file for the CodeBlockController methods
 */

router.get(
  "/",
  ValidateQuery(Schemas.codeBlock.get),
  CodeBlockController.getRandomCodeBlockBySettings
);
router.post(
  "/",
  ValidateBody(Schemas.codeBlock.create),
  CodeBlockController.createCodeBlock
);
router.get("/:id", CodeBlockController.getCodeBlock);

export = router;
