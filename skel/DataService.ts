import { DataFrame, DataService, DataRequest } from '@grafana/tsbackend';
import { FieldType, ArrayVector } from '@grafana/data';

export class TemplateDataService extends DataService {
  constructor() {
    super();
  }

  QueryData(request: DataRequest<T>): Promise<DataFrame[]> {
    return Promise.resolve([{
      name: 'some data',
      fields: [{
        name: 'time',
        config: {},
        type: FieldType.time,
        values: new ArrayVector([ Date.now()]),
      },{
        name: 'value',
        config: {},
        type: FieldType.number,
        values: new ArrayVector([ 1 ]),
      }],
      length: 2,
    }]);
  }
}