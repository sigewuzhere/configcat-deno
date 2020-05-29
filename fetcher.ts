import { ProjectConfig } from "./common/ProjectConfig.ts";
import { OptionsBase } from "./common/ConfigCatClientOptions.ts";
import { soxa } from 'https://deno.land/x/soxa/mod.ts'
import { IConfigFetcher } from "./common/index.ts";


export class HttpConfigFetcher implements IConfigFetcher {


    fetchLogic(options: OptionsBase, lastProjectConfig: ProjectConfig, callback: (newProjectConfig: ProjectConfig) => void): void {

        soxa.get(options.getUrl(), {
            headers: {
                "User-Agent": "ConfigCat-Deno/" + options.clientVersion,
                "X-ConfigCat-UserAgent": "ConfigCat-Deno/" + options.clientVersion,
                "If-None-Match": (lastProjectConfig && lastProjectConfig.HttpETag) ? lastProjectConfig.HttpETag : null
            }
        }
        ).then((response:any) => {
            if (response && response.status === 200) {
                callback(new ProjectConfig(new Date().getTime(), JSON.stringify(response.data), response.headers.etag as string));
            } else {
                options.logger.error(`1Failed to download feature flags & settings from ConfigCat. Status: ${response && response.status} - ${response && response.statusText}`);
                options.logger.info("Double-check your SDK Key on https://app.configcat.com/sdkkey");
                callback(lastProjectConfig);
            }
        }).catch((reason:any) => {
            const response = reason.response;
            if (response && response.status === 304) {
                callback(new ProjectConfig(new Date().getTime(), JSON.stringify(lastProjectConfig.ConfigJSON), response.headers.etag as string));
            } else {
                options.logger.error(`2Failed to download feature flags & settings from ConfigCat. Status: ${reason.message}`);
                options.logger.info("Double-check your SDK Key on https://app.configcat.com/sdkkey");
                callback(lastProjectConfig);
            }
        });
    }
}

export default HttpConfigFetcher;