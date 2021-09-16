require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
const cors = require("cors");
const morgan = require("morgan");
const https = require('https');
const fs = require('fs');
const requestIp = require('request-ip');
const cors_proxy = require('cors-anywhere');
const passport = require('passport');
const setupFacebookPassport = require('./passport/facebook');
const setupGooglePassport = require('./passport/googleOAuth20');
const persistPassport = require('./passport/persistence');
const session = require("express-session");

const knexConfig = require("./knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexConfig);

const options = {
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
};

const app = express();
app.set('trust proxy', true);

const origin = [/localhost/];
const domain = process.env.DOMAIN.toString();
const regex = new RegExp(`${domain.replace(/\./g, "\\.")}$`);
origin.push(regex);

app.use(cors({
    origin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,X-CSRF-Token",
    exposedHeaders: "X-CSRF-Token",
    preflightContinue: false,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

setupFacebookPassport();
setupGooglePassport();
persistPassport();
app.use(session({
    secret: process.env.JWTSECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

morgan.token('remote-addr', req => requestIp.getClientIp(req));
app.use(morgan("combined", {
    skip: (req, res) => {
        let { originalUrl } = req;
        return originalUrl.toString().includes('api') === false;
    }
}));

const RegService = require("./services/RegService");
const RegRouter = require("./routers/RegRouter");

const regService = new RegService(knex);

app.use("/api/signup/", new RegRouter(regService).router());

// ^ csrf-ignore-required routes
// ------------------------------
// csrf-required routes

app.use(csrf({
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: false,
        domain: process.env.DOMAIN,
    }
}));

const AuthService = require("./services/AuthService");
const AuthRouter = require("./routers/AuthRouter");
const ManuService = require("./services/ManuService");
const ManuRouter = require("./routers/ManuRouter");
const AdminService = require("./services/AdminService");
const AdminRouter = require("./routers/AdminRouter");
const CompanyTypeService = require("./services/CompanyTypeService");
const CompanyTypeRouter = require("./routers/CompanyTypeRouter");
const CountryService = require("./services/CountryService");
const CountryRouter = require("./routers/CountryRouter");
const ImageService = require("./services/ImageService");
const ImageRouter = require("./routers/ImageRouter");
const SupplierService = require("./services/SupplierService");
const SupplierRouter = require("./routers/SupplierRouter");
const BrandService = require("./services/BrandService");
const BrandRouter = require("./routers/BrandRouter");
const CategoryService = require("./services/CategoryService");
const CategoryRouter = require("./routers/CategoryRouter");

const authService = new AuthService(knex);
const manuService = new ManuService(knex);
const adminService = new AdminService(knex);
const companyTypeService = new CompanyTypeService(knex);
const countryService = new CountryService(knex);
const imageService = new ImageService(knex);
const supplierService = new SupplierService(knex);
const brandService = new BrandService(knex);
const categoryService = new CategoryService(knex);

app.use("/api/login/", new AuthRouter(authService).router());
app.use("/api/manufacturer/", new ManuRouter(manuService).router());
app.use("/api/user/", new AdminRouter(adminService).router());
app.use("/api/companyType/", new CompanyTypeRouter(companyTypeService).router());
app.use("/api/country/", new CountryRouter(countryService).router());
app.use("/api/image/", new ImageRouter(imageService).router());
app.use("/api/supplier/", new SupplierRouter(supplierService).router());
app.use("/api/brand/", new BrandRouter(brandService).router());
app.use("/api/category/", new CategoryRouter(categoryService).router());

const proxy = cors_proxy.createServer({
    originWhitelist: [],
    requireHeaders: ['origin', 'x-requested-with'],
    removeHeaders: []
});

app.get('/api/geoplugin/:proxyUrl*', (req, res) => {
    req.url = req.url.replace('/api/geoplugin/', '/');
    if (req.url.indexOf('http://www.geoplugin.net/json.gp?ip=') === -1) {
        return res.status(403).send('Forbidden');
    }
    proxy.emit('request', req, res);
});

https.createServer(options, app).listen(process.env.PORT, function () {
    console.log(`app is listening to port ${process.env.PORT}`);
});