import express from 'express'
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import { initDB  } from './db/db.js';
dotenv.config();
import minimist from 'minimist'
import miRouter from './routes/index.js'
import { loginFunction, signUpFunction } from './services/auth.js';
import { logger } from "./config/logs.js";

const app = express()
app.use(express.json())

await initDB()

const ttlSeconds = 180
console.log(process.env.DB);
const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.DB
        // dbName: 'CODERHOUSE'

    }),
    secret: 'mysecret',
    resave: false,
    saveUninitialized : false,
    cookie: {
        maxAge : ttlSeconds * 1000
    }

}

// MONGO_URL = mongodb+srv://julioignaciootero:luna0182@cluster0.4ysv2.mongodb.net/?retryWrites=true&w=majority
// DB = CODERHOUSE

app.use(session(StoreOptions))
app.use(passport.initialize())
app.use(passport.session())

// passport.use('login', loginFunction)
passport.use('signup', signUpFunction)
app.use('/api', miRouter)


//YARGS
const optArgumentos = {
    alias: {
        p: 'puerto'
    },
    default: {
        p: 8080
    }

}

const args = minimist(process.argv.slice(2), optArgumentos)
const argumentos = {
    otros: args._,
    puerto : args.puerto
}


app.use((req, res, next) => {
    logger.warn(`Ruta desconocida ${req.originalUrl}` )
    res.status(404).send("<h1>Not found</h1>")
})


app.listen(argumentos.puerto, () => {

    console.log(`Servidor corriendo en: ` , argumentos.puerto);
    

})