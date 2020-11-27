import * as dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'

// author
const AUTHOR: string = process.env.AUTHOR || 'drinking-morning'

// couchdb
const COUCH_NAME: string = process.env.COUCH_NAME || 'xxx'

// application
const NAME: string = process.env.NAME || 'drinkingmorning'
const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#bae7ff'
const DOMAIN: string = process.env.DOMAIN || ''
const PORT: number = +process.env.PORT || 11561
const END_POINT: string = process.env.END_POINT || `graphql${NAME}`
const VOYAGER: string = process.env.VOYAGER || 'voyager'
const FE_URL: string = process.env.FE_URL || 'xxx'
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 4

// static
const STATIC: string = process.env.STATIC || 'static'

// mongodb
const MONGO_PORT: number = +process.env.MONGO_PORT || 27017
const MONGO_NAME: string = process.env.MONGO_NAME || NAME
console.log(process.env.MONGO_URL)
const MONGO_URL: string =
	process.env.MONGO_URL || `mongodb://localhost:${MONGO_PORT}/${MONGO_NAME}`
	
// jsonwebtoken
const ISSUER: string = process.env.ISSUER || 'http://vuongvx.github.io'
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token'
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'secrect'
const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token'
const EMAIL_TOKEN_SECRET: string =
	process.env.EMAIL_TOKEN_SECRET || 'email-token-key'

// bcrypt
const SALT: number = +process.env.SALT || 10

// AES Encryption
const AES_KEY = 'C49DE1F7D6E180C2CA8276A40F7E8310'
const AES_IV = 'EF647D15A35292C74651407A74801D43'

export {
	NODE_ENV,
	AUTHOR,
	COUCH_NAME,
	NAME,
	PRIMARY_COLOR,
	DOMAIN,
	PORT,
	END_POINT,
	VOYAGER,
	FE_URL,
	RATE_LIMIT_MAX,
	GRAPHQL_DEPTH_LIMIT,
	STATIC,
	MONGO_URL,
	MONGO_PORT,
	MONGO_NAME,
	ISSUER,
	ACCESS_TOKEN,
	ACCESS_TOKEN_SECRET,
	EMAIL_TOKEN,
	EMAIL_TOKEN_SECRET,
	SALT,
	AES_KEY,
	AES_IV
}