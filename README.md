To build, run, and start the given TypeScript project, follow these steps:

**Step 1: Set Up Your Environment**

1. Make sure you have Node.js and npm (Node Package Manager) installed on your computer.

**Step 2: Create a Directory for Your Project**

1. Create a new directory for your project on your local machine.

2. Open your terminal or command prompt and navigate to the project directory:

**Step 3: Initialize the Project**

1. Initialize a new Node.js project by running the following command:
   ```
   npm init -y
   ```

**Step 4: Install TypeScript**

1. Install TypeScript as a development dependency in your project:
   ```
   npm install typescript --save-dev
   ```

**Step 5: Create TypeScript Files**

1. Inside your project directory, create a file named `Task.ts` (or any other preferred name) and copy the TypeScript code you provided into this file.

**Step 6: Compile TypeScript**

1. Compile the TypeScript code to JavaScript using the TypeScript compiler (`tsc`). Run the following command to compile your code:
   ```
   npx tsc Task.ts
   ```
   This will generate a compiled JavaScript file named `Task.js` in the same directory.

**Step 7: Run the Compiled JavaScript**

1. You can now run the compiled JavaScript code using Node.js. Run the following command:
   ```
   node Task.js
   ```
   This will execute your EmployeeOrgApp program and show the output in the console.

**Step 8: Observe the Output**

1. After running the program, you will see the updated organization chart, followed by the organization chart after undoing the move, and then the organization chart after redoing the move, all printed in the console.

**Note:** If you plan to make further changes to your TypeScript code and re-run the program, you need to compile it again using the TypeScript compiler (`tsc`) each time before running the compiled JavaScript with Node.js.
