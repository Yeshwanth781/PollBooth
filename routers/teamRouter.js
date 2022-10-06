const router=require('express').Router();
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient();

router.get('/:id',async (req,res)=>{
    const id=parseInt(req.params.id)
    const teamdetails=await prisma.teams.findMany({
        where:{
            teamid:id,
        }
    })
    console.log(teamdetails)
    res.json(teamdetails);
})

router.post('/add',async (req,res)=>{
    const teamdetails=await prisma.teams.create({
        data:{
            teamname:req.body.teamname,
            creator:parseInt(req.body.userid)

        }
    })
    await prisma.members.create({
        data:{
            userid:parseInt(req.body.userid),
            teamid:parseInt(teamdetails.teamid)
        }
    })
    res.status(200).json({
        messege:"created Team successfully"
    });
})


module.exports=router;