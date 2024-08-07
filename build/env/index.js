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

// src/env/index.ts
var env_exports = {};
__export(env_exports, {
  env: () => env
});
module.exports = __toCommonJS(env_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  env
});
