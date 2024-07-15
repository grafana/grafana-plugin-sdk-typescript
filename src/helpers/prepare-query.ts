// @ts-nocheck
function base64Decode(data: string): any {
    const decodedString = Buffer.from(data, 'base64').toString('utf-8');
    return JSON.parse(decodedString);
}

export function processInputData(inputData: any) {
    const context = inputData.plugincontext;

    // Decode the jsondata in datasourceinstancesettings
    const decodedDatasourceJson = context?.datasourceinstancesettings?.jsondata ? base64Decode(context.datasourceinstancesettings.jsondata) : {};

    // Decode the json field in each query in queriesList
    const decodedQueriesList = inputData.queriesList.map(query => {
        return {
            ...query,
            json: base64Decode(query.json)
        }
    });

    // Construct the pluginContext object
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
