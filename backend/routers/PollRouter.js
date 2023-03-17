const router=require('express').Router();
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient();
router.get('/',(req,res)=>{
    res.json({
        messege:"poll request",
    })
})
router.get('/all/:teamid',async (req,res)=>{
    const id=parseInt(req.params.teamid)
    const polls=await prisma.polls.findMany({
        where:{
            teamid:id,
        },
    })
    res.json(polls);
})

router.post('/add/:teamid',async (req,res)=>{
    const id=parseInt(req.params.teamid)
    try{
    await prisma.polls.create({
        data:{
            teamid:id,
            pollname:req.body.pollname,
        }
    })
    res.json({
        messege:"poll created successfully"
    });
}catch(err){
    res.json({
        messege:"could create poll",
    })
}
})

router.post('/addoption/:pollid',async (req,res)=>{
    const id=parseInt(req.params.pollid)
    try{
    await prisma.options.create({
        data:{
            pollid:id,
            optionname:req.body.optionname,
        }
    })
}catch(err){
    res.json({
        messege:"could create poll",
    })
}
    res.json({
        messege:"poll created successfully"
    });
})

router.get('/getpollDetails/:pollid',async (req,res)=>{
    const id=parseInt(req.params.pollid)
    const polls=await prisma.options.findMany({
        where:{
            pollid:id,
        },
    })
    res.json(polls);
})
router.put('/vote/:optionid',async (req,res)=>{
    const optionid=parseInt(req.params.optionid);
    let votes=await prisma.options.findMany({
        where:{
            optionid:optionid
        },
        select:{
            votes:true,
        }
    })
    votes=parseInt(votes[0].votes);
    ++votes;
    console.log(votes);
    await prisma.options.update({
        where: {
          optionid: parseInt(optionid),
        },
        data:{
            votes:votes
        }   
      });
      res.json({
        update:"Done Successfully..."
      })
})
module.exports=router;