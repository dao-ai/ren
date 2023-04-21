# 模型

列出并描述 API 中可用的各种模型。
您可以参考 Models 文档来了解可用的模型以及它们之间的差异。

## 列出模式

`GET`: https://api.openai.com/v1/models

列出当前可用的模型，并提供关于每个模型的基本信息，如所有者和可用性。

**示例**:

```js title="node.js"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listModels();
```

```json title="返回"
{
  "data": [
    {
      "id": "model-id-0",
      "object": "model",
      "owned_by": "organization-owner",
      "permission": [...]
    },
    {
      "id": "model-id-1",
      "object": "model",
      "owned_by": "organization-owner",
      "permission": [...]
    },
    {
      "id": "model-id-2",
      "object": "model",
      "owned_by": "openai",
      "permission": [...]
    }
  ],
  "object": "list"
}
```

## 检索模型

`GET`: https://api.openai.com/v1/models/{model}

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

**路径参数**:

model _string_ **Required**: The ID of the model to use for this request

**示例**:

```js title="text-davinci-003,node.js"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.retrieveModel("text-davinci-003");
```

**返回**:

```json title="text-davinci-003"
{
  "id": "text-davinci-003",
  "object": "model",
  "owned_by": "openai",
  "permission": [...]
}
```
