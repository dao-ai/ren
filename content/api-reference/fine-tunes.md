# 微调

管理微调工作，使模型适合特定的训练数据。

相关指南: Fine-tune models

## 创建调整

`POST`: https://api.openai.com/v1/fine-tunes

创建从给定数据集对指定模型进行微调的作业。

响应包含排队作业的详细信息，包括完成后的作业状态和调优模型的名称。

了解更多关于微调的信息

**请求体**:

| 参数                           | 类型    | 必须     | 默认  | 描述                                                                                                                                                                                                                                                                                                                   |
| ------------------------------ | ------- | -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| training_file                  | string  | Required |       | 上传的培训数据文件 ID。有关如何上传文件，请参见上传文件。您的数据集必须格式化为 JSONL 文件，其中每个训练示例都是带有“提示”和“完成”键的 JSON 对象。此外，您必须上传带有微调目的的文件。有关详细信息，请参阅微调指南。                                                                                                   |
| validation_file                | string  | Optional |       | 包含验证数据的上传文件的 ID。如果您提供此文件，则在调优期间，数据将用于定期生成验证指标。这些指标可以在微调结果文件中查看。训练数据和验证数据应该是互斥的。您的数据集必须格式化为 JSONL 文件，其中每个验证示例都是带有“提示”和“完成”键的 JSON 对象。此外，您必须上传带有微调目的的文件。有关详细信息，请参阅微调指南。 |
| model                          | string  | Optional | curie | 要微调的基本模型的名称。您可以从“ada”、“babbage”、“curie”、“davinci”或在 2022-04-21 之后创建的微调模型中选择一个。要了解关于这些模型的更多信息，请参阅 models 文档。                                                                                                                                                   |
| n_epochs                       | integer | Optional | 4     | 训练模型的 epoch 数。epoch 指的是训练数据集的一个完整周期。                                                                                                                                                                                                                                                            |
| batch_size                     | integer | Optional | null  | 用于培训的批大小。批大小是用于训练单个向前和向后传递的训练示例的数量。默认情况下，批处理大小将被动态配置为训练集中示例数量的~0.2%，上限为 256 -通常情况下，我们发现更大的批处理大小往往更适合于更大的数据集。                                                                                                          |
| learning_rate_multiplier       | number  | Optional | null  | 用于训练的学习率乘数。微调学习率是用于预训练的原始学习率乘以此值。默认情况下，学习率乘数是 0.05、0.1 或 0.2，这取决于最终的 batch_size(较大的学习率往往在较大的批处理大小下表现更好)。我们建议在 0.02 到 0.2 的范围内进行试验，看看什么会产生最好的结果。                                                              |
| prompt_loss_weight             | number  | Optional | 0.01  | 用于提示令牌损失的权重。这控制了模型尝试学习生成提示的程度(与完成度的权重始终为 1.0 相比)，并且可以在完成度较短时为训练添加稳定效果。如果提示非常长(相对于完成)，减少这个权重可能是有意义的，以避免过度优先学习提示。                                                                                                  |
| compute_classification_metrics | boolean | Optional | false | 如果设置了，我们将在每个纪元结束时使用验证集计算特定于分类的指标，如准确性和 F-1 分数。这些指标可以在结果文件中查看。为了计算分类指标，必须提供 validation_file。此外，必须为多类分类指定 classification_n_classes，为二进制分类指定 classification_positive_class。                                                   |
| classification_n_classes       | integer | Optional | null  | 分类任务中的类数。多类分类时，此参数必选。                                                                                                                                                                                                                                                                             |
| classification_positive_class  | string  | Optional | null  | 二元分类中的正类在进行二进制分类时，需要这个参数来生成精度、召回率和 F1 指标。                                                                                                                                                                                                                                         |
| classification_betas           | array   | Optional | null  | 如果提供了这个，我们将在指定的 beta 值处计算 F-beta 分数。F-beta 分数是 F-1 分数的泛化。这只用于二进制分类。如果 beta 值为 1(即 F-1 分)，精确度和回忆率具有相同的权重。更大的测试分数更注重回忆，而不是准确性。测试版分数越小，精确度就越重要，回忆就越不重要。                                                        |
| suffix                         | string  | Optional | null  | 一个最多 40 个字符的字符串，将被添加到经过微调的模型名称中。例如，后缀“custom-model-name”将生成像 ada:ft-your-org:custom-model-name-2022-02-15-04-21-04 这样的模型名。                                                                                                                                                 |

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createFineTune({
  training_file: "file-XGinujblHPwGLSztz8cPS8XY",
});
```

返回

```json
{
  "id": "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
  "object": "fine-tune",
  "model": "curie",
  "created_at": 1614807352,
  "events": [
    {
      "object": "fine-tune-event",
      "created_at": 1614807352,
      "level": "info",
      "message": "Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."
    }
  ],
  "fine_tuned_model": null,
  "hyperparams": {
    "batch_size": 4,
    "learning_rate_multiplier": 0.1,
    "n_epochs": 4,
    "prompt_loss_weight": 0.1
  },
  "organization_id": "org-...",
  "result_files": [],
  "status": "pending",
  "validation_files": [],
  "training_files": [
    {
      "id": "file-XGinujblHPwGLSztz8cPS8XY",
      "object": "file",
      "bytes": 1547276,
      "created_at": 1610062281,
      "filename": "my-data-train.jsonl",
      "purpose": "fine-tune-train"
    }
  ],
  "updated_at": 1614807352
}
```

## 列出微调

`GET`: https://api.openai.com/v1/fine-tunes

列出组织的微调工作

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listFineTunes();
```

返回

```json
{
  "object": "list",
  "data": [
    {
      "id": "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
      "object": "fine-tune",
      "model": "curie",
      "created_at": 1614807352,
      "fine_tuned_model": null,
      "hyperparams": { ... },
      "organization_id": "org-...",
      "result_files": [],
      "status": "pending",
      "validation_files": [],
      "training_files": [{}],
      "updated_at": 1614807352
    },
    { ... },
    { ... }
  ]
}
```

## 检索微调

`GET`: https://api.openai.com/v1/fine-tunes/{fine_tune_id}

获取有关微调作业的信息。

了解更多关于微调的信息

**路径参数**:

| 参数         | 类型   | 必须     | 描述                        |
| ------------ | ------ | -------- | --------------------------- |
| fine_tune_id | string | Required | The ID of the fine-tune job |

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.retrieveFineTune("ft-AF1WoRqd3aJAHsqc9NY7iL8F");
```

返回

```json
{
  "id": "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
  "object": "fine-tune",
  "model": "curie",
  "created_at": 1614807352,
  "events": [
    {
      "object": "fine-tune-event",
      "created_at": 1614807352,
      "level": "info",
      "message": "Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807356,
      "level": "info",
      "message": "Job started."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807861,
      "level": "info",
      "message": "Uploaded snapshot: curie:ft-acmeco-2021-03-03-21-44-20."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Uploaded result files: file-QQm6ZpqdNwAaVC3aSz5sWwLT."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Job succeeded."
    }
  ],
  "fine_tuned_model": "curie:ft-acmeco-2021-03-03-21-44-20",
  "hyperparams": {
    "batch_size": 4,
    "learning_rate_multiplier": 0.1,
    "n_epochs": 4,
    "prompt_loss_weight": 0.1
  },
  "organization_id": "org-...",
  "result_files": [
    {
      "id": "file-QQm6ZpqdNwAaVC3aSz5sWwLT",
      "object": "file",
      "bytes": 81509,
      "created_at": 1614807863,
      "filename": "compiled_results.csv",
      "purpose": "fine-tune-results"
    }
  ],
  "status": "succeeded",
  "validation_files": [],
  "training_files": [
    {
      "id": "file-XGinujblHPwGLSztz8cPS8XY",
      "object": "file",
      "bytes": 1547276,
      "created_at": 1610062281,
      "filename": "my-data-train.jsonl",
      "purpose": "fine-tune-train"
    }
  ],
  "updated_at": 1614807865
}
```

## 取消微调

`POST`: https://api.openai.com/v1/fine-tunes/{fine_tune_id}/cancel

立即取消微调作业。

**路径参数**:

| 参数         | 字符   | 需要     | 描述                                  |
| ------------ | ------ | -------- | ------------------------------------- |
| fine_tune_id | string | Required | The ID of the fine-tune job to cancel |

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.cancelFineTune("ft-AF1WoRqd3aJAHsqc9NY7iL8F");
```

**返回**:

```json
{
  "id": "ft-xhrpBbvVUzYGo8oUO1FY4nI7",
  "object": "fine-tune",
  "model": "curie",
  "created_at": 1614807770,
  "events": [{...}],
  "fine_tuned_model": null,
  "hyperparams": {...},
  "organization_id": "org-...",
  "result_files": [],
  "status": "cancelled",
  "validation_files": [],
  "training_files": [
    {
      "id": "file-XGinujblHPwGLSztz8cPS8XY",
      "object": "file",
      "bytes": 1547276,
      "created_at": 1610062281,
      "filename": "my-data-train.jsonl",
      "purpose": "fine-tune-train"
    }
  ],
  "updated_at": 1614807789
}
```

## 列出微调事件

`GET`: https://api.openai.com/v1/fine-tunes/{fine_tune_id}/events

获取微调作业的细粒度状态更新。

**路径参数**:

|                  |                   |          |
| ---------------- | ----------------- | -------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fine_tune_id     | string            | Required |                   | The ID of the fine-tune job to get events for.                                                                                                                                                                                                                  |
| Query parameters | stream \| boolean | Optional | Defaults to false | Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only server-sent events as they become available. The stream will terminate with a data: [DONE] message when the job is finished (succeeded, cancelled, or failed). |

If set to false, only events generated so far will be returned.

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listFineTuneEvents("ft-AF1WoRqd3aJAHsqc9NY7iL8F");
```

返回

```json
{
  "object": "list",
  "data": [
    {
      "object": "fine-tune-event",
      "created_at": 1614807352,
      "level": "info",
      "message": "Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807356,
      "level": "info",
      "message": "Job started."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807861,
      "level": "info",
      "message": "Uploaded snapshot: curie:ft-acmeco-2021-03-03-21-44-20."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Uploaded result files: file-QQm6ZpqdNwAaVC3aSz5sWwLT."
    },
    {
      "object": "fine-tune-event",
      "created_at": 1614807864,
      "level": "info",
      "message": "Job succeeded."
    }
  ]
}
```

## 删除微调模型

`DELETE`: https://api.openai.com/v1/models/{model}

删除一个经过微调的模型。您的组织中必须具有“Owner”角色。

**路径参数**:

| 模型  | 字符   | 必须     | 描述                |
| ----- | ------ | -------- | ------------------- |
| model | string | Required | The model to delete |

**示例**:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.deleteModel("curie:ft-acmeco-2021-03-03-21-44-20");
```

返回

```json
{
  "id": "curie:ft-acmeco-2021-03-03-21-44-20",
  "object": "model",
  "deleted": true
}
```
