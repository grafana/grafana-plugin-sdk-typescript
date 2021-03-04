import { BackendServer } from '@grafana/tsbackend';
import { TemplateDiagnosticsService } from './DiagnosticsService';
import { TemplateDataService } from './DataService';
import { TemplateResourceService } from './ResourceService';

const app = new BackendServer();
app.addDiagnosticsService(new TemplateDiagnosticsService());
app.addDataService(new TemplateDataService());
app.addResourceService(new TemplateResourceService());

module.exports = app;