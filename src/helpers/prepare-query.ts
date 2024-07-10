// @ts-nocheck
type PluginContext = {
    orgid: number;
    pluginid: string;
    user: {
        login: string;
        name: string;
        email: string;
        role: string;
    };
    datasourceinstancesettings: {
        id: number;
        name: string;
        url: string;
        user: string;
        database: string;
        basicauthenabled: boolean;
        basicauthuser: string;
        jsondata: string;
        decryptedsecurejsondataMap: [string, string][];
        lastupdatedms: number;
        uid: string;
    };
    headersMap: [string, string][];
    queriesList: {
        refid: string;
        maxdatapoints: number;
        intervalms: number;
        timerange: {
            fromepochms: number;
            toepochms: number;
        };
        json: string;
        querytype: string;
    }[];
};

function base64Decode(data: string): any {
    const decodedString = Buffer.from(data, 'base64').toString('utf-8');
    return JSON.parse(decodedString);
}

export function processInputData(inputData: any) {
    const context = inputData.plugincontext;

    // Decode the jsondata in datasourceinstancesettings
    const decodedDatasourceJson = context?.datasourceinstancesettings ? base64Decode(context.datasourceinstancesettings.jsondata) : {};

    // Decode the json field in each query in queriesList
    const decodedQueriesList = context.queriesList.map(query => {
        console.log({
            ...query,
            json: base64Decode(query.json)
        }, '------')

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
