process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

 let URL;

 //Palabra Secreta 
process.env.SECRETO =process.env.SECRETO || 'gatitos';

//Tiempo 
process.env.TIEMPO= process.env.TIEMPO || '1hr';

if(process.env.NODE_ENV === 'dev'){
    URL='mongodb://localhost:27017/cafe';
}else{
    URL = process.env.MONGO;
}

process.env.URLDB = URL;

//////////////////////
//  CLIENTE_ID
/////////////////////
//process.env.CLIENTE_ID =process.env.CLIENTE_ID || 'ONJ_f2zmEvCZtC4tPqJWTfJ-';
process.env.CLIENTE_ID =process.env.CLIENTE_ID || '638983610085-fn32iv57b980a03nr5qccggncjosh7gu.apps.googleusercontent.com';

//'mongodb+srv://juli:juli@cluster0-ugleq.mongodb.net/cafe'
 
