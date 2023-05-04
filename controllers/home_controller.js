//const Post=require('../models/post');
//const Comment=require('../models/comment');
//const User=require('../models/user');
const { PythonShell } = require('python-shell');
const XLSX = require('xlsx');
const multer = require('multer');
//import fetch from 'node-fetch';
const upload = multer({ dest: 'uploads/' }); // Define the destination folder for uploaded files
//const tf = require('@tensorflow/tfjs-node');
const Customer=require('../models/customer');
const mongoose = require('mongoose');
const xlsx = require('xlsx');
module.exports.homefn=function(req,res)
{
   
      return res.render('basehome',{ // setting the title of the page dynamically by giving the value,
         
         title:'Loan Prediction Application'  
    

      });
}

module.exports.singlePredictform=function(req,res)
{
   
      return res.render('home',{ // setting the title of the page dynamically by giving the value,
         
         title:'Loan Prediction Application'  
    

      });
}

module.exports.multipPredictform=function(req,res)
{
   
      return res.render('multiplepredict',{ // setting the title of the page dynamically by giving the value,
         
         title:'Loan Prediction form for multiple records'  
    

      });
}
module.exports.fetchallRecords = function(req, res) {
    Customer.find({})
      .then(customers => {
        res.render('allrecords', {
          customers: customers,
          title:'All Records'
        });
      })
      .catch(err => {
        console.log('error in fetching customers', err);
        res.status(500).send('Error fetching customers');
      });
  }
  module.exports.getCustomer = function(req, res) {
   /* Customer.find({})
      .then(customers => {
        res.render('allrecords', {
          customers: customers,
          title:'All Records'
        });
      })
      .catch(err => {
        console.log('error in fetching customers', err);
        res.status(500).send('Error fetching customers');
      });*/
      console.log(req.query);

      console.log(req.query.id);
      console.log(req.query['id\\']);
      const id=req.query['id\\'];
      if(req.query['loanstatus']==''){
      Customer.findById(id)
      .then(customers => {
        console.log('Fetched customer is',customers);
        res.render('allrecords', {
          customers: customers,
          title:'All Records'
        });
      })
      .catch(err => {
        console.log('error in fetching customers', err);
        res.status(500).send('Error fetching customers');
      });
    }
    else{
       /* {predictedloanstatus:
            "[0.0"}*/
            console.log("'"+
            req.query.loanstatus+"'");
            const status=parseFloat(req.query.loanstatus);
            console.log('status is',status);
            Customer.find({ predictedloanstatus: `${req.query.loanstatus}`})
        .then(customers => {
            console.log('Entered req fn');
          console.log('Fetched customer is',customers);
          res.render('allrecords', {
            customers: customers,
            title:'All Records'
          });
        })
        .catch(err => {
          console.log('error in fetching customers', err);
          res.status(500).send('Error fetching customers');
        });
    }
  }

  module.exports.getresfrommultiple = async function(req, res) {
    const ids = req.query.ids.split(',');
    const records = await Promise.all(ids.map(id => Customer.findById(id)));
    //console.log('Starting...');
setTimeout(() => {
 // console.log('Waited 10,000ms');
}, 1000000);
    const filteredRecords = records.filter(record => record !== null);
    
    res.render('allrecords', {
      customers: filteredRecords,
      title: 'All Records'
    });
  }
  




const { spawn } = require('child_process');
module.exports.modelPredict = function(req, res) {

    console.log('In home_controller file');
    console.log('Info entered are',req.body);
    const inputValues = [
        parseFloat(req.body.amount),
        parseFloat(req.body.creditranges),
        parseFloat(req.body.income),
        parseFloat(req.body.job),
        parseFloat(req.body.home),
        parseFloat(req.body.purpose),
        parseFloat(req.body.debt),
        parseFloat(req.body.history),
        parseFloat(req.body.accounts),
        parseFloat(req.body.problems),
        parseFloat(req.body.balance),
        parseFloat(req.body.maxcredit),
        parseFloat(req.body.bankruptcies),
        parseFloat(req.body.taxliens)
    ];
    
    let X = [inputValues];      
    console.log('x vals are',X);
    let pythonProcess = spawn('/usr/bin/python3', ['script.py', JSON.stringify(X)]);
    
    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        process.stdout.write(data.toString()); 
        result += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        console.log('Predicted result in node is!!!', result);
        let interres=result.trim();
        console.log('Trimmed res is',interres);
        let restosend="";

        console.log('Result is',(result[1]));
        if((result[1])==='0')
        {
            restosend="The customer is most likely to pay off the loan."
        }
        else{
            restosend="The customer's loan will mostly be charged-off."
        }

        console.log('From controller',restosend)
        let new_customer=new Customer({
            amount:req.body.amount ,
            income: req.body.income,
            debt: req.body.debt,
            history: req.body.history ,
            accounts: req.body.accounts,
            balance:req.body.balance,
            maxcredit: req.body.maxcredit,
            job: req.body.job ,
            home: req.body.home,
            purpose: req.body.purpose,
            problems:req.body.problems ,
            bankruptcies: req.body.bankruptcies,
            taxliens: req.body.taxliens,
            creditranges: req.body.creditranges,
            predictedloanstatus:result.trim(),
        });
        new_customer.save().then((customer)=>{
            console.log('pushed data successfully to db!');
            return res.render('home', { 
                title:'Loan Prediction Application',
                predictedResult:restosend 
            });
        })
        .catch((err)=>{
            console.log('Problem while pushing data to db!!!');
            return;
        })
    });
};


module.exports.uploadsheet = function(req, res, next) {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename: function(req, file, cb) {         cb(null, file.originalname);
        }
    });
      
    const upload = multer({ storage: storage }).single('file');

    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.message);
        } else if (err) {
            return res.status(500).send(err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file was uploaded.');
        }

        console.log(req.file.filename);
      
        // Access the uploaded file
        const uploadedFile = req.file;
        //console.log(__dirname); // prints the current project directory
        const projectDir = process.cwd();
        console.log(projectDir); // prints the current project directory

        let path=process.cwd()+'/uploads/'+req.file.filename;
        const workbook = XLSX.readFile(path);
        const sheetName = workbook.SheetNames[0]; // get the first sheet in the workbook
        const worksheet = workbook.Sheets[sheetName];
        const range = xlsx.utils.decode_range(worksheet['!ref']); // decode the range of cells in the sheet
        const numRows = range.e.r + 1; // add 1 to get the number of rows
        const numCols = range.e.c + 1; // add 1 to get the number of columns
        console.log(`Number of rows: ${numRows}`);
        console.log(`Number of columns: ${numCols}`);
        let xvals=[];
        for(let row=0;row<numRows;row++)
        {
           let x=[];
            for(let col=0;col<numCols;col++)
            {
                let cellValue = worksheet[xlsx.utils.encode_cell({r: row, c: col})];
               // let cellValue = worksheet[row][col].v;
               //console.log('cell val is',cellValue);
               if(cellValue!=undefined){
                x.push(cellValue.v);
               }
            }
           // console.log('x value is',x);
            if(x!=[]){
            xvals.push(x);
            }
        }
        console.log('Final xvals are',xvals);
        let pythonProcess = spawn('/usr/bin/python3', ['script.py', JSON.stringify(xvals)]);
    
        let result = '';
    
        pythonProcess.stdout.on('data', (data) => {
            process.stdout.write(data.toString()); 
            result += data.toString();
        });
        
        pythonProcess.stderr.on('data', (data) => {
            console.error('Error:', data.toString());
        });
    
        pythonProcess.on('close', (code) => {
           // console.log(`child process exited with code ${code}`);
            //console.log('Predicted result in node is!!!', result);
            let interres=result.trim();
           // console.log('Trimmed res is',interres);
           const myarr= result.split(',');
          // console.log('My array is',myarr);
            let finalxvals=[];
            for(let row=0;row<numRows;row++)
            {
                let xafter=[];
                for(let col=0;col<numCols;col++)
                {
                    let cellValue = worksheet[xlsx.utils.encode_cell({r: row, c: col})];
                   if(cellValue!=undefined){
                    xafter.push(cellValue.w);
                   }
                }
                xafter.push(myarr[row].trim());
                const dataObject = {
                    amount:xafter[0] ,
                    creditranges: xafter[1],
                    income: xafter[2],
                    job: xafter[3],
                    home:xafter[4] ,
                    purpose:xafter[5],
                    debt:xafter[6] ,
                    history: xafter[7],
                    accounts: xafter[8],
                    problems: xafter[9],
                    balance: xafter[10],
                    maxcredit : xafter[11],
                    bankruptcies:xafter[12] ,
                    taxliens:xafter[13] ,
                    predictedloanstatus:xafter[14].trim()
                  };
               finalxvals.push(dataObject);
               
                }
                console.log('finalxvals while pushing to db',finalxvals);
                let ids=[]
                finalxvals.forEach(record => {
                    const newRecord = new Customer(record);
                    newRecord.save()
                    .then(() => console.log('Record saved successfully!'))
                    .catch(err => console.error(err));
                  ids.push(newRecord._id);
                  });
 

// Create a new workbook
                    const idsString = ids.join(',');

// Create a new workbook

                  return res.redirect(`/getCustomerResults?ids=${idsString}`);

            });
    
        
        });
    };
       
    





  
