global.express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.SERVER_PORT;

global.app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(helmet.noCache());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secureProxy: app.SSL,
            secure: 'auto',
            maxAge: 1000 * 30000
        }
    })
);

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((request, response, next) => {
    console.info("**************" + request.url);
    next();
});


require('./router');
require('./middlewares/passport').initialize();

app.use((error, request, response, next) => {
    if (error.isBoom) {
        return response.status(error.output.statusCode).json(error.output.payload);
    } else {
        return response.status(400).json({ message: error });
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
});