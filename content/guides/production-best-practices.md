# 生产最佳实践

This guide provides a comprehensive set of best practices to help you transition from prototype to production. Whether you are a seasoned machine learning engineer or a recent enthusiast, this guide should provide you with the tools you need to successfully put the platform to work in a production setting: from securing access to our API to designing a robust architecture that can handle high traffic volumes. Use this guide to help develop a plan for deploying your application as smoothly and effectively as possible.

## Setting up your organization

Once you log in to your OpenAI account, you can find your organization name and ID in your organization settings. The organization name is the label for your organization, shown in user interfaces. The organization ID is the unique identifier for your organization which can be used in API requests.

Users who belong to multiple organizations can pass a header to specify which organization is used for an API request. Usage from these API requests will count against the specified organization's quota. If no header is provided, the default organization will be billed. You can change your default organization in your user settings.

You can invite new members to your organization from the members settings page. Members can be readers or owners. Readers can make API requests and view basic organization information, while owners can modify billing information and manage members within an organization.

## Managing billing limits

New free trial users receive an initial credit of $5 that expires after three months. Once the credit has been used or expires, you can choose to enter billing information to continue your use of the API. If no billing information is entered, you will still have login access but will be unable to make any further API requests.

Once you’ve entered your billing information, you will have an approved usage limit of $120 per month, which is set by OpenAI. To increase your quota beyond the $120 monthly billing limit, please submit a quota increase request.

If you’d like to be notified when your usage exceeds a certain amount, you can set a soft limit through the usage limits page. When the soft limit is reached, the owners of the organization will receive an email notification. You can also set a hard limit so that, once the hard limit is reached, any subsequent API requests will be rejected. Note that these limits are best effort, and there may be 5 to 10 minutes of delay between the usage and the limits being enforced.

## API keys

The OpenAI API uses API keys for authentication. Visit your API keys page to retrieve the API key you'll use in your requests.

This is a relatively straightforward way to control access, but you must be vigilant about securing these keys. Avoid exposing the API keys in your code or in public repositories; instead, store them in a secure location. You should expose your keys to your application using environment variables or secret management service, so that you don't need to hard-code them in your codebase. Read more in our Best practices for API key safety.

## Staging accounts

As you scale, you may want to create separate organizations for your staging and production environments. Please note that you can sign up using two separate email addresses like bob+prod@widgetcorp.com and bob+dev@widgetcorp.com to create two organizations. This will allow you to isolate your development and testing work so you don't accidentally disrupt your live application. You can also limit access to your production organization this way.

## Building your prototype

If you haven’t gone through the quickstart guide, we recommend you start there before diving into the rest of this guide.

For those new to the OpenAI API, our playground can be a great resource for exploring its capabilities. Doing so will help you learn what's possible and where you may want to focus your efforts. You can also explore our example prompts.

While the playground is a great place to prototype, it can also be used as an incubation area for larger projects. The playground also makes it easy to export code snippets for API requests and share prompts with collaborators, making it an integral part of your development process.

## Additional tips

Start by determining the core functionalities you want your application to have. Consider the types of data inputs, outputs, and processes you will need. Aim to keep the prototype as focused as possible, so that you can iterate quickly and efficiently.
Choose the programming language and framework that you feel most comfortable with and that best aligns with your goals for the project. Some popular options include Python, Java, and Node.js. See library support page to learn more about the library bindings maintained both by our team and by the broader developer community.
Development environment and support: Set up your development environment with the right tools and libraries and ensure you have the resources you need to train your model. Leverage our documentation, community forum and our help center to get help with troubleshooting. If you are developing using Python, take a look at this structuring your project guide (repository structure is a crucial part of your project’s architecture). In order to connect with our support engineers, simply log in to your account and use the "Help" button to start a conversation.
Techniques for improving reliability around prompts
Even with careful planning, it's important to be prepared for unexpected issues when using GPT-3 in your application. In some cases, the model may fail on a task, so it's helpful to consider what you can do to improve the reliability of your application.

If your task involves logical reasoning or complexity, you may need to take additional steps to build more reliable prompts. For some helpful suggestions, consult our Techniques to improve reliability guide. Overall the recommendations revolve around:

Decomposing unreliable operations into smaller, more reliable operations (e.g., selection-inference prompting)
Using multiple steps or multiple relationships to make the system's reliability greater than any individual component (e.g., maieutic prompting)
Evaluation and iteration
One of the most important aspects of developing a system for production is regular evaluation and iterative experimentation. This process allows you to measure performance, troubleshoot issues, and fine-tune your models to improve accuracy and efficiency. A key part of this process is creating an evaluation dataset for your functionality. Here are a few things to keep in mind:

Make sure your evaluation set is representative of the data your model will be used on in the real world. This will allow you to assess your model's performance on data it hasn't seen before and help you understand how well it generalizes to new situations.
Regularly update your evaluation set to ensure that it stays relevant as your model evolves and as new data becomes available.
Use a variety of metrics to evaluate your model's performance. Depending on your application and business outcomes, this could include accuracy, precision, recall, F1 score, or mean average precision (MAP). Additionally, you can sync your fine-tunes with Weights & Biases to track experiments, models, and datasets.
Compare your model's performance against baseline. This will give you a better understanding of your model's strengths and weaknesses and can help guide your future development efforts.
By conducting regular evaluation and iterative experimentation, you can ensure that your GPT-powered application or prototype continues to improve over time.

## Evaluating language models

Language models can be difficult to evaluate because evaluating the quality of generated language is often subjective, and there are many different ways to communicate the same message correctly in language. For example, when evaluating a model on the ability to summarize a long passage of text, there are many correct summaries. That being said, designing good evaluations is critical to making progress in machine learning.

An eval suite needs to be comprehensive, easy to run, and reasonably fast (depending on model size). It also needs to be easy to continue to add to the suite as what is comprehensive one month will likely be out of date in another month. We should prioritize having a diversity of tasks and tasks that identify weaknesses in the models or capabilities that are not improving with scaling.

The simplest way to evaluate your system is to manually inspect its outputs. Is it doing what you want? Are the outputs high quality? Are they consistent?

## Automated evaluations

The best way to test faster is to develop automated evaluations. However, this may not be possible in more subjective applications like summarization tasks.

Automated evaluations work best when it’s easy to grade a final output as correct or incorrect. For example, if you’re fine-tuning a classifier to classify text strings as class A or class B, it’s fairly simple: create a test set with example input and output pairs, run your system on the inputs, and then grade the system outputs versus the correct outputs (looking at metrics like accuracy, F1 score, cross-entropy, etc.).

If your outputs are semi open-ended, as they might be for a meeting notes summarizer, it can be trickier to define success: for example, what makes one summary better than another? Here, possible techniques include:

Writing a test with ‘gold standard’ answers and then measuring some sort of similarity score between each gold standard answer and the system output (we’ve seen embeddings work decently well for this)
Building a discriminator system to judge / rank outputs, and then giving that discriminator a set of outputs where one is generated by the system under test (this can even be GPT model that is asked whether the question is answered correctly by a given output)
Building an evaluation model that checks for the truth of components of the answer; e.g., detecting whether a quote actually appears in the piece of given text
For very open-ended tasks, such as a creative story writer, automated evaluation is more difficult. Although it might be possible to develop quality metrics that look at spelling errors, word diversity, and readability scores, these metrics don’t really capture the creative quality of a piece of writing. In cases where no good automated metric can be found, human evaluations remain the best method.

Example procedure for evaluating a GPT-3-based system
As an example, let’s consider the case of building a retrieval-based Q&A system.

A retrieval-based Q&A system has two steps. First, a user’s query is used to rank potentially relevant documents in a knowledge base. Second, GPT-3 is given the top-ranking documents and asked to generate an answer to the query.

Evaluations can be made to measure the performance of each step.

For the search step, one could:

First, generate a test set with ~100 questions and a set of correct documents for each
The questions can be sourced from user data if you have any; otherwise, you can invent a set of questions with diverse styles and difficulty.
For each question, have a person manually search through the knowledge base and record the set of documents that contain the answer.
Second, use the test set to grade the system’s performance
For each question, use the system to rank the candidate documents (e.g., by cosine similarity of the document embeddings with the query embedding).
You can score the results with a binary accuracy score of 1 if the candidate documents contain at least 1 relevant document from the answer key and 0 otherwise
You can also use a continuous metric like Mean Reciprocal Rank which can help distinguish between answers that were close to being right or far from being right (e.g., a score of 1 if the correct document is rank 1, a score of ½ if rank 2, a score of ⅓ if rank 3, etc.)
For the question answering step, one could:

First, generate a test set with ~100 sets of {question, relevant text, correct answer}
For the questions and relevant texts, use the above data
For the correct answers, have a person write down ~100 examples of what a great answer looks like.
Second, use the test set to grade the system’s performance

For each question & text pair, combine them into a prompt and submit the prompt to GPT-3
Next, compare GPT-3’s answers to the gold-standard answer written by a human
This comparison can be manual, where humans look at them side by side and grade whether the GPT-3 answer is correct/high quality
This comparison can also be automated, by using embedding similarity scores or another method (automated methods will likely be noisy, but noise is ok as long as it’s unbiased and equally noisy across different types of models that you’re testing against one another)
Of course, N=100 is just an example, and in early stages, you might start with a smaller set that’s easier to generate, and in later stages, you might invest in a larger set that’s more costly but more statistically reliable.

Scaling your solution architecture
When designing your application or service for production that uses our API, it's important to consider how you will scale to meet traffic demands. There are a few key areas you will need to consider regardless of the cloud service provider of your choice:

Horizontal scaling: You may want to scale your application out horizontally to accommodate requests to your application that come from multiple sources. This could involve deploying additional servers or containers to distribute the load. If you opt for this type of scaling, make sure that your architecture is designed to handle multiple nodes and that you have mechanisms in place to balance the load between them.
Vertical scaling: Another option is to scale your application up vertically, meaning you can beef up the resources available to a single node. This would involve upgrading your server's capabilities to handle the additional load. If you opt for this type of scaling, make sure your application is designed to take advantage of these additional resources.
Caching: By storing frequently accessed data, you can improve response times without needing to make repeated calls to our API. Your application will need to be designed to use cached data whenever possible and invalidate the cache when new information is added. There are a few different ways you could do this. For example, you could store data in a database, filesystem, or in-memory cache, depending on what makes the most sense for your application.
Load balancing: Finally, consider load-balancing techniques to ensure requests are distributed evenly across your available servers. This could involve using a load balancer in front of your servers or using DNS round-robin. Balancing the load will help improve performance and reduce bottlenecks.
Managing rate limits
When using our API, it's important to understand and plan for rate limits.

Improving latencies
Latency is the time it takes for a request to be processed and a response to be returned. In this section, we will discuss some factors that influence the latency of our text generation models and provide suggestions on how to reduce it.

The latency of a completion request is mostly influenced by two factors: the model and the number of tokens generated. The life cycle of a completion request looks like this:

Network
End user to API latency
Server
Time to process prompt tokens
Server
Time to sample/generate tokens
Network
API to end user latency

The bulk of the latency typically arises from the token generation step.

Intuition: Prompt tokens add very little latency to completion calls. Time to generate completion tokens is much longer, as tokens are generated one at a time. Longer generation lengths will accumulate latency due to generation required for each token.

Common factors affecting latency and possible mitigation techniques
Now that we have looked at the basics of latency, let’s take a look at various factors that can affect latency, broadly ordered from most impactful to least impactful.

Model
Our API offers different models with varying levels of complexity and generality. The most capable models, such as text-davinci-003, can generate more complex and diverse completions, but they also take longer to process your query. Models such as text-curie-001, can generate faster completions, but they may generate results that are less accurate or relevant for your query. You can choose the model that best suits your use case and the trade-off between speed and quality.

Number of completion tokens
Requesting a large amount of generated tokens completions can lead to increased latencies:

Lower max tokens: for requests with a similar token generation count, those that have a lower max_tokens parameter incur less latency.
Include stop sequences: to prevent generating unneeded tokens, add a stop sequence. For example, you can use stop sequences to generate a list with a specific number of items. In this case, by using 11. as a stop sequence, you can generate a list with only 10 items, since the completion will stop when 11. is reached. Read our help article on stop sequences for more context on how you can do this.
Generate fewer completions: lower the values of n and best_of when possible where n refers to how many completions to generate for each prompt and best_of is used to represent the result with the highest log probability per token.
If n and best_of both equal 1 (which is the default), the number of generated tokens will be at most, equal to max_tokens.

If n (the number of completions returned) or best_of (the number of completions generated for consideration) are set to > 1, each request will create multiple outputs. Here, you can consider the number of generated tokens as [ max_tokens * max (n, best_of) ]

Streaming
Setting stream: true in a request makes the model start returning tokens as soon as they are available, instead of waiting for the full sequence of tokens to be generated. It does not change the time to get all the tokens, but it reduces the time for first token for an application where we want to show partial progress or are going to stop generations. This can be a better user experience and a UX improvement so it’s worth experimenting with streaming.

Infrastructure
Our servers are currently located in the US. While we hope to have global redundancy in the future, in the meantime you could consider locating the relevant parts of your infrastructure in the US to minimize the roundtrip time between your servers and the OpenAI servers.

Batching
Depending on your use case, batching may help. If you are sending multiple requests to the same endpoint, you can batch the prompts to be sent in the same request. This will reduce the number of requests you need to make. The prompt parameter can hold up to 20 unique prompts. We advise you to test out this method and see if it helps. In some cases, you may end up increasing the number of generated tokens which will slow the response time.

Managing costs
To monitor your costs, you can set a soft limit in your account to receive an email alert once you pass a certain usage threshold. You can also set a hard limit. Please be mindful of the potential for a hard limit to cause disruptions to your application/users. Use the usage tracking dashboard to monitor your token usage during the current and past billing cycles.

Text generation
One of the challenges of moving your prototype into production is budgeting for the costs associated with running your application. OpenAI offers a pay-as-you-go pricing model, with prices per 1,000 tokens (roughly equal to 750 words). To estimate your costs, you will need to project the token utilization. Consider factors such as traffic levels, the frequency with which users will interact with your application, and the amount of data you will be processing.

One useful framework for thinking about reducing costs is to consider costs as a function of the number of tokens and the cost per token. There are two potential avenues for reducing costs using this framework. First, you could work to reduce the cost per token by switching to smaller models for some tasks in order to reduce costs. Alternatively, you could try to reduce the number of tokens required. There are a few ways you could do this, such as by using shorter prompts, fine-tuning models, or caching common user queries so that they don't need to be processed repeatedly.

You can experiment with our interactive tokenizer tool to help you estimate costs. The API and playground also returns token counts as part of the response. Once you’ve got things working with our most capable model, you can see if the other models can produce the same results with lower latency and costs. Learn more in our token usage help article.

MLOps strategy
As you move your prototype into production, you may want to consider developing an MLOps strategy. MLOps (machine learning operations) refers to the process of managing the end-to-end life cycle of your machine learning models, including any models you may be fine-tuning using our API. There are a number of areas to consider when designing your MLOps strategy. These include

Data and model management: managing the data used to train or fine-tune your model and tracking versions and changes.
Model monitoring: tracking your model's performance over time and detecting any potential issues or degradation.
Model retraining: ensuring your model stays up to date with changes in data or evolving requirements and retraining or fine-tuning it as needed.
Model deployment: automating the process of deploying your model and related artifacts into production.
Thinking through these aspects of your application will help ensure your model stays relevant and performs well over time.

Security and compliance
As you move your prototype into production, you will need to assess and address any security and compliance requirements that may apply to your application. This will involve examining the data you are handling, understanding how our API processes data, and determining what regulations you must adhere to. For reference, here is our Privacy Policy and Terms of Use.

Some common areas you'll need to consider include data storage, data transmission, and data retention. You might also need to implement data privacy protections, such as encryption or anonymization where possible. In addition, you should follow best practices for secure coding, such as input sanitization and proper error handling.

Safety best practices
When creating your application with our API, consider our safety best practices to ensure your application is safe and successful. These recommendations highlight the importance of testing the product extensively, being proactive about addressing potential issues, and limiting opportunities for misuse.
