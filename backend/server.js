import express from 'express'
import cors from 'cors'
import FavouriteRoutes from './routes/FavouriteRoutes.js'
const app = express();

//middelware
app.use(express.json());
app.use(cors());

//routes

app.use('/api/v1/favourite', FavouriteRoutes);

//rest api
app.get("/", (req, res) => {
    res.send({
        message: "hello developers"
    });
})

//Port
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
