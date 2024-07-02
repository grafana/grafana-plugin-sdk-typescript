"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src/");
const DiagnosticsService_1 = require("./DiagnosticsService");
const DataService_1 = require("./DataService");
const ResourceService_1 = require("./ResourceService");
const app = new src_1.BackendServer();
app.addDiagnosticsService(new DiagnosticsService_1.TemplateDiagnosticsService());
app.addDataService(new DataService_1.TemplateDataService());
app.addResourceService(new ResourceService_1.TemplateResourceService());
module.exports = app;
//# sourceMappingURL=index.js.map