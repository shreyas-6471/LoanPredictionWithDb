 const mongoose=require('mongoose');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const customerSchema=new mongoose.Schema({
    amount: { type: String, required: true },
    income: { type: String, required: true },
    debt: { type: String, required: true },
    history: { type: String, required: true },
    accounts: { type: String, required: true },
    balance: { type: String, required: true },
    maxcredit: { type: String, required: true },
    job: { type: String, required: true },
    home: { type: String, required: true },
    purpose: { type: String, required: true },
    problems: { type: String, required: true },
    bankruptcies: { type: String, required: true },
    taxliens: { type: String, required: true },
    creditranges: { type: String, required: true },
    predictedloanstatus:{type:String,required:true},
    probability:{type:String},
    features:[String]
},{
    timestamps:true
});
const Customer=mongoose.model('Customer',customerSchema);
module.exports=Customer;