// Run: deno run --allow-net sample.ts

import * as configcat from "https://raw.githubusercontent.com/sigewuzhere/configcat-deno/master/client.ts";

const logger = configcat.createConsoleLogger(3); // Setting log level to 3 (= Info) to show detailed feature flag evaluation

const configCatClient = configcat.createClientWithAutoPoll('PKDVCLf-Hq-h-kCzMp-L7Q/HhOWfwVtZ0mb30i9wi17GQ', { logger: logger });
// You can instantiate the client with different polling modes. See the Docs: https://configcat.com/docs/sdk-reference/node/#polling-modes

const isAwesomeFeatureEnabled = await configCatClient.getValueAsync("isAwesomeFeatureEnabled", false);
console.warn("isAwesomeFeatureEnabled: " + isAwesomeFeatureEnabled);

const userObject = { identifier: "#SOME-USER-ID#", email: "configcat@example.com" };
// Read more about the User Object: https://configcat.com/docs/sdk-reference/node/#user-object

const isPOCFeatureEnabled = await configCatClient.getValueAsync("isPOCFeatureEnabled", false, userObject);
console.warn("isPOCFeatureEnabled: " + isPOCFeatureEnabled);