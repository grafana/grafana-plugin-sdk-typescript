const util = require('util');

export class Logger implements Console {
    // @ts-ignore
    Console: NodeJS.ConsoleConstructor;
    memory: any;

    private innerLog(level: string, ...messages: any[]) {
        console.warn(JSON.stringify({
            '@message': util.format.apply(this, ...messages),
            '@level': level,
        }));
    }
    
    assert(condition?: boolean | undefined, message?: string | undefined, ...data: any[]): void;
    assert(value: any, message?: string | undefined, ...optionalParams: any[]): void;
    assert(...args: any[]) {
        throw new Error("Method not implemented.");
    }
    
    clear() {
        throw new Error("Method not implemented.");
    }
    
    count(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    debug(...messages: any[]) {
        this.innerLog('debug', messages);
    }

    dir(...args: any[]) {
        throw new Error("Method not implemented.");
    }
    
    dirxml(...args: any[]) {
        throw new Error("Method not implemented.");
    }
    
    error(...messages: any[]) {
        this.innerLog('error', messages);
    }
    
    exception(message?: string | undefined, ...optionalParams: any[]): void {
        throw new Error("Method not implemented.");
    }
    
    group(...groupTitle: any[]) {
        throw new Error("Method not implemented.");
    }
    
    groupCollapsed(...groupTitle: any[]) {
        throw new Error("Method not implemented.");
    }
    
    groupEnd() {
        throw new Error("Method not implemented.");
    }
    
    info(...messages: any[]) {
        this.innerLog('info', messages);
    }

    log(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    log(...messages: any[]) {
        this.innerLog('info', messages);
    }
    markTimeline(label?: string | undefined): void;
    markTimeline(label?: string | undefined): void;
    markTimeline(label?: any) {
        throw new Error("Method not implemented.");
    }
    profile(reportName?: string | undefined): void;
    profile(label?: string | undefined): void;
    profile(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    profileEnd(reportName?: string | undefined): void;
    profileEnd(label?: string | undefined): void;
    profileEnd(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    table(...args: any[]) {
        throw new Error("Method not implemented.");
    }
    
    time(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    timeEnd(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    timeStamp(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    timeline(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    timelineEnd(label?: any) {
        throw new Error("Method not implemented.");
    }
    
    trace(...messages: any[]) {
        this.innerLog('trace', messages);
    }

    warn(...messages: any[]) {
        this.innerLog('warn', messages);
    }
    countReset(label?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    timeLog(label?: string | undefined, ...data: any[]): void {
        throw new Error("Method not implemented.");
    }

}

