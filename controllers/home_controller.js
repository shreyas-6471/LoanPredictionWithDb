//const Post=require('../models/post');
//const Comment=require('../models/comment');
//const User=require('../models/user');
const { PythonShell } = require('python-shell');
//const tf = require('@tensorflow/tfjs-node');
const customer=require('../models/customer');
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


const { spawn } = require('child_process');
module.exports.modelPredict = function(req, res) {

    console.log('In home_controller file');
    console.log('Info entered are',req.body);
    const inputValues = [
        parseFloat(req.body.amount),
        parseFloat(req.body.income),
        parseFloat(req.body.debt),
        parseFloat(req.body.history),
        parseFloat(req.body.accounts),
        parseFloat(req.body.balance),
        parseFloat(req.body.maxcredit),
        parseFloat(req.body.job),
        parseFloat(req.body.home),
        parseFloat(req.body.purpose),
        parseFloat(req.body.problems),
        parseFloat(req.body.bankruptcies),
        parseFloat(req.body.taxliens),
        parseFloat(req.body.creditranges)
    ];
    
    let X = [inputValues];      
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

        console.log('Float value of result is',parseFloat(result));
        if(parseFloat(result)===0)
        {
            restosend="The customer is most likely to pay off the loan."
        }
        else{
            restosend="The customer's loan will mostly be charged-off."
        }

        console.log('From controller',restosend)
        let new_customer=new customer({
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
            predictedloanstatus:result,
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








  
