# 文件

文件用于上传可与微调等功能一起使用的文档。

## 列表文件

`GET`: https://api.openai.com/v1/files

返回属于用户组织的文件列表。

**Example**:

```js title="request node.js"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listFiles();
```

\***\*返回**:\*\*

```json
{
  "data": [
    {
      "id": "file-ccdDZrC3iZVNiQVeEA6Z66wf",
      "object": "file",
      "bytes": 175,
      "created_at": 1613677385,
      "filename": "train.jsonl",
      "purpose": "search"
    },
    {
      "id": "file-XjGxS3KTG0uNmNOK362iJua3",
      "object": "file",
      "bytes": 140,
      "created_at": 1613779121,
      "filename": "puppy.jsonl",
      "purpose": "search"
    }
  ],
  "object": "list"
}
```

## 上传文件

POST https://api.openai.com/v1/files

Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.

**请求体**:

file
string
Required
Name of the JSON Lines file to be uploaded.

If the purpose is set to "fine-tune", each line is a JSON record with "prompt" and "completion" fields representing your training examples.

purpose
string
Required
The intended purpose of the uploaded documents.

Use "fine-tune" for Fine-tuning. This allows us to validate the format of the uploaded file.

**示例**: node.js

node.js

```js
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createFile(fs.createReadStream("mydata.jsonl"), "fine-tune");
```

**返回**:

```json
{
  "id": "file-XjGxS3KTG0uNmNOK362iJua3",
  "object": "file",
  "bytes": 140,
  "created_at": 1613779121,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune"
}
```

## Delete file

DELETE https://api.openai.com/v1/files/{file_id}

Delete a file.

**路径参数**:

file_id
string
Required
The ID of the file to use for this request

**示例**: node.js

node.js

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.deleteFile("file-XjGxS3KTG0uNmNOK362iJua3");
```

**返回**:

```json
{
  "id": "file-XjGxS3KTG0uNmNOK362iJua3",
  "object": "file",
  "deleted": true
}
```

## 检索文件

`GET`: https://api.openai.com/v1/files/{file_id}

Returns information about a specific file.

**路径参数**:

file_id
string
Required
The ID of the file to use for this request

**示例**:
node.js

node.js

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.retrieveFile("file-XjGxS3KTG0uNmNOK362iJua3");
```

**返回**:

```json
{
  "id": "file-XjGxS3KTG0uNmNOK362iJua3",
  "object": "file",
  "bytes": 140,
  "created_at": 1613779657,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune"
}
```

## 检索文件内容

`GET`: https://api.openai.com/v1/files/{file_id}/content

Returns the contents of the specified file

**路径参数**:

file_id
string
Required
The ID of the file to use for this request

**示例**:
node.js

```js
node.js;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.downloadFile("file-XjGxS3KTG0uNmNOK362iJua3");
```
