import Logger from '@harmonyjs/logger'
import EncryptionService from 'services/encryption'

const logger = Logger({
    name: 'AccountLogin',
    configuration: {
        console: true,
    },
})

const LoginRoute = async (server : any, opts : any, next: () => void) => {
    server.route({
        method: 'POST',
        url: '/login',
        async handler(req: any, res: any) {
            const login = req.body.login
            const account = req.conf.account

            if (login !== account.email) {
                throw { statusCode: 401, error: 'Bad Request', message: 'user_not_found' }
            }

            if (EncryptionService.comparePassword({ password: req.body.password, salt: account.id, encrypted: account.password })) {
                const payload = { userId: account.id, name: account.name, isAdmin: false }
                const token = server.jwt.sign({ payload })

                return { token }
            } else {
                throw { statusCode: 401, error: 'Bad Request', message: 'wrong_credentials' }
            }
        },
    })
    next()
}

export default LoginRoute
