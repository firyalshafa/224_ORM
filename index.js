const express = require('express');
const app = express();
const db = require('./models');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sinkronisasi database lalu jalankan server
db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// ====== ROUTES ======

// CREATE (POST)
app.post("/komik", async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (err) {
        res.status(500).send(err);
    }
});

// READ (GET)
app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (err) {
        res.status(500).send(err);
    }
});

// UPDATE (PUT)
app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }

        await komik.update(data);
        res.send({ message: 'Komik berhasil diupdate', komik });
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE
app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const komik = await db.Komik.findByPk(id);

        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }

        await komik.destroy();
        res.send({ message: 'Komik berhasil dihapus' });
    } catch (err) {
        res.status(500).send(err);
    }
});
