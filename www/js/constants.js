angular.module('chandler').constant("API",{
    //baseURL:"http://chandlercompaniesinc.com/mail/mail.php?",
    baseURL:"http://chandlercompaniesinc.com/mail/mail.php?",

    getURL:function(){
        return this.baseURL;
    },
    ReportALoss:function(){
        return this.baseURL+"method=1";
    },
    StormgaurdForm:function(){
        return this.baseURL+"method=2";
    },
    InspectionForm:function(){
        return this.baseURL +"method=3";
    }
});
