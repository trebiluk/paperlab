import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hubBaseFromRouter, restoreHubBasePath, restoreHubBaseUrl } from "./hub-base.ts";

describe("hubBaseFromRouter", () => {
  it("ignores an empty or root basepath", () => {
    assert.equal(hubBaseFromRouter(undefined), "");
    assert.equal(hubBaseFromRouter(""), "");
    assert.equal(hubBaseFromRouter("/"), "");
  });

  it("normalizes the paperlab mount", () => {
    assert.equal(hubBaseFromRouter("/paperlab"), "/paperlab");
    assert.equal(hubBaseFromRouter("paperlab"), "/paperlab");
    assert.equal(hubBaseFromRouter("/paperlab/"), "/paperlab");
  });
});

describe("restoreHubBasePath", () => {
  it("prefixes document and server-function paths the hub stripped", () => {
    assert.equal(restoreHubBasePath("/", "/paperlab"), "/paperlab/");
    assert.equal(restoreHubBasePath("/labs", "/paperlab"), "/paperlab/labs");
    assert.equal(restoreHubBasePath("/_serverFn/abc", "/paperlab"), "/paperlab/_serverFn/abc");
  });

  it("does not double-prefix or rewrite origin static files", () => {
    assert.equal(restoreHubBasePath("/paperlab/labs", "/paperlab"), "/paperlab/labs");
    assert.equal(
      restoreHubBasePath("/assets/styles-abc.css", "/paperlab"),
      "/assets/styles-abc.css",
    );
    assert.equal(restoreHubBasePath("/favicon.svg", "/paperlab"), "/favicon.svg");
    assert.equal(
      restoreHubBasePath("/__grok/manifest.webmanifest", "/paperlab"),
      "/__grok/manifest.webmanifest",
    );
  });

  it("is a no-op without a hub base", () => {
    assert.equal(restoreHubBasePath("/labs", ""), "/labs");
  });
});

describe("restoreHubBaseUrl", () => {
  it("rewrites the request URL and leaves static requests untouched", () => {
    const labs = restoreHubBaseUrl(new Request("https://apps.kulibert.net/labs"), "/paperlab");
    assert.equal(labs.url, "https://apps.kulibert.net/paperlab/labs");

    const asset = restoreHubBaseUrl(
      new Request("https://apps.kulibert.net/assets/app.js"),
      "paperlab",
    );
    assert.equal(asset.url, "https://apps.kulibert.net/assets/app.js");

    const dev = restoreHubBaseUrl(new Request("https://localhost:8080/labs"), "/");
    assert.equal(dev.url, "https://localhost:8080/labs");
  });
});
