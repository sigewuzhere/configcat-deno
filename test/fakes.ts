import { IConfigCatKernel, IConfigFetcher, ICache } from "../common/index.ts";
import { OptionsBase } from "../common/ConfigCatClientOptions.ts";
import { ProjectConfig } from "../common/ProjectConfig.ts";


export class FakeConfigFetcherBase implements IConfigFetcher {
    constructor(private config: string) {
    }

    fetchLogic(
        options: OptionsBase,
        lastProjectConfig: ProjectConfig,
        callback: (newProjectConfig: ProjectConfig) => void,
    ): void {
        if (callback) {
            callback(new ProjectConfig(0, this.config, ""));
        }
    }
}

export class FakeConfigFetcher extends FakeConfigFetcherBase {
    constructor() {
        super(
            '{ "debug": { "v": true, "i": "abcdefgh", "t": 0, "p": [], "r": [] } }',
        );
    }
}

export class FakeConfigFetcherWithTwoKeys extends FakeConfigFetcherBase {
    constructor() {
        super(
            '{ "debug": { "v": true, "i": "abcdefgh", "t": 0, "p": [], "r": [] }, "debug2": { "v": true, "i": "12345678", "t": 0, "p": [], "r": [] } }',
        );
    }
}

export class FakeConfigFetcherWithTwoKeysAndRules
    extends FakeConfigFetcherBase {
    constructor() {
        super(
            '{ "debug": { "v": "def", "i": "abcdefgh", "t": 1, "p": [], "r": [{ "o":0, "a":"a", "t":1, "c":"abcd", "v":"value", "i":"6ada5ff2"}] }, "debug2": { "v": "def", "i": "12345678", "t": 1, "p": [{"o":0, "v":"value1", "p":50, "i":"d227b334" }, { "o":1, "v":"value2", "p":50, "i":"622f5d07" }], "r": [] } }',
        );
    }
}

export class FakeConfigFetcherWithNullNewConfig extends FakeConfigFetcherBase {
    constructor() {
        super("");
    }
}

export class FakeConfigCatKernel implements IConfigCatKernel {
    constructor(configFetcher: IConfigFetcher, cache: ICache) {
        this.configFetcher = configFetcher;
        this.cache = cache;
    }
    configFetcher: IConfigFetcher;
    cache: ICache;
}