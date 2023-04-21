# 适度

Overview
The moderation endpoint is a tool you can use to check whether content complies with OpenAI's usage policies. Developers can thus identify content that our usage policies prohibits and take action, for instance by filtering it.

The models classifies the following categories:

CATEGORY DESCRIPTION
hate Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste.
hate/threatening Hateful content that also includes violence or serious harm towards the targeted group.
self-harm Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting, and eating disorders.
sexual Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness).
sexual/minors Sexual content that includes an individual who is under 18 years old.
violence Content that promotes or glorifies violence or celebrates the suffering or humiliation of others.
violence/graphic Violent content that depicts death, violence, or serious physical injury in extreme graphic detail.
The moderation endpoint is free to use when monitoring the inputs and outputs of OpenAI APIs. We currently do not support monitoring of third-party traffic.

We are continuously working to improve the accuracy of our classifier and are especially working to improve the classifications of hate, self-harm, and violence/graphic content. Our support for non-English languages is currently limited.

## Quickstart

To obtain a classification for a piece of text, make a request to the moderation endpoint as demonstrated in the following code snippets:

Example: Getting moderations
curl

curl

```sh
curl https://api.openai.com/v1/moderations \
 -X POST \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $OPENAI_API_KEY" \
 -d '{"input": "Sample text goes here"}'
```

Below is an example output of the endpoint. It returns the following fields:

flagged: Set to true if the model classifies the content as violating OpenAI's usage policies, false otherwise.
categories: Contains a dictionary of per-category binary usage policies violation flags. For each category, the value is true if the model flags the corresponding category as violated, false otherwise.
category_scores: Contains a dictionary of per-category raw scores output by the model, denoting the model's confidence that the input violates the OpenAI's policy for the category. The value is between 0 and 1, where higher values denote higher confidence. The scores should not be interpreted as probabilities.

```json
{
  "id": "modr-XXXXX",
  "model": "text-moderation-001",
  "results": [
    {
      "categories": {
        "hate": false,
        "hate/threatening": false,
        "self-harm": false,
        "sexual": false,
        "sexual/minors": false,
        "violence": false,
        "violence/graphic": false
      },
      "category_scores": {
        "hate": 0.18805529177188873,
        "hate/threatening": 0.0001250059431185946,
        "self-harm": 0.0003706029092427343,
        "sexual": 0.0008735615410842001,
        "sexual/minors": 0.0007470346172340214,
        "violence": 0.0041268812492489815,
        "violence/graphic": 0.00023186142789199948
      },
      "flagged": false
    }
  ]
}
```

OpenAI will continuously upgrade the moderation endpoint's underlying model. Therefore, custom policies that rely on category_scores may need recalibration over time.
