"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/database.ts
var database_exports = {};
__export(database_exports, {
  configKnex: () => configKnex,
  knex: () => knex
});
module.exports = __toCommonJS(database_exports);
var import_knex = require("knex");

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod = require("zod");
var ENV_SCHEMA = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production"]).default("production"),
  DATABASE_URL: import_zod.z.string(),
  PORT: import_zod.z.number().default(21031)
});
(0, import_dotenv.config)();
var envValidator = ENV_SCHEMA.safeParse(process.env);
if (!envValidator.success) {
  console.log(`Invalid enviroment`, envValidator.error.format());
  throw new Error(`Invalid enviroment`);
}
var env = envValidator.data;

// src/database.ts
var configKnex = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var knex = (0, import_knex.knex)(configKnex);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configKnex,
  knex
});
