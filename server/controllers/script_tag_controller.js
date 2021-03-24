import { DataType } from "@shopify/shopify-api";

export async function createScriptTag(client) {
  if (client) {
    const data = {
      script_tag: {
        event: "onload",
        src: "https://google.com",
      },
    };
    const result = await client.post({
      path: "script_tags",
      data,
      type: DataType.JSON,
    });
    console.log(`Result for the rest request using shopify is`, result);
    return result;
  }
  console.error("Could not make the rest request as the client does not exist");
}

export async function getAllScriptTags(client, src) {
  if (!client) {
    console.error(
      "Could not make the rest request as the client does not exist"
    );
    return;
  }
  const result = await client.get({
    path: "script_tags",
  });
  const matchSrc = result.body.script_tags.filter((tag) => tag.src === src);
  return matchSrc;
}

export async function deleteScriptTagById(client, id) {
  if (!client) {
    console.error(
      "Could not make the rest request as the client does not exist"
    );
    return;
  }
  const result = await client.delete({
    path: `script_tags/${id}`,
  });
  console.log(result);
  return result;
}

function getBaseUrl(shop) {
  return `https://${shop}`;
}

function getAllScriptTagsUrl(shop) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`;
}

function getScriptTagUrl(shop, id) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`;
}

function getCreateScriptTagUrl(shop) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`;
}

function getDeleteScriptTagUrl(shop, id) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`;
}
