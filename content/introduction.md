# 介绍

## 概述

OpenAI API 可以应用于几乎任何涉及自然语言或代码理解或生成的任务。
我们提供了一系列不同功率级别的模型，适用于不同的任务，以及微调自己的自定义模型的能力。
这些模型可用于从内容生成到语义搜索和分类的所有内容。

## 关键概念

我们建议完成我们的快速入门教程，通过实际操作和互动示例了解关键概念。

[快速入门教程](https://platform.openai.com/docs/quickstart)
通过构建快速示例应用程序进行学习。

## 提示和补全

[补全](https://platform.openai.com/docs/api-reference/completions)端点是我们 API 的核心。
它提供了一个非常灵活和强大的模型接口。
您将一些文本作为提示输入，模型将生成一个文本完成，试图匹配您给它的任何上下文或模式。
例如，如果您给 API 提供提示“为一个冰淇淋店写一个口号”，它将返回一个完成，如“我们为每一勺冰激凌提供笑容！”

[设计您的提示](https://platform.openai.com/docs/guides/completion/prompt-design)本质上就是如何“编程”模型，通常通过提供一些说明或几个示例来完成。
这与大多数其他 NLP 服务不同，它们仅设计用于单个任务，如情感分类或命名实体识别。
相反，完成端点可用于几乎任何任务，包括内容或代码生成、摘要、扩展、会话、创意写作、样式转换等。

## Tokens

我们的模型通过将文本分解为标记来理解和处理文本。
标记可以是单词或只是字符块。
例如，“汉堡包”这个词被分解成“ham”，“bur”和“ger”这些标记，而一个短而常见的单词“pear”是一个单独的标记。
许多标记以空格开始，例如“hello”和“bye”。

在给定 API 请求中处理的标记数量取决于您的输入和输出长度。
粗略的经验法则是，1 个标记大约相当于 4 个字符或 0.75 个单词（对于英文文本）。
要记住的一个限制是，您的文本提示和生成的完成组合必须不超过模型的最大上下文长度（对于大多数模型，这是 2048 个标记，约为 1500 个单词）。
查看我们的[标记化工具](https://platform.openai.com/tokenizer)，了解有关文本如何转换为标记的更多信息。

## 模型

以下代码是 API 所依赖的一组具有不同能力和价格点的模型。我们的基础 GPT-3 模型包括 Davinci、Curie、Babbage 和 Ada。我们的 Codex 系列是 GPT-3 的后代，它经过了自然语言和代码的训练。了解更多信息，请访问我们的[模型文档](https://platform.openai.com/docs/models)。

## 下一个

- 在开始构建应用程序时，请牢记我们的[使用政策](https://platform.openai.com/docs/usage-policies)。
- 浏览我们的[示例库](https://platform.openai.com/examples)，获取灵感。
- 阅读我们的指南之一开始构建。

## 指南

- [**文本补全**](https://platform.openai.com/docs/guides/completion)：学习如何使用我们的模型生成或编辑文本。
- [**代码补全** _（有限测试版）_](https://platform.openai.com/docs/guides/code)：学习如何生成、编辑或解释代码。
- [**图像生成** _（测试版）_](https://platform.openai.com/docs/guides/images)：学习如何生成或编辑图像。
- [**微调**](https://platform.openai.com/docs/guides/fine-tuning)：学习如何针对您的用例训练模型。
- [**嵌入**](https://platform.openai.com/docs/guides/embeddings)：学习如何搜索、分类和比较文本。
