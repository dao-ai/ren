import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const animal = req.body.animal || "";
  if (animal.trim().length === 0) {
    res.status(400).json({ error: { message: "Please enter a valid animal" } });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log(error);
      console.error(`OpenAI API请求错误: ${error.message}`);
      res.status(500).json({ error: { message: "请求期间发生错误。" } });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `给超级英雄的动物起三个名字。

Animal: 猫
Names: 尖爪船长, 绒毛球特工, 神奇猫
Animal: 狗
Names: 护国公拉夫, 神奇犬, 大吼爵士
Animal: ${capitalizedAnimal}
Names:`;
}
