var BASE_URL; 
var BASE_URL_ADMIN;
 
switch(process.env.REACT_APP_STAGE) { // setup in the AWS ECS 
    case "qa": 
        BASE_URL = "https://dok9d47io5.execute-api.us-east-1.amazonaws.com/qa/v1"; 
        BASE_URL_ADMIN = "http://api-superadmin-qa.drivealert.io/v1";
        break; 
    case "stage": 
        BASE_URL = "https://4r9i4bie5f.execute-api.us-east-1.amazonaws.com/stage/v1";
        BASE_URL_ADMIN = "http://api-superadmin-stage.drivealert.io/v1"; 
        break; 
    case "prod": 
        BASE_URL = "https://cblq65b1oc.execute-api.us-east-1.amazonaws.com/prod/v1"; 
        BASE_URL_ADMIN = "http://api-superadmin.drivealert.io/v1";
        break; 
    default: // localhost and dev  ds
        BASE_URL = "https://obo3jdydlb.execute-api.us-east-1.amazonaws.com/dev/v1"; 
        BASE_URL_ADMIN = "http://api-superadmin-dev.drivealert.io/v1";
} 
 
export { BASE_URL,BASE_URL_ADMIN };
