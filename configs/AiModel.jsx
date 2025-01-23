const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const courseOutlineAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate a study material for python for exam and level of difficulty will be easy. There should be course title, summary of the course, List of Chapters along with summary for each chapter, and the topics, there should not be more than 3 topics for each chapter, ALL result in JSON format'"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseTitle\": \"Introduction to Python Programming (Easy Level)\",\n  \"courseSummary\": \"This course provides a beginner-friendly introduction to Python programming. It covers fundamental concepts and syntax, enabling students to write simple Python scripts and understand basic programming logic. The focus is on building a solid foundation for further exploration of Python.\",\n  \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"Getting Started with Python\",\n      \"chapterSummary\": \"This chapter introduces Python and sets up the development environment. Students will learn how to install Python, understand basic terminology, and write their first Python program.\",\n       \"topics\": [\n          \"Installing Python\",\n          \"Running Your First Python Program\",\n          \"Understanding Python Interpreter\"\n       ]\n    },\n    {\n      \"chapterNumber\": 2,\n      \"chapterTitle\": \"Basic Data Types and Variables\",\n       \"chapterSummary\": \"This chapter focuses on different data types in Python such as integers, floats, strings and booleans. Students will also learn about variables and how to assign values to them.\",\n      \"topics\": [\n         \"Integers and Floats\",\n        \"Strings\",\n        \"Variables and Assignment\"\n      ]\n    },\n    {\n      \"chapterNumber\": 3,\n      \"chapterTitle\": \"Input and Output Operations\",\n      \"chapterSummary\":\"This chapter covers how to get input from the user and how to display output on the console using functions such as input() and print().\",\n      \"topics\": [\n          \"Using the `print()` Function\",\n          \"Using the `input()` Function\",\n           \"Formatting Output\"\n      ]\n    },\n    {\n      \"chapterNumber\": 4,\n      \"chapterTitle\": \"Basic Operators\",\n      \"chapterSummary\": \"This chapter will go over how to use basic operators such as arithmetic (+, -, *, /), comparison (==, !=, >, <), and logical (and, or, not) operators in Python.\",\n       \"topics\": [\n         \"Arithmetic Operators\",\n         \"Comparison Operators\",\n          \"Logical Operators\"\n      ]\n    },\n    {\n       \"chapterNumber\": 5,\n      \"chapterTitle\": \"Conditional Statements: If-Else\",\n      \"chapterSummary\":\"This chapter covers how to use if statements, else statements and elif statements in python to control the flow of execution based on conditions.\",\n       \"topics\": [\n          \"The `if` Statement\",\n          \"The `if-else` Statement\",\n           \"The `if-elif-else` Statement\"\n      ]\n    },\n     {\n       \"chapterNumber\": 6,\n      \"chapterTitle\": \"Introduction to Loops\",\n        \"chapterSummary\":\"This chapter introduces loops in Python, including both `for` loops and `while` loops for repeated execution of code.\",\n      \"topics\": [\n          \"The `for` Loop\",\n           \"The `while` Loop\",\n           \"Loop Control Statements (break, continue)\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  

    export const generateNotesAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate exam material detail content for each chapter, make sure to includes all topic point in the content, make sure to give content in HTML format (Do not add HTMLKL, Head, Body, title tag), The chapter: {\n\"chapterNumber\": 1,\n\"chapterTitle\": \"Advanced Data Structures\",\n\"chapterSummary\": \"This chapter explores more complex data structures in JavaScript, including arrays, objects, and their manipulation.\",\n\"topics\": [\n\"Multi-dimensional arrays\",\n\"Object Properties and Methods\",\n\"Array Iteration Methods (map, filter, reduce)\"\n]\n}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```html\n<div class=\"chapter\">\n    <h2>Chapter 1: Advanced Data Structures</h2>\n    <p class=\"summary\">This chapter explores more complex data structures in JavaScript, including arrays, objects, and their manipulation.</p>\n\n    <div class=\"topic\">\n        <h3>Multi-dimensional arrays</h3>\n        <p>\n            <strong>Concept:</strong> Multi-dimensional arrays are arrays that contain other arrays as elements, creating structures similar to tables or matrices. They can represent data with more than one dimension.\n        </p>\n        <p>\n            <strong>Key points:</strong>\n            <ul>\n                <li>Declaration and initialization of multi-dimensional arrays using nested square brackets. Example: <code>let matrix = [[1, 2], [3, 4]];</code></li>\n                <li>Accessing elements in multi-dimensional arrays using multiple indices. Example: <code>matrix[0][1]</code> accesses the element at row 0, column 1 (value: 2).</li>\n                <li>Understanding how to iterate through multi-dimensional arrays using nested loops.</li>\n                <li>Creating and modifying multi-dimensional arrays with different shapes.</li>\n                <li>Common use cases: representing game boards, grids, and data with tabular structures.</li>\n            </ul>\n        </p>\n        <p>\n            <strong>Example Questions:</strong>\n            <ul>\n                <li>Declare and initialize a 3x3 matrix with numbers from 1 to 9.</li>\n                <li>Write a function that takes a 2D array and returns the sum of all its elements.</li>\n                <li>How would you access the element in the third row and second column of a 4x4 array?</li>\n                 <li>Explain how to add a new row to a multi-dimensional array.</li>\n            </ul>\n        </p>\n    </div>\n\n\n    <div class=\"topic\">\n        <h3>Object Properties and Methods</h3>\n          <p>\n              <strong>Concept:</strong> Objects in JavaScript are collections of key-value pairs (properties). They can also contain functions as values (methods), enabling objects to encapsulate data and behavior.\n          </p>\n          <p>\n              <strong>Key points:</strong>\n              <ul>\n                  <li>Understanding object literals and object creation using the <code>new Object()</code> constructor.</li>\n                  <li>Accessing object properties using dot notation (<code>object.propertyName</code>) and bracket notation (<code>object['propertyName']</code>).</li>\n                   <li>Adding new properties, modifying existing properties, and deleting properties using <code>delete object.propertyName</code>.</li>\n                  <li>Defining methods within objects, which are functions that operate on the object's data. Example: <code>object.methodName = function() { ... }</code>.</li>\n                    <li>The use of the <code>this</code> keyword within object methods to refer to the object itself.</li>\n                    <li>Understanding how to iterate through object properties using `for...in` loops and `Object.keys()`.</li>\n                  <li>Understanding the difference between properties and methods in an object.</li>\n\n              </ul>\n          </p>\n         <p>\n            <strong>Example Questions:</strong>\n            <ul>\n                <li>Create an object representing a car with properties like 'make', 'model', 'year' and a method to get the car's details.</li>\n                <li>How do you add a new property to an existing object?</li>\n                <li>Write a function to print all the keys and values of an object using a loop.</li>\n                <li>Explain the purpose of the 'this' keyword in object methods.</li>\n                 <li>What are the differences between dot notation and bracket notation in object access?</li>\n\n            </ul>\n        </p>\n    </div>\n\n    <div class=\"topic\">\n        <h3>Array Iteration Methods (map, filter, reduce)</h3>\n        <p>\n            <strong>Concept:</strong> JavaScript arrays provide several built-in methods for iterating and transforming data in a declarative style. These include <code>map</code>, <code>filter</code>, and <code>reduce</code>.\n        </p>\n         <p>\n            <strong>Key points:</strong>\n            <ul>\n                <li><strong><code>map()</code>:</strong> Creates a new array by applying a provided function to each element of the original array. The original array remains unchanged.</li>\n                 <li>Understanding the callback function parameters passed to `map()` (current element, index, original array).</li>\n                <li><strong><code>filter()</code>:</strong> Creates a new array containing only the elements from the original array that pass a test implemented by the provided function.</li>\n                <li>Understanding the callback function parameters passed to `filter()` (current element, index, original array).</li>\n                <li><strong><code>reduce()</code>:</strong> Applies a function against an accumulator and each element of the array (from left to right) to reduce it to a single value.</li>\n                  <li>Understanding the callback function parameters passed to `reduce()` (accumulator, current element, index, original array) and the initial value.</li>\n                <li>Distinguish between when to use map(), filter(), and reduce().</li>\n                  <li>Recognizing functional programming concepts in these methods.</li>\n            </ul>\n        </p>\n         <p>\n            <strong>Example Questions:</strong>\n            <ul>\n                <li>Use `map()` to create a new array that contains the square of each number in an existing array.</li>\n                 <li>Use `filter()` to create a new array containing only the even numbers from a given array.</li>\n                <li>Use `reduce()` to calculate the sum of all numbers in an array.</li>\n                 <li>Explain how to use map(), filter(), and reduce() in a chain of operations.</li>\n                 <li>Describe how these methods are used to avoid mutating the original array.</li>\n            </ul>\n        </p>\n    </div>\n</div>\n```\n"},
          ],
        },
      ],
    });
    //const result = await GenerateCourseLayout.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());

    export const GenerateStudyTypeAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate the flashcard on topic: Embedding JavaScript in HTML, Basic Syntax, and Displaying Output (console.log).  In JSON format with front back content, Maximum 15"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"front\": \"How do you embed JavaScript code directly into an HTML document?\",\n    \"back\": \"Using the `<script>` tag.  Example: `<script> // JavaScript code here </script>`\"\n  },\n   {\n    \"front\": \"What's the basic structure of a JavaScript statement?\",\n    \"back\": \"Usually an action followed by a semicolon ( ; ), like `console.log('Hello');`\"\n   },\n  {\n    \"front\": \"How can you display output to the browser's console using JavaScript?\",\n      \"back\": \"Using the `console.log()` function. Example: `console.log('Message to console');`\"\n    },\n    {\n     \"front\": \"Where within the HTML document is the `<script>` tag typically placed?\",\n     \"back\": \"Either in the `<head>` section or at the end of the `<body>` section (before the closing `</body>` tag). Best practice to put before closing body tag.\"\n   },\n   {\n      \"front\":\"Is the semicolon required at the end of each JavaScript statement?\",\n      \"back\": \"It's recommended but not strictly required in most cases, but best practice to include them.\"\n   },\n   {\n    \"front\":\"What is the purpose of the `<script>` tags?\",\n    \"back\": \"It tells the browser that the enclosed text is JavaScript code.\"\n    },\n    {\n     \"front\":\"Can you have multiple `<script>` tags in the same HTML file?\",\n      \"back\": \"Yes, you can have multiple `<script>` tags to include more javascript code.\"\n    },\n      {\n    \"front\": \"Can JavaScript be placed in an external file?\",\n      \"back\": \"Yes, using `.js` and referenced via `<script src='file.js'></script>`\"\n  },\n    {\n      \"front\": \"What is the difference between single quotes and double quotes in strings for console.log?\",\n       \"back\":\"Generally no difference, both work fine: `console.log('Hello')` and `console.log(\\\"Hello\\\");`\"\n   },\n    {\n        \"front\": \"What data type can you display in `console.log`?\",\n      \"back\":\"Strings, numbers, booleans, objects, arrays and more. \"\n    },\n    {\n        \"front\": \"Besides `console.log()`, can you display messages in other ways?\",\n        \"back\":\"Yes using `alert()`, or modifying HTML using DOM manipulation, to name a few\"\n    },\n    {\n      \"front\": \"How do you add comments to JavaScript code?\",\n     \"back\": \"Using `//` for single line comments and `/* */` for multi-line comments.\"\n   }\n]\n```\n"},
          ],
        },
      ],
    })