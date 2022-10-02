const router=require('express').Router();
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient();

router.get('/:id',async (req,res)=>{
    const id=parseInt(req.params.id)
    const members=await prisma.members.findMany({
        where:{
            teamid:id,
        },
        select:{
            userid:true
        }
    })
    res.json(members);
})

router.post('/add',async (req,res)=>{
    console.log(req.body)
    try{
    await prisma.members.create({
        data:{
            teamid:parseInt(req.body.teamid),
            userid:parseInt(req.body.userid),
        }
    })
}catch(err){
    res.json({
        messege:"could find user",
    })
}
    res.status(200).json({
        messege:"created user successfully"
    });
})

module.exports=router;