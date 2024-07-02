import { BackendServer } from './core';
import { TemplateDiagnosticsService } from './DiagnosticsService';
import { TemplateDataService } from './DataService';
import { TemplateResourceService } from './ResourceService';

const app = new BackendServer();
app.addDiagnosticsService(new TemplateDiagnosticsService());
app.addDataService(new TemplateDataService());
app.addResourceService(new TemplateResourceService() as any);

module.exports = app;
