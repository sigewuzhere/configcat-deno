import * as configcatcommon from "./common/index.ts";
import { HttpConfigFetcher } from "./fetcher.ts";
import { InMemoryCache } from "./common/Cache.ts";
import { IConfigCatClient } from "./common/ConfigCatClient.ts";
import { LogLevel } from "./common/index.ts";

/** Create an instance of ConfigCatClient and setup Auto Polling mode with default options */
export function createClient(sdkKey: string): IConfigCatClient {
    return createClientWithAutoPoll(sdkKey);
}

/**
 * Create an instance of ConfigCatClient and setup Auto Polling mode with custom options
 * @param {string} sdkKey - ConfigCat SdkKey to access your configuration.
 * @param options - Options for Auto Polling
 */
export function createClientWithAutoPoll(sdkKey: string, options?: INodeAutoPollOptions): IConfigCatClient {
    return configcatcommon.createClientWithAutoPoll(sdkKey, { configFetcher: new HttpConfigFetcher(), cache: new InMemoryCache() }, options);
}

/**
 * Create an instance of ConfigCatClient and setup Manual Polling mode with custom options
 * @param {string} sdkKey - ConfigCat SdkKey to access your configuration.
 * @param options - Options for Manual Polling
 */
export function createClientWithManualPoll(sdkKey: string, options?: INodeManualPollOptions): IConfigCatClient {
    return configcatcommon.createClientWithManualPoll(sdkKey, { configFetcher: new HttpConfigFetcher(), cache: new InMemoryCache() }, options)
}

/**
 * Create an instance of ConfigCatClient and setup Lazy Loading mode with custom options
 * @param {string} sdkKey - ConfigCat SdkKey to access your configuration.
 * @param options - Option for Lazy Loading
 */
export function createClientWithLazyLoad(sdkKey: string, options?: INodeLazyLoadingOptions): IConfigCatClient {
    return configcatcommon.createClientWithLazyLoad(sdkKey, { configFetcher: new HttpConfigFetcher(), cache: new InMemoryCache() }, options);
}

/**
 * Create an instance of ConfigCatConsoleLogger
 * @param logLevel Specifies message's filtering to output for the CofigCatConsoleLogger.
 */
export function createConsoleLogger(logLevel: LogLevel): configcatcommon.IConfigCatLogger {
    return configcatcommon.createConsoleLogger(logLevel)
}

export interface INodeAutoPollOptions extends configcatcommon.IAutoPollOptions {
}

export interface INodeLazyLoadingOptions extends configcatcommon.ILazyLoadingOptions {
}

export interface INodeManualPollOptions extends configcatcommon.IManualPollOptions {
}