"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/routes/diets.ts
var diets_exports = {};
__export(diets_exports, {
  dietsRoutes: () => dietsRoutes
});
module.exports = __toCommonJS(diets_exports);
var import_zod = require("zod");
var import_node_crypto = __toESM(require("crypto"));
function dietsRoutes(knex) {
  return (app) => __async(this, null, function* () {
    app.get("/all/:id", (request) => __async(this, null, function* () {
      const getRequestSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const { id } = getRequestSchema.parse(request.params);
      const diets = yield knex("meats").select().where({
        user_id: id
      });
      return {
        diets
      };
    }));
    app.post("/:id", (request, reply) => __async(this, null, function* () {
      const getRequestSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const bodyRequestSchema = import_zod.z.object({
        name: import_zod.z.string(),
        description: import_zod.z.string(),
        datetime: import_zod.z.string(),
        is_diet: import_zod.z.string()
      });
      const { id: userId } = getRequestSchema.parse(request.params);
      const data = bodyRequestSchema.parse(request.body);
      const payload = __spreadProps(__spreadValues({}, data), {
        user_id: userId,
        id: import_node_crypto.default.randomUUID()
      });
      yield knex("meats").insert(payload);
      return reply.status(201).send();
    }));
    app.put("/edit/:id", (request, reply) => __async(this, null, function* () {
      const getRequestSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const bodyRequestSchema = import_zod.z.object({
        name: import_zod.z.string(),
        description: import_zod.z.string(),
        datetime: import_zod.z.string(),
        is_diet: import_zod.z.string(),
        id: import_zod.z.string()
      });
      const { id: userId } = getRequestSchema.parse(request.params);
      const data = bodyRequestSchema.parse(request.body);
      const payload = __spreadProps(__spreadValues({}, data), {
        user_id: userId
      });
      yield knex("meats").where({
        id: data.id
      }).update(payload);
      return reply.status(200).send();
    }));
    app.delete("/:id", (request, reply) => __async(this, null, function* () {
      const getRequestSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const bodyRequestSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const data = bodyRequestSchema.parse(request.body);
      const { id: userId } = getRequestSchema.parse(request.params);
      yield knex("meats").where({
        id: data.id,
        user_id: userId
      }).delete();
      reply.status(200).send();
    }));
    app.get("/resume/:id", (request) => __async(this, null, function* () {
      const getRequestSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const { id } = getRequestSchema.parse(request.params);
      const diets = yield knex("meats").select().where({
        user_id: id
      });
      const totalMeals = diets.length;
      const totalIsDiet = diets.filter((d) => d.is_diet === 1).length;
      return {
        totalMeals,
        totalIsDiet,
        totalIsNoDiet: totalMeals - totalIsDiet
      };
    }));
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dietsRoutes
});
