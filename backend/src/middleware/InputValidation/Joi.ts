import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import Logger from "../../util/Logger";
import { ICodeBlock } from "../../models/CodeBlock";
import { IMatchHistory } from "../../models/MatchHistory";

/**
 * This file makes use of JOI validation library to validate the input from the client for any required endpoints.
 */

/**
 * Validates the body of the request given a specific schema.
 * @param schema
 * @constructor
 */
export const ValidateBody = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logger.error(error);

      return res.status(422).json({ error });
    }
  };
};

/**
 * Validates the query of the request given a specific schema.
 * @param schema
 * @constructor
 */
export const ValidateQuery = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.query);

      next();
    } catch (error) {
      Logger.error(error);

      return res.status(422).json({ error });
    }
  };
};

/**
 * Schema object used for validation by the JOI library.
 */
export const Schemas = {
  matchHistory: {
    create: Joi.object<IMatchHistory>({
      avgCPM: Joi.number().required(),
      avgAccuracy: Joi.number().required(),
      avgErrors: Joi.number().required(),
      codeBlockId: Joi.string().required(),
    }),
  },
  avatar: {
    setUserAvatar: Joi.object({
      avatarId: Joi.string().required(),
    }),
  },
  codeBlock: {
    create: Joi.object<ICodeBlock>({
      language: Joi.string().required(),
      time: Joi.string().required(),
      code: Joi.string().required(),
    }),
    get: Joi.object({
      language: Joi.string().required(),
      time: Joi.string().required(),
      limit: Joi.number().optional(),
    }),
  },
};
