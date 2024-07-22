function base64Decode(data: string): Object {
    const decodedString = Buffer.from(data, 'base64').toString('utf-8');
    return JSON.parse(decodedString);
}

export function processInputData(inputData: any) {
    const context = inputData.plugincontext;

    const decodedDatasourceJson = context?.datasourceinstancesettings?.jsondata ? base64Decode(context.datasourceinstancesettings.jsondata) : {};

    const decodedQueriesList = inputData.queriesList.map((query: { [key: string]: any, json: string }) => {
        return {
            ...query,
            json: base64Decode(query.json)
        }
    });

    const pluginContext = {
        ...context,
        datasourceinstancesettings: {
            ...context.datasourceinstancesettings,
            json: decodedDatasourceJson,
        }
    };

    return {
        queriesList: decodedQueriesList,
        pluginContext: pluginContext
    };
}
