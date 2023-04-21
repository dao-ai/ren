# 音频

学习如何将音频转换为文本。

相关指南: Speech to text

## 创建转录 `Beta`

`POST`: https://api.openai.com/v1/audio/transcriptions

Transcribes audio into the input language.

**请求体**:

file
string
Required
The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.

model
string
Required
ID of the model to use. Only whisper-1 is currently available.

**prompt**:

string
Optional
An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language.

response_format
string
Optional
Defaults to json
The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.

temperature
number
Optional
Defaults to 0
The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.

language
string
Optional
The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.

**示例**:

```sh
curl https://api.openai.com/v1/audio/transcriptions \
 -X POST \
 -H 'Authorization: Bearer TOKEN' \
 -H 'Content-Type: multipart/form-data' \
 -F file=@/path/to/file/audio.mp3 \
 -F model=whisper-1
```

**参数**:

```json
{
  "file": "audio.mp3",
  "model": "whisper-1"
}
```

**返回**:

```json
{
  "text": "Imagine the wildest idea that you've ever had, and you're curious about how it might scale to something that's a 100, a 1,000 times bigger. This is a place where you can get to do that."
}
```

## 创建翻译 `Beta`

`POST`: https://api.openai.com/v1/audio/translations

将音频翻译成英语。

**请求体**:

file
string
Required
The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.

model
string
Required
ID of the model to use. Only whisper-1 is currently available.

**prompt**:

string
Optional
An optional text to guide the model's style or continue a previous audio segment. The prompt should be in English.

response_format
string
Optional
Defaults to json
The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.

temperature
number
Optional
Defaults to 0
The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.

**示例**:

```bash
curl https://api.openai.com/v1/audio/translations \
 -X POST \
 -H 'Authorization: Bearer TOKEN' \
 -H 'Content-Type: multipart/form-data' \
 -F file=@/path/to/file/german.m4a \
 -F model=whisper-1
```

**参数**:

```json
{
  "file": "german.m4a",
  "model": "whisper-1"
}
```

**返回**:

```json
{
  "text": "Hello, my name is Wolfgang and I come from Germany. Where are you heading today?"
}
```
