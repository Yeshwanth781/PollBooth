const router = require('express').Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const members = await prisma.members.findMany({
        where: {
            teamid: id,
        },
    })
    
    res.json(members);
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        await prisma.members.create({
            data: {
                teamid: parseInt(req.body.teamid),
                userid: parseInt(req.body.userid),
            }
        })
    } catch (err) {
        res.json({
            messege: err,
        })
    }
    res.status(200).json({
        messege: "created user successfully"
    });
})


router.post('/addemail/:email', async (req, res) => {
    const email = (req.params.email)
    try {
        const members = await prisma.users.findMany({
            where: {
                email,
            },

        })
        console.log(members, email);
        if (members.length === 0) {
            res.status(404).json({
                messege: "No user Exists",
                status:'error'
            });
        }
        else {
            try {
                await prisma.members.create({
                    data: {
                        teamid: parseInt(req.body.teamid),
                        userid: members[0]['id'],
                    }
                })
                res.json({
                    messege: "created user successfully",
                    status:"success"
                });
            } catch (err) {
                res.status(300).json({ messege: "User is Already a member" ,status:"info"});
            }
        }
    } catch (err) {
        res.status(400).json({
            messege: "Error fetching Data",
            status:"error"
        })
    }
})

module.exports = router;