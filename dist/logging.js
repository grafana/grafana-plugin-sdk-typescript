"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const util = require('util');
class Logger {
    innerLog(level, ...messages) {
        console.warn(JSON.stringify({
            '@message': util.format.apply(this, ...messages),
            '@level': level,
        }));
    }
    assert(...args) {
        throw new Error("Method not implemented.");
    }
    clear() {
        throw new Error("Method not implemented.");
    }
    count(label) {
        throw new Error("Method not implemented.");
    }
    debug(...messages) {
        this.innerLog('debug', messages);
    }
    dir(...args) {
        throw new Error("Method not implemented.");
    }
    dirxml(...args) {
        throw new Error("Method not implemented.");
    }
    error(...messages) {
        this.innerLog('error', messages);
    }
    exception(message, ...optionalParams) {
        throw new Error("Method not implemented.");
    }
    group(...groupTitle) {
        throw new Error("Method not implemented.");
    }
    groupCollapsed(...groupTitle) {
        throw new Error("Method not implemented.");
    }
    groupEnd() {
        throw new Error("Method not implemented.");
    }
    info(...messages) {
        this.innerLog('info', messages);
    }
    log(...messages) {
        this.innerLog('info', messages);
    }
    markTimeline(label) {
        throw new Error("Method not implemented.");
    }
    profile(label) {
        throw new Error("Method not implemented.");
    }
    profileEnd(label) {
        throw new Error("Method not implemented.");
    }
    table(...args) {
        throw new Error("Method not implemented.");
    }
    time(label) {
        throw new Error("Method not implemented.");
    }
    timeEnd(label) {
        throw new Error("Method not implemented.");
    }
    timeStamp(label) {
        throw new Error("Method not implemented.");
    }
    timeline(label) {
        throw new Error("Method not implemented.");
    }
    timelineEnd(label) {
        throw new Error("Method not implemented.");
    }
    trace(...messages) {
        this.innerLog('trace', messages);
    }
    warn(...messages) {
        this.innerLog('warn', messages);
    }
    countReset(label) {
        throw new Error("Method not implemented.");
    }
    timeLog(label, ...data) {
        throw new Error("Method not implemented.");
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logging.js.map