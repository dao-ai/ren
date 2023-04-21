---
title: 代码补全
---

# 代码补全 `Limited beta`

学习如何生成或操作代码

## Introduction

The Codex model series is a descendant of our GPT-3 series that's been trained on both natural language and billions of lines of code. It's most capable in Python and proficient in over a dozen languages including JavaScript, Go, Perl, PHP, Ruby, Swift, TypeScript, SQL, and even Shell. During this initial limited beta period, Codex usage is free. Learn more.

You can use Codex for a variety of tasks including:

- Turn comments into code
- Complete your next line or function in context
- Bring knowledge to you, such as finding a useful library or API call for an application
- Add comments
- Rewrite code for efficiency

To see Codex in action, check out our Codex JavaScript Sandbox or our other demo videos.

![](https://platform.openai.com/sandbox-screenshot.png)

**Codex JavaScript Sandbox**

This sample application uses Codex to translate natural language instructions into JavaScript.

## Quickstart

To start using Codex yourself, try opening these examples in the Playground.

Saying "Hello" (Python)

```
"""
Ask the user for their name and say "Hello"
"""
```

Open in Playground
Create random names (Python)

```
"""
1. Create a list of first names
2. Create a list of last names
3. Combine them randomly into a list of 100 full names
"""
```

Open in Playground
Create a MySQL query (Python)

```
"""
Table customers, columns = [CustomerId, FirstName, LastName, Company, Address, City, State, Country, PostalCode, Phone, Fax, Email, SupportRepId]
Create a MySQL query for all customers in Texas named Jane
"""
query =
```

Open in Playground

## Explaining code (JavaScript)

```js
// Function 1
var fullNames = [];
for (var i = 0; i < 50; i++) {
  fullNames.push(
    names[Math.floor(Math.random() * names.length)] +
      " " +
      lastNames[Math.floor(Math.random() * lastNames.length)]
  );
}

// What does Function 1 do?
```

Open in Playground

### More examples

Visit our examples library to explore more prompts designed for Codex.

## Best practices

Start with a comment, data or code. You can experiment using one of the Codex models in our playground (styling instructions as comments when needed.)

To get Codex to create a useful completion it's helpful to think about what information a programmer would need to perform a task. This could simply be a clear comment or the data needed to write a useful function, like the names of variables or what class a function handles.

```
# Create a function called 'nameImporter' to add a first and last name to the database
```

Open in Playground
In this example we tell Codex what to call the function and what task it's going to perform.

This approach scales even to the point where you can provide Codex with a comment and an example of a database schema to get it to write useful query requests for various databases.

```
# Table albums, columns = [AlbumId, Title, ArtistId]

# Table artists, columns = [ArtistId, Name]

# Table media_types, columns = [MediaTypeId, Name]

# Table playlists, columns = [PlaylistId, Name]

# Table playlist_track, columns = [PlaylistId, TrackId]

# Table tracks, columns = [TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice]

# Create a query for all albums by Adele
```

Open in Playground

When you show Codex the database schema it's able to make an informed guess about how to format a query.

Specify the language. Codex understands dozens of different programming languages. Many share similar conventions for comments, functions and other programming syntax. By specifying the language and what version in a comment, Codex is better able to provide a completion for what you want. That said, Codex is fairly flexible with style and syntax.

```
# R language

# Calculate the mean distance between an array of points
```

Open in Playground

```
# Python 3

# Calculate the mean distance between an array of points
```

Open in Playground
Prompt Codex with what you want it to do. If you want Codex to create a webpage, placing the first line of code in an HTML document (<!DOCTYPE html>) after your comment tells Codex what it should do next. The same method works for creating a function from a comment (following the comment with a new line starting with func or def).

```html
<!-- Create a web page with the title 'Kat Katman attorney at paw' -->
<!DOCTYPE html>
```

Open in Playground
Placing <!DOCTYPE html> after our comment makes it very clear to Codex what we want it to do.

```
# Create a function to count to 100

def counter
```

Open in Playground
If we start writing the function Codex will understand what it needs to do next.

Specifying libraries will help Codex understand what you want. Codex is aware of a large number of libraries, APIs and modules. By telling Codex which ones to use, either from a comment or importing them into your code, Codex will make suggestions based upon them instead of alternatives.

```
<!-- Use A-Frame version 1.2.0 to create a 3D website -->
<!-- https://aframe.io/releases/1.2.0/aframe.min.js -->
```

Open in Playground
By specifying the version you can make sure Codex uses the most current library.

Note: Codex can suggest helpful libraries and APIs, but always be sure to do your own research to make sure that they're safe for your application.

Comment style can affect code quality. With some languages the style of comments can improve the quality of the output. For example, when working with Python, in some cases using doc strings (comments wrapped in triple quotes) can give higher quality results than using the pound (#) symbol.

```
"""
Create an array of users and email addresses
"""
```

Open in Playground
Put comments inside of functions can be helpful. Recommended coding standards usually suggest placing the description of a function inside the function. Using this format helps Codex more clearly understand what you want the function to do.

```
def getUserBalance(id):
   """
   Look up the user in the database ‘UserData' and return their current account balance.
   """
```

Open in Playground
Provide examples for more precise results. If you have a particular style or format you need Codex to use, providing examples or demonstrating it in the first part of the request will help Codex more accurately match what you need.

```
"""
Create a list of random animals and species
"""
animals = [ {"name": "Chomper", "species": "Hamster"}, {"name":
```

Open in Playground
Lower temperatures give more precise results. Setting the API temperature to 0, or close to zero (such as 0.1 or 0.2) tends to give better results in most cases. Unlike GPT-3, where a higher temperature can provide useful creative and random results, higher temperatures with Codex may give you really random or erratic responses.

In cases where you need Codex to provide different potential results, start at zero and then increment upwards by .1 until you find suitable variation.

Organize tasks into functions. We can get Codex to write functions by specifying what the function should do in as precise terms as possible in comment. By writing the following comment, Codex creates a Javascript timer function that's triggered when a user presses a button:

A simple JavaScript timer

```
// Create a timer that creates an alert in 10 seconds
```

Open in Playground
We can use Codex to perform common tasks with well known libraries like creating a customer with the Stripe API:

Create a Stripe customer in Python

```
# Create a Stripe customer from an email address
```

Open in Playground
Creating example data. Testing applications often requires using example data. Because Codgen is a language model that understands how to comprehend and write natural language, you can ask Codex to create data like arrays of made up names, products and other variables.

```
/_ Create an array of weather temperatures for San Francisco _/
```

Open in Playground
Asking Codex to perform this task will produce a table like this:

```js
var weather = [
  { month: "January", high: 58, low: 48 },
  { month: "February", high: 61, low: 50 },
  { month: "March", high: 64, low: 53 },
  { month: "April", high: 67, low: 55 },
  { month: "May", high: 70, low: 58 },
  { month: "June", high: 73, low: 61 },
  { month: "July", high: 76, low: 63 },
  { month: "August", high: 77, low: 64 },
  { month: "September", high: 76, low: 63 },
  { month: "October", high: 73, low: 61 },
  { month: "November", high: 68, low: 57 },
  { month: "December", high: 64, low: 54 },
];
```

Open in Playground
Compound functions and small applications. We can provide Codex with a comment consisting of a complex request like creating a random name generator or performing tasks with user input and Codex can generate the rest provided there are enough tokens.

```
/_
Create a list of animals
Create a list of cities
Use the lists to generate stories about what I saw at the zoo in each city
_/
```

Open in Playground
Limit completion size for more precise results or lower latency. Requesting longer completions in Codex can lead to imprecise answers and repetition. Limit the size of the query by reducing max_tokens and setting stop tokens. For instance, add \n as a stop sequence to limit completions to one line of code. Smaller completions also incur less latency.

Use streaming to reduce latency. Large Codex queries can take tens of seconds to complete. To build applications that require lower latency, such as coding assistants that perform autocompletion, consider using streaming. Responses will be returned before the model finishes generating the entire completion. Applications that need only part of a completion can reduce latency by cutting off a completion either programmatically or by using creative values for stop.

Users can combine streaming with duplication to reduce latency by requesting more than one solution from the API, and using the first response returned. Do this by setting n > 1. This approach consumes more token quota, so use carefully (e.g., by using reasonable settings for max_tokens and stop).

Use Codex to explain code. Codex's ability to create and understand code allows us to use it to perform tasks like explaining what the code in a file does. One way to accomplish this is by putting a comment after a function that starts with "This function" or "This application is." Codex will usually interpret this as the start of an explanation and complete the rest of the text.

```
/\* Explain what the previous function is doing: It
```

Open in Playground
Explaining an SQL query. In this example we use Codex to explain in a human readable format what an SQL query is doing.

```sql
SELECT DISTINCT department.name
FROM department
JOIN employee ON department.id = employee.department_id
JOIN salary_payments ON employee.id = salary_payments.employee_id
WHERE salary_payments.date BETWEEN '2020-06-01' AND '2020-06-30'
GROUP BY department.name
HAVING COUNT(employee.id) > 10;
-- Explanation of the above query in human readable format
--
```

Open in Playground
Writing unit tests. Creating a unit test can be accomplished in Python simply by adding the comment "Unit test" and starting a function.

```py
# Python 3

def sum_numbers(a, b):
return a + b

# Unit test

def
```

Open in Playground
Checking code for errors. By using examples, you can show Codex how to identify errors in code. In some cases no examples are required, however demonstrating the level and detail to provide a description can help Codex understand what to look for and how to explain it. (A check by Codex for errors should not replace careful review by the user. )

```
/_ Explain why the previous function doesn't work. _/
```

Open in Playground
Using source data to write database functions. Just as a human programmer would benefit from understanding the database structure and the column names, Codex can use this data to help you write accurate query requests. In this example we insert the schema for a database and tell Codex what to query the database for.

```
# Table albums, columns = [AlbumId, Title, ArtistId]

# Table artists, columns = [ArtistId, Name]

# Table media_types, columns = [MediaTypeId, Name]

# Table playlists, columns = [PlaylistId, Name]

# Table playlist_track, columns = [PlaylistId, TrackId]

# Table tracks, columns = [TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice]

# Create a query for all albums by Adele
```

Open in Playground
Converting between languages. You can get Codex to convert from one language to another by following a simple format where you list the language of the code you want to convert in a comment, followed by the code and then a comment with the language you want it translated into.

```
# Convert this from Python to R

# Python version

[ Python code ]

# End

# R version
```

Open in Playground
Rewriting code for a library or framework. If you want Codex to make a function more efficient, you can provide it with the code to rewrite followed by an instruction on what format to use.

```r
// Rewrite this as a React component
var input = document.createElement('input');
input.setAttribute('type', 'text');
document.body.appendChild(input);
var button = document.createElement('button');
button.innerHTML = 'Say Hello';
document.body.appendChild(button);
button.onclick = function() {
var name = input.value;
var hello = document.createElement('div');
hello.innerHTML = 'Hello ' + name;
document.body.appendChild(hello);
};

// React version:
```

Open in Playground
Inserting code Beta
The completions endpoint also supports inserting code within code by providing a suffix prompt in addition to the prefix prompt. This can be used to insert a completion in the middle of a function or file.

```r
def get_largest_prime_factor(n):
if n < 2:
return False
def is_prime(n): > for i in range(2, n): > if n % i == 0: > return False > return True > largest = 1
for j in range(2, n + 1):
if n % j == 0 and is_prime(j):
return largest
```

By providing the model with additional context, it can be much more steerable. However, this is a more constrained and challenging task for the model.

## Best practices

Inserting code is a new feature in beta and you may have to modify the way you use the API for better results. Here are a few best practices:

Use max_tokens > 256. The model is better at inserting longer completions. With too small max_tokens, the model may be cut off before it's able to connect to the suffix. Note that you will only be charged for the number of tokens produced even when using larger max_tokens.

Prefer finish_reason == "stop". When the model reaches a natural stopping point or a user provided stop sequence, it will set finish_reason as "stop". This indicates that the model has managed to connect to the suffix well and is a good signal for the quality of a completion. This is especially relevant for choosing between a few completions when using n > 1 or resampling (see the next point).

Resample 3-5 times. While almost all completions connect to the prefix, the model may struggle to connect the suffix in harder cases. We find that resampling 3 or 5 times (or using best_of with k=3,5) and picking the samples with "stop" as their finish_reason can be an effective way in such cases. While resampling, you would typically want a higher temperatures to increase diversity.

Note: if all the returned samples have finish_reason == "length", it's likely that max_tokens is too small and model runs out of tokens before it manages to connect the prompt and the suffix naturally. Consider increasing max_tokens before resampling.

## Editing code Beta

The edits endpoint can be used to edit code, rather than just completing it. You provide some code and an instruction for how to modify it, and the code-davinci-edit-001 model will attempt to edit it accordingly. This is a natural interface for refactoring and tweaking code. During this initial beta period, usage of the edits endpoint is free.

### Examples

#### Iteratively build a program

Writing code is often an iterative process that requires refining the text along the way. Editing makes it natural to continuously refine the output of the model until the final result is polished. In this example, we use fibonacci as an example of how to iteratively build upon code.

1Write a function
INPUT
No input
INSTRUCTIONS
Write a function in python that calculates fibonacci
OUTPUT

```r
def fibonacci(num):
a = 0
b = 1
if num ==1:
print(a)
else:
print(a)
print(b)
#the sequence starts with 0,1
for i in range(2,num):
c = a+b
a = b
b = c
print(c)

fibonacci(10)
```

2Refactor it
INPUT

```py
if num ==1:
print(a)
else:
print(a)
print(b)
#the sequence starts with 0,1
for i in range(2,num):
c = a+b
a = b
b = c
print(c)

fibonacci(10)
```

INSTRUCTIONS
Refactor this function to be recursive
OUTPUT

```py
def fibonacci(num):
if num <= 1:
return num
else:
return fib(num-1) + fib(num-2)
print(fibonacci(10))
```

3Rename the function

INPUT

```py
def fibonacci(num):
if num <= 1:
return num
else:
return fib(num-1) + fib(num-2)
print(fibonacci(10))
```

INSTRUCTIONS
Rename the function to fib
OUTPUT

```r
def fib(num):
if num <= 1:
return num
else:
return fib(num-1) + fib(num-2)
print(fib(10))
```

4Add documentation
INPUT

```python
def fib(num):
if num <= 1:
return num
else:
return fib(num-1) + fib(num-2)
print(fib(10))
```

INSTRUCTIONS
Add documentation
OUTPUT

```r
def fib(num):
""" Print the nth number in the fibonacci sequence """
if num <= 1:
return num
else:
return fib(num-1) + fib(num-2)
print(fib(10))
```

## Best practices

The edits endpoint is still in alpha, we suggest following these best practices.

1. Consider using an empty prompt! In this case, editing can be used similarly to completion.
1. Be as specific with the instruction as possible.
1. Sometimes, the model cannot find a solution and will result in an error. We suggest rewording your instruction or input.
