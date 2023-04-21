# 快速入门

OpenAI 训练了一些尖端的语言模型，它们非常擅长理解和生成文本。我们的 API 提供了对这些模型的访问，并可以用于解决几乎涉及处理语言的任何任务。

在这个快速入门教程中，您将构建一个简单的示例应用程序。在此过程中，您将学习到对于任何任务使用 API 的基本概念和技术，包括：

- 内容生成
- 摘要
- 分类、分类和情感分析
- 数据提取
- 翻译
- 还有更多！

## 介绍

[补全]端点是我们 API 的核心，提供了一个非常灵活和强大的简单接口。
您将一些文本作为提示输入，API 将返回一个文本补全，试图匹配您给出的任何指令或上下文。

`Prompt-提示` 为冰激凌店写一个标语。  
`Completion-补全` 我们每杯都提供微笑！

您可以将其视为非常高级的自动补全 - 模型处理您的文本提示，并尝试预测最有可能出现的内容。

## 1. 从一条指令开始

想象一下您想创建一个宠物名字生成器。从零开始想出名字很难！

首先，您需要一个明确您想要的提示。让我们从一条指令开始。
**将此提示提交**以生成您的第一个补全。

```
为马提供一个名字。
```

不错！现在，试着让您的指令更具体。

为一匹黑马建议一个名字。
正如您所见，向我们的提示添加一个简单的形容词会改变结果的补全。设计提示本质上就是如何“编程”模型。

## 2. 添加一些示例

设计良好的指令对于获得良好的结果非常重要，但有时它们还不够。让我们尝试使您的指令更加复杂。

```
为一位超级英雄的马建议三个名字。
```

这个补全并不是我们想要的。这些名称非常通用，并且似乎模型没有注意到我们指令中的马。让我们看看是否可以让它提出更相关的建议。

在许多情况下，向模型展示和告诉您想要的是有帮助的。将示例添加到您的提示中可以帮助传达模式或细微差别。尝试提交包含一些示例的此提示。

```
为一个超级英雄的动物建议三个名字。

动物：猫
名称：Sharpclaw 队长，Fluffball 特工，Incredible Feline
动物：狗
名称：Ruff the Protector，Wonder Canine，Sir Barks-a-Lot
动物：马
名称：
```

不错！为给定的输入添加输出示例可以帮助模型提供我们所寻找的名称类型。

## 3. 调整您的设置

提示设计并不是您拥有的唯一工具。您还可以通过调整设置来控制补全。其中最重要的设置之一称为**温度**。

您可能已经注意到，如果在上面的示例中多次提交相同的提示，模型将始终返回相同或非常相似的补全。这是因为您的温度设置为 **0**。

尝试使用温度设置为 **1** 重新提交相同的提示几次。

```txt
为一个超级英雄的动物提出三个名字。

动物：猫
名称：Sharpclaw 队长、Fluffball 特工、Incredible Feline
动物：狗
名称：保护者拉夫、Wonder Canine、Sir Barks-a-Lot
动物：马
名称：

温度 0-1
```

看看发生了什么？当温度高于 0 时，多次提交相同的提示会导致不同的补全结果。

请记住，模型预测在其之前的文本之后最可能出现的文本。
温度是一个介于 **0** 和 **1** 之间的值，基本上让您控制模型在进行这些预测时应该有多自信。
降低温度意味着它将冒更少的风险，补全将更准确和确定性。增加温度将导致更多的多样化补全。

??? tip "深入挖掘->理解标记和概率"

    我们的模型通过将文本拆分成称为标记的较小单位来处理文本。
    标记可以是单词、单词块或单个字符。编辑下面的文本以查看如何将其标记化。

    ```
    I have an orange cat named Butterscotch.
    ```

    ```
    I have an orange cat named Butterscotch.
    ```

    像“cat”这样的常用词是一个标记，而不常用的词通常会被拆分成多个标记。
    例如，“Butterscotch”可以翻译成四个标记：“But”、“ters”、“cot”和“ch”。
    许多标记以空格开头，例如“ hello”和“ bye”。

    对于一些文本，模型确定下一个最可能出现的标记是哪个。
    例如，文本“Horses are my favorite”最有可能后跟标记“animal”。

    ```
    Horses are my favorite

    animal 49.65%
    animals 42.58%
    \n 3.49%
    ! 0.91%
    ```

    如果将温度设置为 0 并提交此提示 4 次，模型将始终返回“animal”作为下一个标记，因为它具有最高的概率。
    如果增加温度，它将更冒险，考虑概率较低的标记。

    如果温度为 0

    ```
    Horses are my favorite animal
    Horses are my favorite animal
    Horses are my favorite animal
    Horses are my favorite animal
    ```

    如果温度为 1

    ```
    Horses are my favorite animal
    Horses are my favorite animals
    Horses are my favorite !
    Horses are my favorite animal
    ```

    通常最好为已定义期望输出的任务设置较低的温度。
    对于需要多样性或创造力的任务，较高的温度可能会有用，或者如果您想生成一些变体供最终用户或人类专家选择。

对于您的宠物名称生成器，您可能希望能够生成许多名称想法。适度的温度 **0.6** 应该很好用。

## 4. 构建应用程序

NODE.JS PYTHON (FLASK)

现在，您已经找到了一个好的提示和设置，准备构建您的宠物名字生成器！我们编写了一些代码来帮助您入门——请按照下面的说明下载代码并运行应用程序。

### 设置

如果您还没有安装 Node.js，请从[此处安装](https://nodejs.org/en/)。然后通过克隆该[存储库](https://github.com/openai/openai-quickstart-node)下载代码。

```sh
git clone https://github.com/openai/openai-quickstart-node.git
```

如果您不想使用 git，您还可以使用此[zip 文件](https://github.com/openai/openai-quickstart-node/archive/refs/heads/master.zip)下载代码。

### 添加 API 密钥

进入项目目录并复制示例环境变量文件。

```sh
cd openai-quickstart-node
cp .env.example .env
```

将您的秘密 API 密钥复制并设置为您新创建的.env 文件中的 `OPENAI_API_KEY`。
如果您尚未创建秘密密钥，可以在下面进行创建。

秘密密钥 创建日期 最近使用日期

```txt
sk-...MdZi 2023 年 2 月 9 日 2023 年 2 月 28 日
sk-...p9m5 2023 年 2 月 27 日 2023 年 2 月 28 日
sk-...PwEC 2023 年 3 月 3 日 2023 年 3 月 5 日

+ Create new secret key
```

!!! danger "重要提示"

    当使用 Javascript 时，所有 API 调用应仅在服务器端进行，因为在客户端浏览器代码中进行调用将暴露您的 API 密钥。有关更多详细信息，请参见此处。

### 运行应用程序

在项目目录中运行以下命令以安装依赖项并运行应用程序。

```sh
npm install
npm run dev
```

在浏览器中打开 http://localhost:3000，您应该会看到宠物名字生成器！

### 了解代码

在 `openai-quickstart-node/pages/api` 文件夹中打开 `generate.js`。
在底部，您将看到生成我们上面使用的提示的函数。由于用户将输入其宠物的动物类型，因此它会动态替换指定动物的部分。

```js
function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
```

在 `generate.js` 的第 `9` 行，您将看到发送实际 API 请求的代码。如上所述，它使用温度为 `0.6` 的[补全]端点。

```js
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: generatePrompt(req.body.animal),
  temperature: 0.6,
});
```

到此为止！您现在应该已经完全了解了如何使用 OpenAI API 构建（超级英雄）宠物名字生成器！

## 结语

这些概念和技术将有助于您构建自己的应用程序。不过，这个简单的例子只是展示了可能性的一小部分！补全端点足够灵活，可以解决几乎任何语言处理任务，包括内容生成、摘要、语义搜索、主题标记、情感分析等等。

需要记住的一个限制是，对于大多数模型而言，单个 API 请求只能处理在提示和补全之间最多 2,048 个标记（大约 1,500 个单词）。

??? tips "深度挖掘->模型和定价"

    我们提供具有不同功能和[价格](https://openai.com/api/pricing/)的一系列[模型](https://platform.openai.com/docs/models)。
    在本教程中，我们使用了text-davinci-003，我们最强大的自然语言模型。
    我们建议在实验时使用此模型，因为它将产生最好的结果。
    一旦您的工作正常运行，您可以查看其他模型是否可以以更低的延迟和成本产生相同的结果。

    单个请求（提示和完成）处理的标记总数不能超过模型的最大上下文长度。
    对于大多数模型，这是2,048个标记或大约1,500个单词。
    粗略的经验法则是，对于英文文本，1个标记大约相当于4个字符或0.75个单词。

    按照每1,000个标记的使用量付费，前3个月可获得5美元的免费信用额。[了解更多](https://openai.com/api/pricing/)。

对于更高级的任务，您可能希望能够提供比单个提示中可以容纳的更多的示例或上下文。
[微调 API](https://platform.openai.com/docs/guides/fine-tuning) 是更高级任务的一个很好的选择。
**微调**允许您提供数百甚至数千个示例来为特定用例定制模型。

## 下一步

为了获得灵感并了解有关为不同任务设计提示的更多信息：

- 阅读我们的[补全]指南。
- 探索我们的[示例提示库](https://platform.openai.com/examples)。
- 在 [Playground](https://platform.openai.com/playground) 中开始实验。
- 在开始构建之前请牢记我们的[使用政策](https://platform.openai.com/docs/usage-policies)。

[补全]: https://platform.openai.com/docs/api-reference/completions
