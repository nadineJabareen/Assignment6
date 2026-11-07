/* נאדין גברין + אור סלמן  */
// Assigment 5 : 
// Reads 3 text files and writes their lines into a new file in rounds:
// 1 line from each file, then 2 lines from each, then 3, and so on.
// If a file runs out of lines, the others continue.

//importing the module to handle files and setting up the paths to the files and the new file that will be created
const fs = require('fs');  
const path = require('path');

const directoryPath = path.join(__dirname, '/alltexts'); 
const newFilePath = path.join(__dirname, 'newFile.txt');

//to over write the new file after each run so it wount stack up
fs.writeFileSync(newFilePath, '');


// reading each text file from the array into a matrix of arrays  
const fileArray=['txt1.txt','txt2.txt','txt3.txt']
const fileMatrix=[]
for(let i=0;i<3;i++){
  const Content=(fs.readFileSync(`${directoryPath}/${fileArray[i]}`, 'utf-8')).split(/\r?\n/).filter(spacing => spacing !== '');
  fileMatrix.push(Content);
}  


// finding the longest row in the matrix to know how many rounds we need to go through
const longestRow=Math.max(...fileMatrix.map(row => row.length));
let startLine=0
let linesperRound=1

//looping through the matrix where we take rows from each file according to each round ( round 1 we take 1 line, round 2 we take 2 lines, and so on  ) 
while(startLine<longestRow){
  for(let row=0;row<fileMatrix.length;row++)
    {
     const indexContent=fileMatrix[row].slice(startLine,startLine+linesperRound);
       for (let j = 0; j < indexContent.length; j++) {
      fs.appendFileSync(newFilePath, indexContent[j] + '\n');
        }
    }

    startLine+=linesperRound;
    linesperRound++;

  }
    

console.log(fs.readFileSync(newFilePath, 'utf-8'));


 
    
 
  