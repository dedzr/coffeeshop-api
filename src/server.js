

const app=require('./app');
const http=require('http');
const {mongoConnect}=require('../services/mongo');



const PORT=process.env.PORT || 3000;





const server=http.createServer(app);


async function startServer()
{


    await mongoConnect();
 

    server.listen(PORT,()=>{

        console.log(`Server started on port ${PORT}`);
    })

}

startServer();
