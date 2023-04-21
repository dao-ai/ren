# 聊天

给定一个聊天对话，该模型将返回一个聊天完成响应。

## 创建聊天补全 `Beta`

`POST`: https://api.openai.com/v1/chat/completions

Creates a completion for the chat message

**请求体**:

| 参数              | 类型            | 必须     | 默认  | 描述                                                                                                                                                                                                                                                                                                                    |
| ----------------- | --------------- | -------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| model             | string          | Required |       | ID of the model to use. Currently, only gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.                                                                                                                                                                                                                             |
| messages          | array           | Required |       | The messages to generate chat completions for, in the chat format.                                                                                                                                                                                                                                                      |
| temperature       | number          | Optional | 1     | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.We generally recommend altering this or top_p but not both.                                                                         |
| top_p             | number          | Optional | 1     | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.We generally recommend altering this or temperature but not both.            |
| n                 | integer         | Optional | 1     | How many chat completion choices to generate for each input message.                                                                                                                                                                                                                                                    |
| stream            | boolean         | Optional | false | If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.                                                                                                                       |
| stop              | string or array | Optional | null  | Up to 4 sequences where the API will stop generating further tokens.                                                                                                                                                                                                                                                    |
| max_tokens        | integer         | Optional | inf   | The maximum number of tokens allowed for the generated answer. By default, the number of tokens the model can return will be (4096 - prompt tokens).                                                                                                                                                                    |
| presence_penalty  | number          | Optional | 0     | 介于-2.0 和 2.0 之间的数字。正值会根据新标记到目前为止是否出现在文本中来惩罚它们，从而增加模型谈论新主题的可能性。请参阅有关频率和存在惩罚的更多信息。                                                                                                                                                                  |
| frequency_penalty | number          | Optional | 0     | 介于-2.0 和 2.0 之间的数字。正值会根据新符号在文本中的现有频率来惩罚它们，从而降低模型逐字重复同一行的可能性。请参阅有关频率和存在惩罚的更多信息。                                                                                                                                                                      |
| logit_bias        | map             | Optional | null  | 修改指定令牌在补全中出现的可能性。接受一个 json 对象，该对象将标记(由标记器中的标记 ID 指定)映射到从-100 到 100 的关联偏差值。在数学上，偏差被添加到抽样前由模型生成的对数中。每个模型的确切效果会有所不同，但介于-1 和 1 之间的值应该会减少或增加选择的可能性;像-100 或 100 这样的值应该导致相关令牌的禁止或排他选择。 |
| user              | string          | Optional |       | 代表终端用户的唯一标识符，可以帮助 OpenAI 监视和检测滥用。学习更多的知识。                                                                                                                                                                                                                                              |

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello world" }],
});
console.log(completion.data.choices[0].message);
```

**参数**:

```json
{
  "model": "gpt-3.5-turbo",
  "messages": [{ "role": "user", "content": "Hello!" }]
}
```

**返回**:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "\n\nHello there, how may I assist you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```
