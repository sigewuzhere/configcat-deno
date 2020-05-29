import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import * as configcatClient from "../index.ts";
import { IConfigCatClient } from "../ConfigCatClient.ts";
import { FakeConfigFetcher, FakeConfigCatKernel } from "./ConfigCatClientTests.ts";
import { InMemoryCache } from "../Cache.ts";

Deno.test("ConfigCatClient index (main) - createClientWithAutoPoll ShouldCreateInstance", () => {

    let configCatKernel: FakeConfigCatKernel = {configFetcher: new FakeConfigFetcher(), cache: new InMemoryCache()};
    var client: IConfigCatClient = configcatClient.createClientWithAutoPoll("APIKEY", configCatKernel);

    assertEquals(!!client, true);
});

// describe("ConfigCatClient index (main)", () => {

//     it("createClientWithAutoPoll ShouldCreateInstance", () => {

//         let configCatKernel: FakeConfigCatKernel = {configFetcher: new FakeConfigFetcher(), cache: new InMemoryCache()};
//         var client: IConfigCatClient = configcatClient.createClientWithAutoPoll("APIKEY", configCatKernel);

//         assert.isDefined(client);
//     });

//     it("createClientWithLazyLoad ShouldCreateInstance", () => {

//         let configCatKernel: FakeConfigCatKernel = {configFetcher: new FakeConfigFetcher(), cache: new InMemoryCache()};
//         var client: IConfigCatClient = configcatClient.createClientWithLazyLoad("APIKEY", configCatKernel);

//         assert.isDefined(client);
//     });

//     it("createClientWithManualPoll ShouldCreateInstance", () => {

//         let configCatKernel: FakeConfigCatKernel = {configFetcher: new FakeConfigFetcher(), cache: new InMemoryCache()};
//         var client: IConfigCatClient = configcatClient.createClientWithManualPoll("APIKEY", configCatKernel);

//         assert.isDefined(client);
//     });
// });