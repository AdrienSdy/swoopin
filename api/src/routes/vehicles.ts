import Logger from '@harmonyjs/logger'
import VehicleService from 'services/vehicle'

const logger = Logger({
    name: 'AccountLogin',
    configuration: {
        console: true,
    },
})

const VehiclesRoute = async (server : any, opts : any, next: () => void) => {
    server.route({
        method: 'GET',
        url: '/vehicles',
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            vehicle: { type: 'string' },
                            speed: { type: 'string' },
                            temperature: { type: 'string' },
                            plate: { type: 'string' },
                            online: { type: 'boolean' },
                            location: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                },
                            },
                        },
                    },
                },
            },
        },
        preHandler: server.auth([server.authenticateAccount]),
        async handler(req: any, res: any) {
            return VehicleService.getDrivers()
        },
    })
    next()
}

export default VehiclesRoute
