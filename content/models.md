---
link: https://platform.openai.com/docs/models
---

# 模型

## 概述

OpenAI API 由一组具有不同功能和价格点的不同模型提供支持。您还可以通过微调对我们的原始基本模型进行有限的定制。

| MODELS             | DESCRIPTION                                            |
| ------------------ | ------------------------------------------------------ |
| GPT-4 Limited beta | 一组改进 GPT-3.5 的模型，可以理解和生成自然语言或代码  |
| GPT-3.5            | 一组改进 GPT-3 的模型，可以理解和生成自然语言或代码    |
| DALL·E             | 一个模型，可以生成和编辑图像给定的自然语言提示         |
| Whisper            | 可以将音频转换为文本的模型                             |
| Embeddings         | 一组可以将文本转换为数值形式的模型                     |
| Codex Limited beta | 一组能够理解和生成代码的模型，包括将自然语言转换为代码 |
| Moderation         | 一个经过微调的模型，可以检测文本是否敏感或不安全       |
| GPT-3              | 一组能够理解和生成自然语言的模型                       |

我们还发布了包括 [Point-E](https://github.com/openai/point-e)、[Whisper](https://github.com/openai/whisper)、[Jukebox](https://github.com/openai/jukebox) 和 [CLIP](https://github.com/openai/CLIP) 在内的开源模型。

访问我们的[模型索引](https://platform.openai.com/docs/model-index-for-researchers)，为研究人员了解更多关于哪些模型在我们的研究论文中有特色，以及像 InstructGPT 和 GPT-3.5 这样的模型系列之间的差异。

## GPT-4 `Limited beta`

GPT-4 是一个大型的多模态模型(目前接受文本输入并输出文本，未来将有图像输入)，由于其更广泛的常识和先进的推理能力，它可以比我们之前的任何模型更准确地解决难题。与 gpt-3.5-turbo 一样，GPT-4 针对聊天进行了优化，但也适用于传统的完成任务。

GPT-4 目前处于有限的测试阶段，只有被授予访问权限的人才能访问。当容量可用时，请加入等待列表以获得访问。

| LATEST MODEL   | DESCRIPTION                                                                                                                      | MAX TOKENS    | TRAINING DATA  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------- |
| gpt-4          | 比任何 GPT-3.5 模型更强大，能够完成更复杂的任务，并为聊天进行了优化。将与我们最新的模型迭代更新。                                | 8,192 tokens  | Up to Sep 2021 |
| gpt-4-0314     | 2023 年 3 月 14 日的 gpt-4 快照。与 gpt-4 不同的是，该模型将不会接受更新，并且只会在 2023 年 6 月 14 日结束的三个月内得到支持。  | 8,192 tokens  | Up to Sep 2021 |
| gpt-4-32k      | 与基础 gpt-4 模式相同的功能，但上下文长度是它的 4 倍。将与我们最新的模型迭代更新。                                               | 32,768 tokens | Up to Sep 2021 |
| gpt-4-32k-0314 | 2023 年 3 月 14 日 gpt-4-32 的快照。与 gpt-4-32k 不同的是，该型号将不接受更新，并且只支持三个月的时间，截止 2023 年 6 月 14 日。 | 32,768 tokens | Up to Sep 2021 |

对于许多基本任务，GPT-4 和 GPT-3.5 模型之间的差异并不显著。然而，在更复杂的推理情况下，GPT-4 比我们之前的任何模型都更有能力。

## GPT-3.5

GPT-3.5 模型可以理解和生成自然语言或代码。我们最有能力和最具成本效益的模型是 gpt-3.5-turbo，它针对聊天进行了优化，但也适用于传统的完成任务。

| LATEST MODEL       | DESCRIPTION                                                                                                                               | MAX REQUEST  | TRAINING DATA  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------- |
| gpt-3.5-turbo      | 功能最强大的 GPT-3.5 模型和聊天优化，成本为文本 davinci-003 的十分之一。将与我们最新的模型迭代更新。                                      | 4,096 tokens | Up to Sep 2021 |
| gpt-3.5-turbo-0301 | 2023 年 3 月 1 日 gpt-3.5-turbo 的快照。与 gpt-3.5-turbo 不同的是，该型号将不接受更新，并且只支持三个月的时间，截止到 2023 年 6 月 1 日。 | 4,096 tokens | Up to Sep 2021 |
| text-davinci-003   | 与 curie, babbage 或 ada 模型相比，可以以更好的质量，更长的输出和一致的指令遵循来完成任何语言任务。还支持在文本中插入补全。               | 4,000 tokens | Up to Jun 2021 |
| text-davinci-002   | 与 text-davinci-003 功能类似，但使用监督微调而不是强化学习进行训练                                                                        | 4,000 tokens | Up to Jun 2021 |
| code-davinci-002   | 优化代码完成任务                                                                                                                          | 4,000 tokens | Up to Jun 2021 |

我们建议在实验时使用 gpt-3.5-turbo，因为它会产生最好的结果。一旦你有了工作，我们鼓励尝试其他模型，看看你是否能以更低的延迟或成本获得相同的结果。

!!! note

        OpenAI模型是非确定性的，这意味着相同的输入可以产生不同的输出。将温度设置为0将使输出大部分是确定的，但可能会保留少量的可变性。

### Feature-specific 墨香

虽然新的 gpt-3.5-turbo 模型针对聊天进行了优化，但它对传统的完成任务非常有效。原始的 GPT-3.5 模型针对文本补全进行了优化。

我们用于[创建嵌入](https://platform.openai.com/docs/guides/embeddings)和[编辑文本](https://platform.openai.com/docs/guides/completion/editing-text)的端点使用它们自己的专用模型集。

### 找到正确的模式

试验 gpt-3.5-turbo 是了解 API 功能的好方法。
在你知道你想要完成什么之后，你可以继续使用 gpt-3.5-turbo 或其他模型，并尝试围绕它的功能进行优化。

您可以使用 [GPT 比较工具](https://gpttools.com/comparisontool)，该工具允许您并排运行不同的模型来比较输出、设置和响应时间，然后将数据下载到 Excel 电子表格中。

#### Turbo

Turbo 是支持 ChatGPT 的同一个模型家族。
它针对会话聊天输入和输出进行了优化，但与达芬奇模型家族相比，它在补全方面表现同样出色。
任何在 ChatGPT 中可以很好地完成的用例都应该在 API 中的 Turbo 模型家族中表现良好。

Turbo 模型家族也是第一个接受定期更新的模型，如 ChatGPT。

擅长:会话和文本生成

#### Davinci

Davinci is the most capable model family and can perform any task the other models (ada, curie, and babbage) can perform and often with less instruction. For applications requiring a lot of understanding of the content, like summarization for a specific audience and creative content generation, Davinci will produce the best results. These increased capabilities require more compute resources, so Davinci costs more per API call and is not as fast as the other models.

Another area where Davinci shines is in understanding the intent of text. Davinci is quite good at solving many kinds of logic problems and explaining the motives of characters. Davinci has been able to solve some of the most challenging AI problems involving cause and effect.

Good at: Complex intent, cause and effect, summarization for audience

#### Curie

Curie is extremely powerful, yet very fast. While Davinci is stronger when it comes to analyzing complicated text, Curie is quite capable for many nuanced tasks like sentiment classification and summarization. Curie is also quite good at answering questions and performing Q&A and as a general service chatbot.

Good at: Language translation, complex classification, text sentiment, summarization

#### Babbage

Babbage can perform straightforward tasks like simple classification. It’s also quite capable when it comes to Semantic Search ranking how well documents match up with search queries.

Good at: Moderate classification, semantic search classification

#### Ada

Ada is usually the fastest model and can perform tasks like parsing text, address correction and certain kinds of classification tasks that don’t require too much nuance. Ada’s performance can often be improved by providing more context.

Good at: Parsing text, simple classification, address correction, keywords

Note: Any task performed by a faster model like Ada can be performed by a more powerful model like Curie or Davinci.

## DALL·E

DALL·E is a AI system that can create realistic images and art from a description in natural language. We currently support the ability, given a prommpt, to create a new image with a certain size, edit an existing image, or create variations of a user provided image.

The current DALL·E model available through our API is the 2nd iteration of DALL·E with more realistic, accurate, and 4x greater resolution images than the original model. You can try it through the our Labs interface or via the API.

## Whisper

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech recognition as well as speech translation and language identification. The Whisper v2-large model is currently available through our API with the whisper-1 model name.

Currently, there is no difference between the open source version of Whisper and the version available through our API. However, through our API, we offer an optimized inference process which makes running Whisper through our API much faster than doing it through other means. For more technical details on Whisper, you can read the paper.

## Embeddings

嵌入是一种文本的数字表示，可用于测量两段文本之间的相关性。
我们的第二代嵌入模型，text-embedding-ada-002 是一种设计来取代之前的 16 个第一代嵌入模型的成本的一小部分。
嵌入对于搜索、聚类、推荐、异常检测和分类任务非常有用。
您可以在公告博客文章中阅读更多关于我们最新的嵌入模型。

## Codex `Limited beta`

Codex 模型是 GPT-3 模型的后代，可以理解和生成代码。
他们的训练数据既包含自然语言，也包含来自 GitHub 的数十亿行公共代码。学习更多的知识。

他们最擅长 Python，精通十多种语言，包括 JavaScript、Go、Perl、PHP、Ruby、Swift、TypeScript、SQL 甚至 Shell。

我们目前提供两种食典模式:

| LATEST MODEL     | DESCRIPTION                                                                            | MAX REQUEST        | TRAINING DATA  |
| ---------------- | -------------------------------------------------------------------------------------- | ------------------ | -------------- |
| code-davinci-002 | 最能干的法典模型。特别擅长将自然语言转换为代码。除了补全代码，还支持在代码中插入补全。 | 8,000 tokens       | Up to Jun 2021 |
| code-cushman-001 | 几乎和《达芬奇抄本》一样，但速度稍快。这种速度优势可能使它更适合于实时应用程序。       | Up to 2,048 tokens |

For more, visit our guide to working with Codex.

The Codex models are free to use during the limited beta, and are subject to reduced rate limits. As we learn about use, we'll look to offer pricing to enable a broad set of applications.

During this period, you're welcome to go live with your application as long as it follows our usage policies. We welcome any feedback on these models while in early use and look forward to engaging with the community.

Feature-specific models
The main Codex models are meant to be used with the text completion endpoint. We also offer models that are specifically meant to be used with our endpoints for creating embeddings and editing code.

## Moderation

审核模型用于检查内容是否符合 OpenAI 的使用策略。
这些模型提供了分类功能，可以在以下类别中查找内容:仇恨、仇恨/威胁、自残、性、性/未成年人、暴力和暴力/图形。
你可以在我们的适度指南中找到更多信息。

| MODEL                  | DESCRIPTION                                |
| ---------------------- | ------------------------------------------ |
| text-moderation-latest | 最有能力的调节模式。精度将略高于稳定模型   |
| text-moderation-stable | 性能几乎和最新型号一样，只是稍微老了一些。 |

## GPT-3

GPT-3 models can understand and generate natural language. These models were superceded by the more powerful GPT-3.5 generation models. However, the original GPT-3 base models (davinci, curie, ada, and babbage) are current the only models that are available to fine-tune.

| LATEST MODEL     | DESCRIPTION                                                                                   | MAX REQUEST  | TRAINING DATA  |
| ---------------- | --------------------------------------------------------------------------------------------- | ------------ | -------------- |
| text-curie-001   | Very capable, faster and lower cost than Davinci.                                             | 2,048 tokens | Up to Oct 2019 |
| text-babbage-001 | Capable of straightforward tasks, very fast, and lower cost.                                  | 2,048 tokens | Up to Oct 2019 |
| text-ada-001     | Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost. | 2,048 tokens | Up to Oct 2019 |
| davinci Most     | capable GPT-3 model. Can do any task the other models can do, often with higher quality.      | 2,048 tokens | Up to Oct 2019 |
| curie Very       | capable, but faster and lower cost than Davinci.                                              | 2,048 tokens | Up to Oct 2019 |
| babbage          | Capable of straightforward tasks, very fast, and lower cost.                                  | 2,048 tokens | Up to Oct 2019 |
| ada              | Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost. | 2,048 tokens | Up to Oct 2019 |
