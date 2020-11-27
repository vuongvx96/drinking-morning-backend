import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'
import * as chalk from 'chalk'
import { getConnection } from 'typeorm'

// import { MyLogger } from '@config'

import {
  ValidationPipe,
  LoggingInterceptor,
  TimeoutInterceptor,
  LoggerMiddleware
} from '@common'

import { NODE_ENV, PRIMARY_COLOR, DOMAIN, PORT, END_POINT, VOYAGER, RATE_LIMIT_MAX, STATIC, FE_URL } from '@environments'

declare const module: any

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
			cors: {
				origin: FE_URL,
				credentials: true
      },
      // cors: true
      // logger: new MyLogger()
    })
    // NOTE: database connect
    const connection = getConnection('default')
    const isConnected = connection
    isConnected
      ? Logger.log(`🌨️  Database connected`, 'TypeORM', false)
      : Logger.error(`❌  Database connect error`, '', 'TypeORM', false)

    // NOTE: added sercurity
    app.use(helmet())

    // NOTE: LoggerMiddleware
    NODE_ENV !== 'testing' && app.use(LoggerMiddleware)

    // NOTE: body parser
    app.use(
      bodyParser.json({
        limit: '50mb'
      })
    )
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000
      })
    )

    // NOTE: rateLimit
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60,
        max: RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs,
        message: '⚠️  Too many request created from this IP, please try again after an hour'
      })
    )

    // NOTE: voyager
    NODE_ENV !== 'production' &&
      app.use(
        `/${VOYAGER!}`,
        voyagerMiddleware({
          displayOptions: {
            skipRelay: false,
            skipDeprecated: false
          },
          endpointUrl: `${END_POINT!}`
        })
      )

      // NOTE: interceptors
      app.useGlobalInterceptors(new LoggingInterceptor())
      app.useGlobalInterceptors(new TimeoutInterceptor())

      // NOTE: global nest setup
      app.useGlobalPipes(new ValidationPipe())

      app.enableShutdownHooks()

      // NOTE: size limit
      app.use('*', (req, res, next) => {
        const query = req.query.query || req.body.query || ''
        if (query.length > 2000) {
          throw new Error('Query too large')
        }
        next()
      })

      // NOTE: serve static
      app.useStaticAssets(join(__dirname, `../${STATIC}`))

      const server = await app.listen(PORT!)

      // NOTE: hot module replacement
      if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
      }

      NODE_ENV !== 'production'
      ? Logger.log(
        `🚀  Server ready at http://${DOMAIN!}:${chalk
          .hex(PRIMARY_COLOR!)
          .bold(`${PORT!}`)}/${END_POINT!}`,
        'Bootstrap'
      )
    : Logger.log(
        `🚀  Server is listening on port ${chalk
          .hex(PRIMARY_COLOR!)
          .bold(`${PORT!}`)}`,
        'Bootstrap'
      )

      NODE_ENV !== 'production' &&
			Logger.log(
				`🚀  Subscriptions ready at ws://${DOMAIN!}:${chalk
					.hex(PRIMARY_COLOR!)
					.bold(`${PORT!}`)}/${END_POINT!}`,
				'Bootstrap'
			)


  } catch (error) {
		Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false)
		process.exit()
  }
}

bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false)
	throw e
})
