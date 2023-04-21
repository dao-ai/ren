# 引擎(弃)

引擎端点已弃用。
请使用他们的替代品[模型](./models.md)。学习更多的知识。

这些端点描述并提供了对 API 中各种可用引擎的访问。

## 列出引擎 `Deprecated`

`GET`: https://api.openai.com/v1/engines

列出当前可用的(未经优化的)模型，并提供关于每个模型的基本信息，如所有者和可用性。

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
```

**返回**:

```json
{
  "data": [
    {
      "id": "engine-id-0",
      "object": "engine",
      "owner": "organization-owner",
      "ready": true
    },
    {
      "id": "engine-id-2",
      "object": "engine",
      "owner": "organization-owner",
      "ready": true
    },
    {
      "id": "engine-id-3",
      "object": "engine",
      "owner": "openai",
      "ready": false
    }
  ],
  "object": "list"
}
```

## 检索引擎 `Deprecated`

`GET`: https://api.openai.com/v1/engines/{engine_id}

Retrieves a model instance, providing basic information about it such as the owner and availability.

**路径参数**:

engine_id
string
Required
The ID of the engine to use for this request

**示例**:

text-davinci-003

text-davinci-003

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.retrieveEngine("text-davinci-003");
```

**返回**:
text-davinci-003

text-davinci-003

```json
{
  "id": "text-davinci-003",
  "object": "engine",
  "owner": "openai",
  "ready": true
}
```
