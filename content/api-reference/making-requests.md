# 发出请求

You can paste the command below into your terminal to run your first API request. Make sure to replace YOUR_API_KEY with your secret API key.

```sh
curl https://api.openai.com/v1/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}'
```

This request queries the Davinci model to complete the text starting with a prompt of "Say this is a test". The max_tokens parameter sets an upper bound on how many tokens the API will return. You should get a response back that resembles the following:

```json
{
  "id": "cmpl-GERzeJQ4lvqPk8SkZu4XMIuR",
  "object": "text_completion",
  "created": 1586839808,
  "model": "text-davinci:003",
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

Now you've generated your first completion. If you concatenate the prompt and the completion text (which the API will do for you if you set the echo parameter to true), the resulting text is "Say this is a test. This is indeed a test." You can also set the stream parameter to true for the API to stream back text (as data-only server-sent events).
