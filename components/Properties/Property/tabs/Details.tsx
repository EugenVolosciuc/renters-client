import React, { FC } from 'react'

import { Property } from 'types/Property'

type Props = {
    property: Property
}

const DetailsTab: FC<Props> = ({ property }) => {
    return (
        <div>
            Details
        </div>
    )
}

export default DetailsTab
