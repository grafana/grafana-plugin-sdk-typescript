import { DataFrame, DataService } from './core';
import { FieldType, ArrayVector } from '@grafana/data';

export class TemplateDataService extends DataService<any,any> {
  constructor() {
    super();
  }

  QueryData(request: any): Promise<DataFrame[]> {
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
