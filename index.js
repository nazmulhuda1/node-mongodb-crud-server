const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// userName: dbuser1
// pass: VQZNW4M9uBEcTPEq
// step 2
app.use(cors());
app.use(express.json()); //-----End step 2

// async await step 3
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}.exe7q4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('nodeMongoCrud').collection('users');

        // GET (read kora) server side to form database
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
        // POST (create kora) client site form database
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // update user display show 
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await userCollection.findOne(query)
            res.send(user)
        })
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await userCollection.updateOne(filter, updatedUser, options)
            res.send(result)
        })

        // Delete kore
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            console.log(result)
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(error => console.log(error))//----- End async await step 3

// step 1 
app.get('/', (req, res) => {
    res.send('Hello form node mongodb crud server');
})
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
}) //----- end step 1 