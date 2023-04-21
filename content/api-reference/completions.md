# 补全

给定一个提示，模型将返回一个或多个预测的补全，并且还可以返回每个位置上替代标记的概率。

## 创建补全

`POST`: https://api.openai.com/v1/completions

为提供的提示符和参数创建补全

**请求体**:

| 参数              | 类型            | 必须     | 默认              | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | --------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| model             | string          | Required |                   | 要使用的模型的 ID。您可以使用列表模型 API 来查看所有可用的模型，或者查看我们的模型概述来了解它们的描述。                                                                                                                                                                                                                                                                                                                                                            |
| prompt            | string or array | Optional | `<\|endoftext\|>` | 用于生成补全的提示符，编码为字符串、字符串数组、令牌数组或令牌数组。注意，&lt;\|endoftext\|&gt;是模型在训练过程中看到的文档分隔符，因此如果没有指定提示符，模型将像从新文档的开头生成一样。                                                                                                                                                                                                                                                                         |
| suffix            | string          | Optional | null              | 在插入文本完成后出现的后缀。                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| max_tokens        | integer         | Optional | 16                | 在补全过程中生成的最大令牌数。提示符的标记计数加上 max_tokens 不能超过模型的上下文长度。大多数模型的上下文长度为 2048 个令牌(除了最新的模型，它支持 4096 个)。                                                                                                                                                                                                                                                                                                      |
| temperature       | number          | Optional | 1                 | 使用什么取样温度，0 到 2 之间。较高的值(如 0.8)将使输出更加随机，而较低的值(如 0.2)将使输出更加集中和确定。我们通常建议修改这个或 `top_p`，但不建议同时修改。                                                                                                                                                                                                                                                                                                       |
| top_p             | number          | Optional | 1                 | 温度采样的另一种替代方法称为核采样，其中模型考虑具有 `top_p` 概率质量的标记的结果。所以 0.1 意味着只考虑包含前 10%概率质量的令牌。我们通常建议改变这个或温度，但不建议两者都改变。                                                                                                                                                                                                                                                                                  |
| n                 | integer         | Optional | 1                 | 为每个提示符生成多少个补全。注意:因为这个参数会生成很多补全，所以它会很快消耗掉你的令牌配额。请谨慎使用，并确保您对 max_tokens 有合理的设置，然后停止。                                                                                                                                                                                                                                                                                                             |
| stream            | boolean         | Optional | false             | 是否回流部分进度。如果设置了，令牌将在它们可用时作为仅数据的[服务器发送事件](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)发送，流由`data:[DONE]`消息终止。                                                                                                                                                                                                                                     |
| logprobs          | integer         | Optional | null              | 包括 logprobs 最可能令牌的对数概率，以及所选令牌。例如，如果 logprobs 为 5,API 将返回 5 个最可能的令牌的列表。API 将始终返回采样令牌的 logprobb，因此响应中最多可能有 logprobs+1 个元素。logprobs 的最大值为 5。如果您需要更多，请通过我们的帮助中心联系我们，并描述您的用例。                                                                                                                                                                                      |
| echo              | boolean         | Optional | false             | 除了完成之外，还回显提示符                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| stop              | string or array | Optional | null              | 最多 4 个序列，API 将停止生成进一步的令牌。返回的文本将不包含停止序列。                                                                                                                                                                                                                                                                                                                                                                                             |
| presence_penalty  | number          | Optional | 0                 | 介于-2.0 和 2.0 之间的数字。正值会根据新标记到目前为止是否出现在文本中来惩罚它们，从而增加模型谈论新主题的可能性。请参阅有关频率和存在惩罚的更多信息。                                                                                                                                                                                                                                                                                                              |
| frequency_penalty | number          | Optional | 0                 | 介于-2.0 和 2.0 之间的数字。正值会根据新符号在文本中的现有频率来惩罚它们，从而降低模型逐字重复同一行的可能性。请参阅有关频率和存在惩罚的更多信息。                                                                                                                                                                                                                                                                                                                  |
| best_of           | integer         | Optional | 1                 | 在服务器端生成 best_of 补全，并返回“best”(每个令牌具有最高日志概率的那个)。结果不能流。当与 n 一起使用时，best_of 控制候选补全的数量，n 指定返回多少- best_of 必须大于 n。注意:因为这个参数会生成很多补全，它会很快消耗掉你的令牌配额。请谨慎使用，并确保您对 max_tokens 有合理的设置，然后停止。                                                                                                                                                                   |
| logit_bias        | map             | Optional | null              | 修改指定令牌在补全中出现的可能性。接受一个 json 对象，该对象将标记(由 GPT 标记器中的标记 ID 指定)映射到从-100 到 100 的关联偏差值。您可以使用这个标记器工具(适用于 GPT-2 和 GPT-3)将文本转换为标记 id。在数学上，偏差被添加到抽样前由模型生成的对数中。每个模型的确切效果会有所不同，但介于-1 和 1 之间的值应该会减少或增加选择的可能性;像-100 或 100 这样的值应该导致相关令牌的禁止或排他选择。例如，您可以传递{"50256":-100}来防止生成&lt;\|endoftext\|&gt;令牌。 |
| user              | string          | Optional |                   | 代表终端用户的唯一标识符，可以帮助 OpenAI 监视和检测滥用。学习更多的知识。                                                                                                                                                                                                                                                                                                                                                                                          |

```js title="示例:text-davinci-003"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});
```

```json title="参数:text-davinci-003"
{
  "model": "text-davinci-003",
  "prompt": "Say this is a test",
  "max_tokens": 7,
  "temperature": 0,
  "top_p": 1,
  "n": 1,
  "stream": false,
  "logprobs": null,
  "stop": "\n"
}
```

```json title="返回:text-davinci-003"
{
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-davinci-003",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}
```
