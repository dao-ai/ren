# 微调

了解如何为您的应用程序定制模型。

## 简介

微调可以让你从 API 提供的模型中获得更多:

1. 高质量的结果比及时的设计
1. 能够训练更多的例子，超过可以在提示
1. 由于更短的提示，令牌节省
1. 低延迟请求

GPT-3 已经在来自开放互联网的大量文本上进行了预训练。
当给出一个只有几个例子的提示时，它通常可以凭直觉判断出你要执行的任务，并生成一个合理的完成结果。
这通常被称为“几次学习”。

通过对比提示中适合的更多的示例进行训练，微调改进了少数镜头学习，让您在大量任务中获得更好的结果。
一旦对模型进行了微调，就不再需要在提示符中提供示例了。
这节省了成本并支持较低的延迟请求。

在高层次上，微调包括以下步骤:

1. 准备和上传培训数据
1. 训练一个新的微调模型
1. 使用您的微调模型

访问我们的定价页面，了解更多关于微调模型训练和使用是如何计费的。

### 哪些模型可以微调?

微调目前只适用于以下基本模型:davinci, curie, babbage, and ada.
这些是原始模型，在训练之后没有任何指令(例如 text-davinci-003)。
您还可以继续对已调优的模型进行微调，以添加额外的数据，而不必从头开始。

### 安装

我们建议使用 OpenAI 命令行界面(CLI)。要安装此程序，请运行

```sh
pip install --upgrade openai
```

(以下说明适用于 0.9.4 及更高版本。另外，OpenAI CLI 需要 python 3。)

通过在你的 shell 初始化脚本(例如 .bashrc, .zshrc 等)中添加以下行来设置你的 OPENAI_API_KEY 环境变量，或者在调优命令之前在命令行中运行它:

```sh
export OPENAI_API_KEY="<OPENAI_API_KEY>"
```

### 准备培训数据

训练数据是你如何教 GPT-3 你想让它说什么。

您的数据必须是 JSONL 文档，其中每一行都是对应于一个训练示例的提示-补全对。
您可以使用我们的 CLI 数据准备工具轻松地将数据转换为这种文件格式。

```sh
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
...
```

设计用于微调的提示符和补全与设计用于基本模型(Davinci, Curie, Babbage, Ada)的提示符不同。
特别是，虽然基本模型的提示通常由多个示例组成(“少镜头学习”)，但为了进行微调，每个训练示例通常由单个输入示例及其相关输出组成，而不需要给出详细的说明或在同一提示中包含多个示例。

有关如何为各种任务准备训练数据的更详细指导，请参阅我们的准备数据集最佳实践。

训练的例子越多越好。我们建议至少有几百个例子。一般来说，我们发现数据集大小每增加一倍，就会导致模型质量的线性增长。

#### CLI 数据准备工具

我们开发了一个工具，可以验证、提供建议并重新格式化您的数据:

```sh
openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
```

该工具接受不同的格式，唯一的要求是它们包含提示符和完成列/键。
您可以传递一个 CSV、TSV、XLSX、JSON 或 JSONL 文件，在指导您完成建议的更改过程后，它会将输出保存到一个 JSONL 文件中，以便进行微调。

### 创建一个微调模型

下面假设你已经按照上面的说明准备好了训练数据。

使用 OpenAI 命令行开始你的调优工作:

```sh
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>
```

其中 BASE_MODEL 是您开始的基本模型的名称(ada, babbage, curie 或 davinci)。
您可以使用 suffix 参数自定义经过微调的模型的名称。

运行上面的命令会做几件事:

1. 使用 files API 上传文件(或使用已经上传的文件)
2. 创建微调作业
3. 流事件直到作业完成(这通常需要几分钟，但如果队列中有很多作业或数据集很大，则可能需要几个小时)

每个微调工作都从一个基本模型开始，默认为 curie 模型。
模型的选择既影响模型的性能，也影响运行经过微调的模型的成本。
你的模型可以是 ada, babbage, curie, or davinci。
请访问我们的定价页面了解微调费率的详细信息。

在开始一项微调工作之后，可能需要一些时间才能完成。
你的作业可能排在我们系统上其他作业的后面，训练我们的模型可能需要几分钟或几小时，这取决于模型和数据集大小。
如果事件流因任何原因中断，您可以通过运行以下命令恢复它:

```sh
openai api fine_tunes.follow -i <YOUR_FINE_TUNE_JOB_ID>
```

当工作完成时，它应该显示经过微调的模型的名称。

除了创建微调作业外，您还可以列出现有作业、检索作业的状态或取消作业。

```sh

# List all created fine-tunes

openai api fine_tunes.list

# Retrieve the state of a fine-tune. The resulting object includes

# job status (which can be one of pending, running, succeeded, or failed)

# and other information

openai api fine_tunes.get -i <YOUR_FINE_TUNE_JOB_ID>

# Cancel a job

openai api fine_tunes.cancel -i <YOUR_FINE_TUNE_JOB_ID>
```

### 使用经过微调的模型

当作业成功时，fine_tuned_model 字段将填充模型的名称。现在你可以将这个模型指定为 Completions API 的参数，并使用 Playground 向它发出请求。

在您的任务第一次完成后，您的模型可能需要几分钟才能准备好处理请求。如果对模型的完成请求超时，很可能是因为模型仍在加载中。如果发生这种情况，几分钟后再试一次。

你可以通过传递模型名作为完成请求的模型参数来开始请求:

OpenAI CLI:

```sh
openai api completions.create -m <FINE_TUNED_MODEL> -p <YOUR_PROMPT>
```

cURL:

```sh
curl https://api.openai.com/v1/completions \
 -H "Authorization: Bearer $OPENAI_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{"prompt": YOUR_PROMPT, "model": FINE_TUNED_MODEL}'
```

Python:

```py
import openai
openai.Completion.create(
model=FINE_TUNED_MODEL,
prompt=YOUR_PROMPT)
```

Node.js:

```js
const response = await openai.createCompletion({
model: FINE_TUNED_MODEL
prompt: YOUR_PROMPT,
});
```

你可以继续使用所有其他的 Completions 参数，比如 temperature, frequency_penalty, presence_penalty 等，对这些请求进行微调模型。

### 删除一个经过微调的模型

要删除一个经过微调的模型，您必须在组织中指定一个“所有者”。

OpenAI CLI:

```sh
openai api models.delete -i <FINE_TUNED_MODEL>
```

cURL:

```sh
curl -X "DELETE" https://api.openai.com/v1/models/<FINE_TUNED_MODEL> \
 -H "Authorization: Bearer $OPENAI_API_KEY"
```

Python:

```py
import openai
openai.Model.delete(FINE_TUNED_MODEL)
```

## 准备数据集

微调是创建特定于用例的新模型的强大技术。在对您的模型进行微调之前，我们强烈建议您阅读以下用例的最佳实践和具体指南。

### 数据格式

要对模型进行微调，您需要一组训练示例，每个示例由单个输入(“提示”)及其相关输出(“完成”)组成。这与使用我们的基本模型明显不同，在基本模型中，您可以在一个提示符中输入详细的说明或多个示例。

- 每个提示符应该以一个固定的分隔符结束，以通知模型提示符何时结束和完成开始。一个简单的分离器通常工作得很好是`\n\n###\n\n`。分隔符不应该出现在任何提示符的其他地方。
- 由于我们的标记化，每个补全都应该以空白开始，标记化大多数单词之前都有空白。
- 每个补全应该以固定的停止序列结束，以便在补全结束时通知模型。停止序列可以是`\n`、`###`或任何不出现在任何补全中的其他标记。

对于推断，您应该按照与创建训练数据集时相同的方式格式化提示，包括相同的分隔符。还要指定相同的停止序列以正确地截断补全。

### 一般最佳实践

使用更多高质量的示例进行微调效果更好。要对模型进行微调，使其比使用我们的基本模型的高质量提示执行得更好，您应该至少提供几百个高质量示例，最好是由人类专家审查。从这里开始，性能会随着示例数量每增加一倍而线性增加。增加示例的数量通常是提高性能的最佳和最可靠的方法。

分类器是最容易入门的模型。对于分类问题，我们建议使用 ada，它在经过微调后的表现通常只比更有能力的模型差一点点，同时速度更快，成本更低。

如果您正在对已有的数据集进行微调，而不是从头开始编写提示，请务必在可能的情况下手动检查数据中的冒犯性或不准确内容，或者在数据集很大的情况下检查尽可能多的随机样本。

### 具体的指导

微调可以解决各种各样的问题，使用它的最佳方式可能取决于您的特定用例。下面，我们列出了用于微调的最常见用例和相应的指导方针。

- 分类

      - 模特是否做了不真实的陈述?
      - 情绪分析
      - 电子邮件分类

- 有条件的代

      - 根据维基百科上的文章写一个吸引人的广告
      - 实体提取
      - 客户支持聊天机器人
      - 基于技术特性表的产品描述

#### 分类

在分类问题中，提示符中的每个输入都应该被分类到预定义的类中。对于这类问题，我们建议:

- 在提示符的末尾使用分隔符，例如`\n\n###\n\n`。记住，当你最终向你的模型发出请求时，也要附加这个分隔符。
- 选择映射到单个令牌的类。在推理时，指定 max_tokens=1，因为您只需要第一个标记进行分类。
- 确保提示符+补全不超过 2048 个令牌，包括分隔符
- 目标是每类至少 100 个例子
- 要获得类日志概率，您可以在使用模型时指定 logprobs=5(用于 5 个类)
- 确保用于微调的数据集在结构和任务类型上与将用于模型的数据集非常相似

#### 案例研究:模型是否做了不真实的陈述?

假设你想确保你网站上的广告文本提到了正确的产品和公司。换句话说，您希望确保模型没有编造任何东西。你可能想要微调一个分类器来过滤掉不正确的广告。

数据集可能看起来像下面这样:

```jsonl
{"prompt":"Company: BHFF insurance\nProduct: allround insurance\nAd:One stop shop for all your insurance needs!\nSupported:", "completion":" yes"}
{"prompt":"Company: Loft conversion specialists\nProduct: -\nAd:Straight teeth in weeks!\nSupported:", "completion":" no"}
```

在上面的例子中，我们使用了一个包含公司名称、产品和相关广告的结构化输入。我们使用`\nSupported:`作为分隔符，它清楚地将提示符与完成符分开。对于足够多的示例，只要分隔符不出现在提示符或完成符中，分隔符就不会产生太大的差异(通常小于 0.4%)。

对于这个用例，我们对 ada 模型进行了微调，因为它将更快、更便宜，并且性能将与大型模型相当，因为它是一个分类任务。

现在我们可以通过完成请求来查询我们的模型。

```sh
curl https://api.openai.com/v1/completions \
 -H 'Content-Type: application/json' \
 -H 'Authorization: Bearer YOUR_API_KEY' \
 -d '{
"prompt": "Company: Reliable accountants Ltd\nProduct: Personal Tax help\nAd:Best advice in town!\nSupported:",
"max_tokens": 1,
"model": "YOUR_FINE_TUNED_MODEL_NAME"
}'
```

它将返回 `yes` 或 `no`。

### Case study: Sentiment analysis

Let's say you'd like to get a degree to which a particular tweet is positive or negative. The dataset might look something like the following:

```json
{ "prompt": "Overjoyed with the new iPhone! ->", "completion": " positive" }
```

```json
{
  "prompt": "@lakers disappoint for a third straight night https://t.co/38EFe43 ->",
  "completion": " negative"
}
```

Once the model is fine-tuned, you can get back the log probabilities for the first completion token by setting logprobs=2 on the completion request. The higher the probability for positive class, the higher the relative sentiment.

Now we can query our model by making a Completion request.

```sh
curl https://api.openai.com/v1/completions \
 -H 'Content-Type: application/json' \
 -H 'Authorization: Bearer YOUR_API_KEY' \
 -d '{
"prompt": "https://t.co/f93xEd2 Excited to share my latest blog post! ->",
"max_tokens": 1,
"model": "YOUR_FINE_TUNED_MODEL_NAME"
}'
```

Which will return:

```json
{
  "id": "cmpl-COMPLETION_ID",
  "object": "text_completion",
  "created": 1589498378,
  "model": "YOUR_FINE_TUNED_MODEL_NAME",
  "choices": [
    {
      "logprobs": {
        "text_offset": [],
        "token_logprobs": [-0.03597255],
        "tokens": [" positive"],
        "top_logprobs": [
          {
            " negative": -4.9785037,
            " positive": -0.03597255
          }
        ]
      },

      "text": " positive",
      "index": 0,
      "finish_reason": "length"
    }
  ]
}
```

### Case study: Categorization for Email triage

Let's say you'd like to categorize incoming email into one of a large number of predefined categories. For classification into a large number of categories, we recommend you convert those categories into numbers, which will work well up to ~500 categories. We've observed that adding a space before the number sometimes slightly helps the performance, due to tokenization. You may want to structure your training data as follows:

```sh
{"prompt":"Subject: <email_subject>\nFrom:<customer_name>\nDate:<date>\nContent:<email_body>\n\n###\n\n", "completion":" <numerical_category>"}
```

For example:

```sh
{"prompt":"Subject: Update my address\nFrom:Joe Doe\nTo:support@ourcompany.com\nDate:2021-06-03\nContent:Hi,\nI would like to update my billing address to match my delivery address.\n\nPlease let me know once done.\n\nThanks,\nJoe\n\n###\n\n", "completion":" 4"}
```

In the example above we used an incoming email capped at 2043 tokens as input. (This allows for a 4 token separator and a one token completion, summing up to 2048.) As a separator we used \n\n###\n\n and we removed any occurrence of ### within the email.

## Conditional generation

Conditional generation is a problem where the content needs to be generated given some kind of input. This includes paraphrasing, summarizing, entity extraction, product description writing given specifications, chatbots and many others. For this type of problem we recommend:

- Use a separator at the end of the prompt, e.g. \n\n###\n\n. Remember to also append this separator when you eventually make requests to your model.
- Use an ending token at the end of the completion, e.g. END
- Remember to add the ending token as a stop sequence during inference, e.g. stop=[" END"]
- Aim for at least ~500 examples
- Ensure that the prompt + completion doesn't exceed 2048 tokens, including the separator
- Ensure the examples are of high quality and follow the same desired format
- Ensure that the dataset used for finetuning is very similar in structure and type of task as what the model will be used for
- Using Lower learning rate and only 1-2 epochs tends to work better for these use cases

### Case study: Write an engaging ad based on a Wikipedia article

This is a generative use case so you would want to ensure that the samples you provide are of the highest quality, as the fine-tuned model will try to imitate the style (and mistakes) of the given examples. A good starting point is around 500 examples. A sample dataset might look like this:

```sh
{"prompt":"<Product Name>\n<Wikipedia description>\n\n###\n\n", "completion":" <engaging ad> END"}
```

For example:

```json
{
  "prompt": "Samsung Galaxy Feel\nThe Samsung Galaxy Feel is an Android smartphone developed by Samsung Electronics exclusively for the Japanese market. The phone was released in June 2017 and was sold by NTT Docomo. It runs on Android 7.0 (Nougat), has a 4.7 inch display, and a 3000 mAh battery.\nSoftware\nSamsung Galaxy Feel runs on Android 7.0 (Nougat), but can be later updated to Android 8.0 (Oreo).\nHardware\nSamsung Galaxy Feel has a 4.7 inch Super AMOLED HD display, 16 MP back facing and 5 MP front facing cameras. It has a 3000 mAh battery, a 1.6 GHz Octa-Core ARM Cortex-A53 CPU, and an ARM Mali-T830 MP1 700 MHz GPU. It comes with 32GB of internal storage, expandable to 256GB via microSD. Aside from its software and hardware specifications, Samsung also introduced a unique a hole in the phone's shell to accommodate the Japanese perceived penchant for personalizing their mobile phones. The Galaxy Feel's battery was also touted as a major selling point since the market favors handsets with longer battery life. The device is also waterproof and supports 1seg digital broadcasts using an antenna that is sold separately.\n\n###\n\n",
  "completion": "Looking for a smartphone that can do it all? Look no further than Samsung Galaxy Feel! With a slim and sleek design, our latest smartphone features high-quality picture and video capabilities, as well as an award winning battery life. END"
}
```

Here we used a multi line separator, as Wikipedia articles contain multiple paragraphs and headings. We also used a simple end token, to ensure that the model knows when the completion should finish.

### Case study: Entity extraction

This is similar to a language transformation task. To improve the performance, it is best to either sort different extracted entities alphabetically or in the same order as they appear in the original text. This will help the model to keep track of all the entities which need to be generated in order. The dataset could look as follows:

```json
{
  "prompt": "<any text, for example news article>\n\n###\n\n",
  "completion": " <list of entities, separated by a newline> END"
}
```

For example:

```json
{
  "prompt": "Portugal will be removed from the UK's green travel list from Tuesday, amid rising coronavirus cases and concern over a \"Nepal mutation of the so-called Indian variant\". It will join the amber list, meaning holidaymakers should not visit and returnees must isolate for 10 days...\n\n###\n\n",
  "completion": " Portugal\nUK\nNepal mutation\nIndian variant END"
}
```

A multi-line separator works best, as the text will likely contain multiple lines. Ideally there will be a high diversity of the types of input prompts (news articles, Wikipedia pages, tweets, legal documents), which reflect the likely texts which will be encountered when extracting entities.

### Case study: Customer support chatbot

A chatbot will normally contain relevant context about the conversation (order details), summary of the conversation so far as well as most recent messages. For this use case the same past conversation can generate multiple rows in the dataset, each time with a slightly different context, for every agent generation as a completion. This use case will require a few thousand examples, as it will likely deal with different types of requests, and customer issues. To ensure the performance is of high quality we recommend vetting the conversation samples to ensure the quality of agent messages. The summary can be generated with a separate text transformation fine tuned model. The dataset could look as follows:

```json
{
  "prompt": "Summary: <summary of the interaction so far>\n\nSpecific information:<for example order details in natural language>\n\n###\n\nCustomer: <message1>\nAgent: <response1>\nCustomer: <message2>\nAgent:",
  "completion": " <response2>\n"
}
```

```json
{
  "prompt": "Summary: <summary of the interaction so far>\n\nSpecific information:<for example order details in natural language>\n\n###\n\nCustomer: <message1>\nAgent: <response1>\nCustomer: <message2>\nAgent: <response2>\nCustomer: <message3>\nAgent:",
  "completion": " <response3>\n"
}
```

Here we purposefully separated different types of input information, but maintained Customer Agent dialog in the same format between a prompt and a completion. All the completions should only be by the agent, and we can use \n as a stop sequence when doing inference.

Case study: Product description based on a technical list of properties
Here it is important to convert the input data into a natural language, which will likely lead to superior performance. For example, the following format:

```json
{
  "prompt": "Item=handbag, Color=army_green, price=$99, size=S->",
  "completion": " This stylish small green handbag will add a unique touch to your look, without costing you a fortune."
}
```

Won't work as well as:

```json
{
  "prompt": "Item is a handbag. Colour is army green. Price is midrange. Size is small.->",
  "completion": " This stylish small green handbag will add a unique touch to your look, without costing you a fortune."
}
```

For high performance ensure that the completions were based on the description provided. If external content is often consulted, then adding such content in an automated way would improve the performance. If the description is based on images, it may help to use an algorithm to extract a textual description of the image. Since completions are only one sentence long, we can use . as the stop sequence during inference.

## Advanced usage

### Customize your model name

You can add a suffix of up to 40 characters to your fine-tuned model name using the suffix parameter.

OpenAI CLI:

```sh
openai api fine_tunes.create -t test.jsonl -m ada --suffix "custom model name"
```

The resulting name would be:

ada:ft-your-org:custom-model-name-2022-02-15-04-21-04

### Analyzing your fine-tuned model

We attach a result file to each job once it has been completed. This results file ID will be listed when you retrieve a fine-tune, and also when you look at the events on a fine-tune. You can download these files:

OpenAI CLI:

```sh
openai api fine_tunes.results -i <YOUR_FINE_TUNE_JOB_ID>
```

CURL:

```sh
curl https://api.openai.com/v1/files/$RESULTS_FILE_ID/content \
 -H "Authorization: Bearer $OPENAI_API_KEY" > results.csv
```

The `_results.csv` file contains a row for each training step, where a step refers to one forward and backward pass on a batch of data. In addition to the step number, each row contains the following fields corresponding to that step:

- **elapsed_tokens**: the number of tokens the model has seen so far (including repeats)
- **elapsed_examples**: the number of examples the model has seen so far (including repeats), where one example is one element in your batch. For example, if batch_size = 4, each step will increase elapsed_examples by 4.
- **training_loss**: loss on the training batch
- **training_sequence_accuracy**: the percentage of completions in the training batch for which the model's predicted tokens matched the true completion tokens exactly. For example, with a batch_size of 3, if your data contains the completions [[1, 2], [0, 5], [4, 2]] and the model predicted [[1, 1], [0, 5], [4, 2]], this accuracy will be 2/3 = 0.67
- **training_token_accuracy**: the percentage of tokens in the training batch that were correctly predicted by the model. For example, with a batch_size of 3, if your data contains the completions [[1, 2], [0, 5], [4, 2]] and the model predicted [[1, 1], [0, 5], [4, 2]], this accuracy will be 5/6 = 0.83

### Classification specific metrics

We also provide the option of generating additional classification-specific metrics in the results file, such as accuracy and weighted F1 score. These metrics are periodically calculated against the full validation set and at the end of fine-tuning. You will see them as additional columns in your results file.

To enable this, set the parameter --compute_classification_metrics. Additionally, you must provide a validation file, and set either the classification_n_classes parameter, for multiclass classification, or classification_positive_class, for binary classification.

OpenAI CLI:

```sh

# For multiclass classification

openai api fine_tunes.create \
 -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_OR_PATH> \
 -m <MODEL> \
 --compute_classification_metrics \
 --classification_n_classes <N_CLASSES>

# For binary classification

openai api fine_tunes.create \
 -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_OR_PATH> \
 -m <MODEL> \
 --compute_classification_metrics \
 --classification_n_classes 2 \
 --classification_positive_class <POSITIVE_CLASS_FROM_DATASET>
```

The following metrics will be displayed in your results file if you set --compute_classification_metrics:

### For multiclass classification

- classification/accuracy: accuracy
- classification/weighted_f1_score: weighted F-1 score

### For binary classification

The following metrics are based on a classification threshold of 0.5 (i.e. when the probability is > 0.5, an example is classified as belonging to the positive class.)

- classification/accuracy
- classification/precision
- classification/recall
- classification/f{beta}
- classification/auroc - AUROC
- classification/auprc - AUPRC

Note that these evaluations assume that you are using text labels for classes that tokenize down to a single token, as described above. If these conditions do not hold, the numbers you get will likely be wrong.

### Validation

You can reserve some of your data for validation. A validation file has exactly the same format as a train file, and your train and validation data should be mutually exclusive.

If you include a validation file when creating your fine-tune job, the generated results file will include evaluations on how well the fine-tuned model performs against your validation data at periodic intervals during training.

OpenAI CLI:

```sh
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_ID_OR_PATH> \
 -m <MODEL>
```

If you provided a validation file, we periodically calculate metrics on batches of validation data during training time. You will see the following additional metrics in your results file:

- validation_loss: loss on the validation batch
- validation_sequence_accuracy: the percentage of completions in the validation batch for which the model's predicted tokens matched the true completion tokens exactly. For example, with a batch_size of 3, if your data contains the completion [[1, 2], [0, 5], [4, 2]] and the model predicted [[1, 1], [0, 5], [4, 2]], this accuracy will be 2/3 = 0.67
- validation_token_accuracy: the percentage of tokens in the validation batch that were correctly predicted by the model. For example, with a batch_size of 3, if your data contains the completion [[1, 2], [0, 5], [4, 2]] and the model predicted [[1, 1], [0, 5], [4, 2]], this accuracy will be 5/6 = 0.83

## Hyperparameters

We've picked default hyperparameters that work well across a range of use cases. The only required parameter is the training file.

That said, tweaking the hyperparameters used for fine-tuning can often lead to a model that produces higher quality output. In particular, you may want to configure the following:

- model: The name of the base model to fine-tune. You can select one of "ada", "babbage", "curie", or "davinci". To learn more about these models, see the Models documentation.
- n_epochs - defaults to 4. The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.
- batch_size - defaults to ~0.2% of the number of examples in the training set, capped at 256. The batch size is the number of training examples used to train a single forward and backward pass. In general, we've found that larger batch sizes tend to work better for larger datasets.
- learning_rate_multiplier - defaults to 0.05, 0.1, or 0.2 depending on final batch_size. The fine-tuning learning rate is the original learning rate used for pretraining multiplied by this multiplier. We recommend experimenting with values in the range 0.02 to 0.2 to see what produces the best results. Empirically, we've found that larger learning rates often perform better with larger batch sizes.
- compute_classification_metrics - defaults to False. If True, for fine-tuning for classification tasks, computes classification-specific metrics (accuracy, F-1 score, etc) on the validation set at the end of every epoch.

To configure these additional hyperparameters, pass them in via command line flags on the OpenAI CLI, for example:

```sh
openai api fine_tunes.create \
 -t file-JD89ePi5KMsB3Tayeli5ovfW \
 -m ada \
 --n_epochs 1
```

### Continue fine-tuning from a fine-tuned model

If you have already fine-tuned a model for your task and now have additional training data that you would like to incorporate, you can continue fine-tuning from the model. This creates a model that has learned from all of the training data without having to re-train from scratch.

To do this, pass in the fine-tuned model name when creating a new fine-tuning job (e.g. -m curie:ft-<org>-<date>). Other training parameters do not have to be changed, however if your new training data is much smaller than your previous training data, you may find it useful to reduce learning_rate_multiplier by a factor of 2 to 4.

Weights & Biases
You can sync your fine-tunes with Weights & Biases to track experiments, models, and datasets.

To get started, you will need a Weights & Biases account and a paid OpenAI plan. To make sure you are using the lastest version of openai and wandb, run:

```sh
pip install --upgrade openai wandb
```

To sync your fine-tunes with Weights & Biases, run:

```sh
openai wandb sync
```

You can read the Weights & Biases documentation for more information on this integration.

## Example notebooks

### Classification

finetuning-classification.ipynb
This notebook will demonstrate how to fine-tune a model that can classify whether a piece of input text is related to Baseball or Hockey. We will perform this task in four steps in the notebook:

1. Data exploration will give an overview of the data source and what an example looks like
1. Data preparation will turn our data source into a jsonl file that can be used for fine-tuning
1. Fine-tuning will kick off the fine-tuning job and explain the resulting model's performance
1. Using the model will demonstrate making requests to the fine-tuned model to get predictions.

### Question answering

olympics-1-collect-data.ipynbolympics-2-create-qa.ipynbolympics-3-train-qa.ipynb
The idea of this project is to create a question answering model, based on a few paragraphs of provided text. Base GPT-3 models do a good job at answering questions when the answer is contained within the paragraph, however if the answer isn't contained, the base models tend to try their best to answer anyway, often leading to confabulated answers.

To create a model which answers questions only if there is sufficient context for doing so, we first create a dataset of questions and answers based on paragraphs of text. In order to train the model to answer only when the answer is present, we also add adversarial examples, where the question doesn't match the context. In those cases, we ask the model to output "No sufficient context for answering the question".

We will perform this task in three notebooks:

The first notebook focuses on collecting recent data, which GPT-3 didn't see during it's pre-training. We picked the topic of Olympic Games 2020 (which actually took place in the summer of 2021), and downloaded 713 unique pages. We organized the dataset by individual sections, which will serve as context for asking and answering the questions.
The second notebook will utilize Davinci-instruct to ask a few questions based on a Wikipedia section, as well as answer those questions, based on that section.
The third notebook will utilize the dataset of context, question and answer pairs to additionally create adversarial questions and context pairs, where the question was not generated on that context. In those cases the model will be prompted to answer "No sufficient context for answering the question". We will also train a discriminator model, which predicts whether the question can be answered based on the context or not.
