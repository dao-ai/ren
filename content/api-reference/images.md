# 图像

给定一个提示和/或一个输入图像，模型将生成一个新的图像。

相关指南: Image generation

## 创建图像 `Beta`

`POST`: https://api.openai.com/v1/images/generations

创建给定提示的图像。

**请求体**:

| 参数            | 类型    | 必须     | 默认      | 描述                                                                       |
| --------------- | ------- | -------- | --------- | -------------------------------------------------------------------------- |
| prompt          | string  | Required |           | 所需图像的文本描述。最大长度为 1000 个字符。                               |
| n               | integer | Optional | 1         | 要生成的图像数量。必须在 1 到 10 之间。                                    |
| size            | string  | Optional | 1024x1024 | 生成图像的大小。必须是 256x256、512x512 或 1024x1024 中的一个。            |
| response_format | string  | Optional | url       | 所生成图像的返回格式。必须是 url 或 b64_json 之一。                        |
| user            | string  | Optional |           | 代表终端用户的唯一标识符，可以帮助 OpenAI 监视和检测滥用。学习更多的知识。 |

**示例**:
node.js

```js title="node.js"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createImage({
  prompt: "A cute baby sea otter",
  n: 2,
  size: "1024x1024",
});
```

**参数**:

```json
{
  "prompt": "A cute baby sea otter",
  "n": 2,
  "size": "1024x1024"
}
```

**返回**:

```json
{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}
```

## 创建图像编辑 Beta

`POST`: https://api.openai.com/v1/images/edits

给定原始图像和提示，创建编辑或扩展的图像。

**请求体**:

| 参数            | 类型    | 必须     | 默认值    | 描述                                                                                                                                         |
| --------------- | ------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| image           | string  | Required |           | 要编辑的图像。必须是有效的 PNG 文件，小于 4MB 并且是正方形。如果没有提供掩模，则图像必须具有透明度，透明部分将用作掩模。                     |
| mask            | string  | Optional |           | 一个额外的图像，其完全透明的区域（例如 alpha 为零的区域）指示应该在哪里编辑图像。必须是有效的 PNG 文件，小于 4MB，并且具有与图像相同的尺寸。 |
| prompt          | string  | Required |           | 所需图像的文本描述。最大长度为 1000 个字符。                                                                                                 |
| n               | integer | Optional | 1         | 要生成的图像数。必须介于 1 和 10 之间。                                                                                                      |
| size            | string  | Optional | 1024x1024 | 生成图像的大小。必须是 256x256、512x512 或 1024x1024 中的一个。                                                                              |
| response_format | string  | Optional | url       | 生成的图像返回的格式。必须是 url 或 b64_json 中的一个。                                                                                      |
| user            | string  | Optional |           | 代表您的最终用户的唯一标识符，可帮助 OpenAI 监视和检测滥用。了解更多信息。                                                                   |

**示例**:

```js title="node.js"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createImageEdit(
  fs.createReadStream("otter.png"),
  fs.createReadStream("mask.png"),
  "A cute baby sea otter wearing a beret",
  2,
  "1024x1024"
);
```

**返回**:

```json
{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}
```

## 创建图像变体 `Beta`

`POST`: https://api.openai.com/v1/images/variations

创建给定图像的变体。

**请求体**:

| 参数            | 类型    | 必选项   | 默认值    | 描述                                                                   |
| --------------- | ------- | -------- | --------- | ---------------------------------------------------------------------- |
| image           | string  | Required |           | 用作变体基础的图像。必须是有效的 PNG 文件，小于 4MB 并且是正方形。     |
| n               | integer | Optional | 1         | 要生成的图像数量。必须介于 1 和 10 之间。                              |
| size            | string  | Optional | 1024x1024 | 生成的图像大小。必须是 256x256、512x512 或 1024x1024 之一。            |
| response_format | string  | Optional | url       | 返回生成的图像的格式。必须是 url 或 b64_json 之一。                    |
| user            | string  | Optional |           | 表示终端用户的唯一标识符，可帮助 OpenAI 监测和检测滥用。了解更多信息。 |

**示例**:

```js title="node.js"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createImageVariation(fs.createReadStream("otter.png"), 2, "1024x1024");
```

**返回**:

```json
{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}
```
