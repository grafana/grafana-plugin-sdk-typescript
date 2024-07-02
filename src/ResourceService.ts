import { ResourceService, CallResourceRequest, CallResourceResponse } from './core';

export class TemplateResourceService extends ResourceService {
  CallResource(request: CallResourceRequest): Promise<CallResourceResponse> {
    throw new Error("Method not implemented.");
  }
}
