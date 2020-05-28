import { IConfigService, ConfigServiceBase } from "./ConfigServiceBase.ts";
import { ManualPollOptions } from "./ConfigCatClientOptions.ts";
import { IConfigFetcher, ICache } from "./index.ts";
import { ProjectConfig } from "./ProjectConfig.ts";

export class ManualPollService extends ConfigServiceBase implements IConfigService {

    public constructor(configFetcher: IConfigFetcher, cache: ICache, config: ManualPollOptions) {

        super(configFetcher, cache, config);
    }

    getConfig(): Promise<ProjectConfig> {

        return new Promise(resolve => resolve(this.cache.Get(this.baseConfig.apiKey)));
    }

    refreshConfigAsync(): Promise<ProjectConfig> {

        let p: ProjectConfig = this.cache.Get(this.baseConfig.apiKey);
        return this.refreshLogicBaseAsync(p)
    }
}