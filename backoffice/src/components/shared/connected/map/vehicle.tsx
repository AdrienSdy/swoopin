import React from 'react'
import { observer } from 'mobx-react'

import { classNamesPrefix } from 'utils/react'

import './vehicle.scss'

const block = 'vehicle'
const cx = classNamesPrefix(block)

type DriverProps = {
    id: string,
    name: string,
    vehicle: string,
    plate: string,
    speed: number,
    temperature: number,
    online: boolean,
}

const Vehicle = observer(({ id, name, vehicle, plate, speed, temperature, online }
: DriverProps) => {

    return (
        <div className={[block, cx({ '--online': online })].join(' ')}>
            <div className={cx('__vehicle-name')}>
                {name}
            </div>
            <div className={cx('__vehicle-description')}>
                {vehicle} ({plate})
            </div>

            <div>{speed} km/h -  {temperature} °C</div>
        </div>
    )
})

export default Vehicle