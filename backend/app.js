const express=require('express');
const app=express();
const cors=require('cors')
app.listen(8000);
const userRouter=require('./routers/userRouter')
const teamRouter=require('./routers/teamRouter')
const pollRouter=require('./routers/PollRouter')
const memberRouter=require('./routers/memberRouter')
app.use((req,res,next)=>{//middlewares
    console.log('Request recieved...',req.method);
    next();//must else website keeps on loading,..
})
app.use(express.json());
app.use(cors())
app.use('/users',userRouter);   
app.use('/teams',teamRouter);
app.use('/members',memberRouter);
app.use('/polls',pollRouter);
app.use((req,res)=>{
    res.status(404).render('')
})