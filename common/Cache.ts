import { ProjectConfig } from "./ProjectConfig.ts";
import { ICache } from "./index.ts";

export class InMemoryCache implements ICache {
    cache:  { [apiKey: string] : ProjectConfig; } = {};

    Set(apiKey: string, config: ProjectConfig): void {
        this.cache[apiKey] = config;
    }

    Get(apiKey: string): ProjectConfig {
        return this.cache[apiKey];
    }
}