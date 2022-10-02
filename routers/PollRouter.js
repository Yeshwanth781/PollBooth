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
}catch(err){
    res.json({
        messege:"could create poll",
    })
}
    res.status(200).json({
        messege:"poll created successfully"
    });
})

router.get('getpollDetails/:pollid',async (req,res)=>{
    const id=parseInt(req.params.pollid)
    const polls=await prisma.polls.findMany({
        where:{
            pollid:id,
        },
    })
    res.json(polls);
})
router.put('vote/:optionid',async (req,res)=>{
    const optionid=parseInt(req.params.optionid);
    const votes=await prisma.options.findMany({
        where:{
            optionid:optionid
        },
        select:{
            votes:true,
        }
    })
    votes=parseInt(votes);
    ++votes;
    await prisma.options.update({
        where: {
          id: parseInt(optionid),
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