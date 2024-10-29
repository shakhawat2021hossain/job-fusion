const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const port = process.env.PORT || 5000
const app = express()

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://solosphere.web.app',
    ],
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) return res.status(401).send("unothorized access")
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send("unothorized access")
            }
            console.log(decoded);
            req.user = decoded;
            next()
        })
    }
}


app.get('/', (req, res) => {
    res.send("hello from server")
})


const uri = "mongodb+srv://jobfusion:asdf1234@cluster0.28i6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbConnect = async () => {
    try {
        client.connect();
        console.log("Database Connected Successfully✅");

    } catch (error) {
        console.log(error.name, error.message);
    }
}
dbConnect()

app.post('/jwt', async (req, res) => {
    const user = req.body
    // create token
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d' })
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    }).send({ success: true })
    // res.send({ token })
})
app.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 0
    }).send({ success: true })
    // res.send({ token })
})

const jobsCollection = client.db('job-fusion').collection('jobs')
const bidsCollection = client.db('job-fusion').collection('bids')


// job posts routes

app.get('/jobs', async (req, res) => {
    const jobs = jobsCollection.find()
    const result = await jobs.toArray()
    res.send(result)
})

app.post('/jobs', async (req, res) => {
    const job = req.body;
    const result = await jobsCollection.insertOne(job)
    res.send(result)
})

app.get('/job/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await jobsCollection.findOne(query)
    res.send(result)
})
app.get('/jobs/:email', verifyToken, async (req, res) => {
    const tokenData = req.user;
    // console.log(tokenData);
    const tokenEmail = tokenData.email
    const email = req.params.email
    if (tokenEmail !== email) return res.status(403).send({message: "forbidden access"})
    
    const query = { 'recruiter.email': email }
    const result = await jobsCollection.find(query).toArray()
    res.send(result)
})

app.put('/job/:id', async (req, res) => {
    const id = req.params.id
    const job = req.body
    const query = { _id: new ObjectId(id) }
    const options = { upsert: true }
    const updateDoc = {
        $set: {
            ...job
        }
    }
    const result = await jobsCollection.updateOne(query, updateDoc, options)
    res.send(result)
})

app.delete('/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await jobsCollection.deleteOne(query)
    res.send(result)
})


// bids routes

app.post('/bids', async (req, res) => {
    const bid = req.body
    const query = {
        bidderEmail: bid.bidderEmail,
        jobId: bid.jobId
    }
    const appliedJob = await bidsCollection.findOne(query)
    if(appliedJob){
        return res.status(400).send({message: "you are already applied for the job"})
    }
    const result = await bidsCollection.insertOne(bid)
    res.send(result);
})

app.get('/my-bids/:email', async (req, res) => {
    const email = req.params.email
    const query = { bidderEmail: email }
    const result = await bidsCollection.find(query).toArray()
    res.send(result);
})
app.get('/bid-reqs/:email', async (req, res) => {
    const email = req.params.email
    const query = { recruiterEmail: email }
    const result = await bidsCollection.find(query).toArray()
    res.send(result);
})

app.patch('/update-status/:id', async (req, res) => {
    const id = req.params.id;
    const status = req.body;
    const query = { _id: new ObjectId(id) }
    const updateDoc = {
        $set: status
    }
    const result = await bidsCollection.updateOne(query, updateDoc)

    res.send(result)
})

 
//filtering 
app.get('/count-jobs', async (req, res) => {
    const filter = req.query.filter
    console.log(filter);
    let query = {}
    if(filter) query = {category: filter}
    const count = await jobsCollection.countDocuments(query)
    res.send({count})
})
app.get('/all-jobs', async (req, res) => {
    const size = parseInt(req.query.size)
    const page = parseInt(req.query.page) - 1

    const filter = req.query.filter
    let query = {}
    if(filter) query = {category: filter}

    const sort = req.query.sort
    let opt = {}
    if(sort) opt = {sort: {deadline: sort === 'asc' ? 1 : -1 }}

    const search = req.query.search
    
    const result = await jobsCollection.find(query, opt).skip(page * size).limit(size).toArray()
    res.send(result)
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})