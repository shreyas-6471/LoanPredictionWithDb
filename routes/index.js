const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');

console.log('Router loaded');
router.get('/',homeController.homefn);
router.get('/predictsinglerecord',homeController.singlePredictform);
router.get('/predictsmultiplerecord',homeController.multipPredictform);
router.post('/model',homeController.modelPredict);
router.post('/uploadmodelsheet',homeController.uploadsheet);
router.get('/getallrecords',homeController.fetchallRecords);
router.get('/getcustomer',homeController.getCustomer);
router.get('/getCustomerResults',homeController.getresfrommultiple);
router.get('/getCountOfLoanStatusPositive',homeController.getcountsofloanstatuspositive);
router.get('/getCountOfLoanStatusNegative',homeController.getcountsofloanstatusnegative);
router.post('/getinsights',homeController.getinsights);
router.get('/getloanstatuspositive',homeController.getloanstatuspositive);
router.get('/getonerecordwithid',homeController.getonerecordwithid);
router.get('/getcountwithcredandstatus',homeController.getCredscoreStatusCount);
router.get('/getcountwithhomeloanstatus',homeController.getOwnershiploanStatusCount);

module.exports=router;