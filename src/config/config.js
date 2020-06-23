process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

 let URL;

if(process.env.NODE_ENV === 'dev'){
    URL='mongodb://localhost:27017/cafe';
}else{
    URL='mongodb+srv://juli:juli@cluster0-ugleq.mongodb.net/cafe'
}

process.env.URLDB = URL;

 
//mongodb+srv://juli:<password>@cluster0-ugleq.mongodb.net/test