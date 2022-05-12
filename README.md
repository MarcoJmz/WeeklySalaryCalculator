# WeeklySalaryCalculator
This tool takes data from a txt file to calculate the amount to pay to employees because of labor hours.
## Overview
The interface has a drag & drop area where a txt file should be dropped. There is also available a button to open a file browser and select the desired file.
Once the file is dropped, file extension will be validated. If the extension of the file dropped is different to a text file, and alert will be displayed letting know
the user about that. When a file with the proper extension is dropped or selected, it will be readed using JavaScript using a reader object. The reader object will take
the content of the file and split each line into an array. This array will be used to create 'employee' instances, taking name and worked hours from each array entry.

A forEach method is used to iterate among the array with the employee instances. Employee class counts with it's own methods (divideString() and calculatePayment())
which are used to separate the string with days and hours worked. calculatePayment will identify the day and hours when the employee worked, to identify the hour cost
and multiply it for the number of hours worked. At the end, the user will see a table with the name of employees and the amount that each one should be paid. 
## Methodology
Find below the methodology used to reach this solution:

1. List the functionalities needed to acomplish the task
2. Create a user flow to represent the path that the used will follow in each case
3. Convert flow into wireframes
4. Decide system look
5. Create system art on Figma
6. Create HTML, CSS and JS files

## How to run
1. Open index.html file using your preferred web browser
2. Drag & drop or browser your .txt file with the employees data
3. Wait for the system to show you the final table with names and amount to be paid.
