"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/routes/auth.ts
var auth_exports = {};
__export(auth_exports, {
  authRoutes: () => authRoutes
});
module.exports = __toCommonJS(auth_exports);
var import_node_crypto = __toESM(require("crypto"));
var import_zod = require("zod");
function authRoutes(knex) {
  return (app) => __async(this, null, function* () {
    app.post("/register", (request, reply) => __async(this, null, function* () {
      try {
        const registerUserParamsSchema = import_zod.z.object({
          email: import_zod.z.string(),
          password: import_zod.z.string()
        });
        const { email, password } = registerUserParamsSchema.parse(request.body);
        yield knex("users").insert({
          id: import_node_crypto.default.randomUUID(),
          email,
          password
        });
        return reply.status(201).send();
      } catch (err) {
        reply.status(400).send("Erro, verifique as propriedades, EMAIL e PASSWORD");
      }
    }));
    app.post("/login", (request, reply) => __async(this, null, function* () {
      try {
        const schemaParamsLogin = import_zod.z.object({
          email: import_zod.z.string(),
          password: import_zod.z.string()
        });
        const { email, password } = schemaParamsLogin.parse(request.body);
        const user = yield knex("users").select().where({
          email,
          password
        }).first();
        if (!user) {
          throw new Error("erro");
        }
        return user;
      } catch (e) {
        return reply.status(400).send("Erro ao realizar login");
      }
    }));
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authRoutes
});
