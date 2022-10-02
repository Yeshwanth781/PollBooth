const router=require('express').Router();
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient();

router.get('/:id',async (req,res)=>{
    const id=parseInt(req.params.id)
    const userdetails=await prisma.users.findMany({
        where:{
            id:id,
        }
    })
    res.json(userdetails);
})

router.post('/add',async (req,res)=>{
    await prisma.users.create({
        data:{
            name:req.body.name,
            email:'xyz@gmail.com',
            password:'opop',
        }
    })
    res.status(200).json({
        messege:"created user successfully"
    });
})

module.exports=router;