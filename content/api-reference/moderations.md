# 适度

给定一个输入文本，如果模型将其归类为违反 OpenAI 的内容策略，则输出该文本。

相关指南: [Moderations](https://platform.openai.com/docs/guides/moderation)

## 创建适度

`POST`: https://api.openai.com/v1/moderations

Classifies if text violates OpenAI's Content Policy

**请求体**:

input
string or array
Required
The input text to classify

model
string
Optional
Defaults to text-moderation-latest
Two content moderations models are available: text-moderation-stable and text-moderation-latest.

The default is text-moderation-latest which will be automatically upgraded over time. This ensures you are always using our most accurate model. If you use text-moderation-stable, we will provide advanced notice before updating the model. Accuracy of text-moderation-stable may be slightly lower than for text-moderation-latest.

**示例**:
node.js

node.js

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createModeration({
  input: "I want to kill them.",
});
```

**参数**:

```json
{
  "input": "I want to kill them."
}
```

**返回**:

```json
{
  "id": "modr-5MWoLO",
  "model": "text-moderation-001",
  "results": [
    {
      "categories": {
        "hate": false,
        "hate/threatening": true,
        "self-harm": false,
        "sexual": false,
        "sexual/minors": false,
        "violence": true,
        "violence/graphic": false
      },
      "category_scores": {
        "hate": 0.22714105248451233,
        "hate/threatening": 0.4132447838783264,
        "self-harm": 0.005232391878962517,
        "sexual": 0.01407341007143259,
        "sexual/minors": 0.0038522258400917053,
        "violence": 0.9223177433013916,
        "violence/graphic": 0.036865197122097015
      },
      "flagged": true
    }
  ]
}
```
