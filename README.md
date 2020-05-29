# ConfigCat SDK for Deno
Unofficial Deno SDK for ConfigCat Feature Flags. Based on ConfigCat Node.js SDK.

# Usage
Import package
```js
import * as configcat from "https://raw.githubusercontent.com/sigewuzhere/configcat-deno/master/client.ts";
```

Create ConfigCat client and access feature flags
```js
const configCatClient = configcat.createClientWithAutoPoll('PKDVCLf-Hq-h-kCzMp-L7Q/HhOWfwVtZ0mb30i9wi17GQ');

const isAwesomeFeatureEnabled = await configCatClient.getValueAsync("isAwesomeFeatureEnabled", false);
console.warn("isAwesomeFeatureEnabled: " + isAwesomeFeatureEnabled);
```
