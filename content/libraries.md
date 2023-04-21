# 库

## Python库

我们提供了一个Python库，您可以按如下方式安装:

```py
$ pip install openai
```

安装完成后，您可以使用绑定和密钥来运行以下命令:

```py
import os
import openai
# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(model="text-davinci-003", prompt="Say this is a test", temperature=0, max_tokens=7)
```

绑定还将安装一个命令行实用程序，您可以使用如下:

```py
$ openai api completions.create -m text-davinci-003 -p "Say this is a test" -t 0 -M 7 --stream
```

## Node.js库

我们还有一个Node.js库，你可以在你的Node.js项目目录下运行以下命令来安装它:

```sh
npm install openai
```

安装后，您可以使用库和密钥来运行以下命令:

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  temperature: 0,
  max_tokens: 7,
});
```

## 社区库

下面的库由更广泛的开发人员社区构建和维护。如果您想在这里添加一个新库，请按照我们帮助中心文章中关于添加社区库的说明进行操作。

请注意，OpenAI不会验证这些项目的正确性或安全性。

- C# / .NET

      - Betalgo.OpenAI.GPT3 by Betalgo

- Crystal

      - openai-crystal by sferik

- Go
  
    - go-gpt3 by sashabaranov
  
- Java
  
    - openai-java by Theo Kanning

- Kotlin
  
    - openai-kotlin by Mouaad Aallam

- Node.js

    - openai-api by Njerschow
    - openai-api-node by erlapso
    - gpt-x by ceifa
    - gpt3 by poteat
    - gpts by thencc
    - @dalenguyen/openai by dalenguyen
    - tectalic/openai by tectalic

- PHP

    - orhanerday/open-ai by orhanerday
    - tectalic/openai by tectalic

- Python

    - chronology by OthersideAI

- R

    - rgpt3 by ben-aaron188

- Ruby

    - openai by nileshtrivedi
    - ruby-openai by alexrudall

- Scala

    - openai-scala-client by cequence-io

- Swift

    - OpenAIKit by dylanshine

- Unity

    - OpenAi-Api-Unity by hexthedev

- Unreal Engine

    - OpenAI-Api-Unreal by KellanM
