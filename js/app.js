//Global elements
let txtLines = [];
const dropArea = document.getElementById('drop-area');
const fileSelector = document.getElementById('file-selector');
const bntFile = document.querySelector('label[for="file"]');
const resultArea = document.getElementById('result-area');
const processing = document.querySelector('#processing');
const instructions = document.querySelector('#initial-content');

//Events
eventListeners();
function eventListeners() {
    dropArea.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Style the drag-and-drop as a "copy file" operation.
        event.dataTransfer.dropEffect = 'copy';
        dropArea.classList.add('dropping')
      });
      
      dropArea.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        dropArea.classList.remove('dropping')
        const fileList = event.dataTransfer.files;
        readFile(fileList[0])
      });

      fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;
        readFile(fileList[0])
      });

      bntFile.addEventListener('click', (event) => {
        event.preventDefault();
        fileSelector.click();
      });
}


//Classes & Methods
class Employee{
    constructor(name, hours){
        this.name = name;
        this.hours = hours;
        this.workedHours = [];
        this.shifts;
        this.payment = 0;
    }

    divideString(){
        const {hours} = employee;
        if(hours){
            this.shifts = Math.floor(hours.length/13);
            for(let i = 0; i < this.shifts; i++){
                const shift = hours.slice( ((13*i)+i), (13*(i+1)+i) );
                this.workedHours = [...this.workedHours, shift];
            }
        } else {
            ui.printAlert('The file is empty. Please, use a different one');
        }
    }

    calculatePayment(){
        for(let i = 0; i < this.shifts; i++){
            const day = this.workedHours[i].slice(0,2);
            const shift = this.workedHours[i].slice(2);
            const start = parseInt(shift.slice(0,2));
            const end = parseInt(shift.slice(6,9));
            if(day === 'MO'||day === 'TU'||day === 'WE'||day === 'TH'||day === 'FR'){
                if(start > 0 && end <= 9){
                    //console.log('DK entre 0 y 9');
                    this.payment += 25*(end-start);
                } else if(start > 9 && end <= 18){
                    //console.log('DK entre 9 y 18');
                    this.payment += 15*(end-start);
                } else if(start > 18 && end <= 24) {
                    //console.log('DK entre 18 y 24');
                    this.payment += 20*(end-start);
                }
            } else {
                if(start > 0 && end <= 9){
                    //console.log('WK entre 0 y 9');
                    this.payment += 30*(end-start);
                } else if(start > 9 && end <= 18){
                    //console.log('WK entre 9 y 18');
                    this.payment += 20*(end-start);
                } else if(start > 18 && end <= 24) {
                    //console.log('WK entre 18 y 24');
                    this.payment += 25*(end-start);
                }
            }
        }
        this.workedHours = [];
    }


}

class UI{
    addPayment(employee){
        const {name, payment} = employee;
        //console.log(`The amount to pay ${name} is: ${payment} USD`)
        //Create new row and cells
        const row = document.createElement('tr');
        const cell1 = document.createElement('th');
        const cell2 = document.createElement('th');
        cell1.textContent = name;
        cell2.textContent = `$${payment} USD`;
        //Add values to new row
        row.appendChild(cell1);
        row.appendChild(cell2);
        //Add new row to table
        let table = document.querySelector('.result table');
        table.appendChild(row);
    }

    cleanHTML(){
        while(resultArea.firstChild) {
            resultArea.removeChild(resultArea.firstChild);
        }
    }

    printAlert(message){
        dropArea.classList.add('error');
        processing.classList.add('error');
        const content = `<img src="/content/svg/error-illustration.svg" alt="error illustration">
                         <p class="drop-instruction txt-center">${message}</p>`;
        processing.innerHTML = content;
        instructions.classList.add('hidden');
        processing.classList.remove('hidden');
        setTimeout(() => {
            processing.classList.add('hidden');
            instructions.classList.remove('hidden');
            dropArea.classList.remove('error');
        processing.classList.remove('error');
        }, 2500);
    }
}


const ui = new UI();
let employee = new Employee();
 
//Functions
function readFile(file) {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith('text/plain')) {
        ui.printAlert("We can't read this file. Please use a simple text file (.txt)" )
        return;
    }

    const tableStucture = `<table>
                        <tr>
                            <th>Employee</th>
                            <th>Payment</th>
                        </tr>
                    </table>`
    ui.cleanHTML();
    resultArea.innerHTML = tableStucture;
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        displayLoader();
        const st = reader.result;
        if(st != null || st != ''){
            txtLines = st.split("\n");
            //Array of employees(objects)
            
            for(let i=0; i < txtLines.length; i++ ){
                const data = txtLines[i].split('=');
                //Declare params of Employee object
                employee.name = data[0];
                employee.hours = data[1];
                employee.divideString();
                employee.calculatePayment();
                ui.addPayment(employee);
                employee.payment = 0;
            }
        } else {
            ui.printAlert('The file is empty. Please, try with a different one')
        }
        
    });
    reader.readAsText(file);
}

function displayLoader(){
    let loader = `<p class="drop-instruction txt-center">(1/2) Reading file...</p>
                    <img id="loader-gif" src="/content/gif/reading.gif" alt="">`;
    processing.innerHTML = loader;
    instructions.classList.add('hidden');
    processing.classList.remove('hidden');
    resultArea.style.opacity = '0.4';
    setTimeout(() => {
        loader = `<p class="drop-instruction txt-center">(2/2) Calculating salaries...</p>
                    <img id="loader-gif" src="/content/gif/reading.gif" alt="">`;
        processing.innerHTML = loader;
    }, 1500);
    setTimeout(() => {
       processing.classList.add('hidden');
       instructions.classList.remove('hidden');
       resultArea.classList.remove('hidden');
       resultArea.style.opacity = '1'; 
    }, 3000);
}