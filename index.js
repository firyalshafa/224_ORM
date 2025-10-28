const express = require('express');
const app = express();
const db = require('./models');
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

app.listen(PORT,()=>{
    console.log('server started on port 3000');
})

db.sequelize.sync()
.then((result) => {
    app.listen(3000,()=>{
        console.log('server started');
    })

})

.catch((err)=>{
    console.log(err);
})
//
app.post("/komik",async (Req, res)=> {
    const data= req.body;
    try{
        const komik = await db.komik.create(data);
        res.send(komik);
    }catch(err){
        res.send(err)
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.komik.findAll();
        res.send(komik);
    } catch (err) {
        res.send(err);
    }
});

app.put('/komik/:id', async(req,res)=>{
    const id = req.params.id;
    const data =req.body;

    try{
        const komik = await db.komik.findByPk(id);
        if(!komik){
            return res.status(404),send({massage:'komik tidak di temukan'});

        }
        await komik.update(data);
        res.send({massage: 'komik berhasil di update', komik})

    }catch(err){
        res.status(505).send(err);
    }
});

app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const komik = await db.komik.findByPk(id);

        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }

        await komik.destroy();

        res.send({ message: 'Komik berhasil dihapus' });

    } catch (err) {
        res.status(500).send(err);
    }
});

