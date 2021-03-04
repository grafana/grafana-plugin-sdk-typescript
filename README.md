# Grafana Data Source Backend Framework for Typescript

This framework is for writing a backend datasource in typescript

## What is Grafana Data Source Backend Plugin?

Grafana supports a wide range of data sources, including Prometheus, MySQL, and even Datadog. There’s a good chance you can already visualize metrics from the systems you have set up. In some cases, though, you already have an in-house metrics solution that you’d like to add to your Grafana dashboards. Grafana Data Source Plugins enables integrating such solutions with Grafana.

For more information about backend plugins, refer to the documentation on [Backend plugins](https://grafana.com/docs/grafana/latest/developers/plugins/backend/).

## Getting started

A data source backend plugin consists of both frontend and backend components.

### Frontend

1. Install dependencies
```BASH
yarn install
```

2. Build plugin in development mode or run in watch mode
```BASH
yarn dev
```
or
```BASH
yarn watch
```
3. Build plugin in production mode
```BASH
yarn build
```

### Backend
#### Why use a backend datasource?
Backend datasources send messages through grafanas backend. This means query responses are routed through grafana's alerting engine, giving your plugin alterting capabilities for free.
#### Using this framework (migrate a frontend datasource to a backend one)
To make migration of your frontend-only datasource plugin as simple as possible, the following should convert your plugin to a backend datasource
1. Edit your `plugin.json` and add the following:
```
backend: true,
executable: "gpx_<identifier>",
```
2. Add the dependency to your package json and install `"@grafana/tsbackend": "srclosson/grafana-tsbackend"`
3. Create a directory called `shared` and moves your `types.ts` file to shared.
4. In the root of your plugin `cp node_modules/@grafana/tsbackend/tsconfig.backend.json .` to get the backend typescript compiler configuration for the backend.
5. Create a directory called `backend` and then `cp node_modules@grafana/tsbackend/skel/*.ts backend/` to copy the skeleton files for the typescript backend.
6. Edit the files in the backend directory. Change the class names. Import your query, and update the DataService so that the DataRequest is using your specific query type. Edit `index.ts` and ensure the proper files are renamed and being imported.
7. Add the following to your package.json under the `scripts` section
```
 "backend": "./node_modules/@grafana/tsbackend/bin/grafana-tsbackend gpx_<identifier>_<platform (darwin/windows/linux>)_<architecture arm/amd64>",
 "restart:backend": "kill $(ps -ef | grep gpx_<identifier>_<platform (darwin/windows/linux>)_<architecture arm/amd64> | grep -v grep | awk '{ print $2 }')",
```
8. Modify the entry for building the plugin. If desired, you can also add `yarn backend` to build the backend as well.

#### Logging
Logging takes places in the grafana log for backend plugins. To log:
```
import { logger } from '@grafana/tsbackend';
```
You can then use the following calls for logging:
- logger.debug
- logger.error
- logger.log
- logger.warn
- logger.info

## Learn more

- [Build a data source backend plugin tutorial](https://grafana.com/tutorials/build-a-data-source-backend-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
- [Grafana plugin SDK for Go](https://grafana.com/docs/grafana/latest/developers/plugins/backend/grafana-plugin-sdk-for-go/)