const router=require('express').Router();
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient();

router.post('/login',async (req,res)=>{
    const id=parseInt(req.params.id)
    const userdetails=await prisma.users.findMany({
        where:{
            email:req.body.email,
            password:req.body.password,
        }
    })
    res.status(200).json(userdetails);
})

router.post('/signup',async (req,res)=>{
    await prisma.users.create({
        data:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        }
    })
    res.status(200).json({
        messege:"created user successfully"
    });
})

module.exports=router;