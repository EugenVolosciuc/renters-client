import { FC, ReactNode } from 'react'
import { Row, Col, Typography } from 'antd'

import LabelValuePresentation from 'components/misc/info-presentation/LabelValuePresentation'
import { AnyEntity } from 'types/misc'

export type RenderFunc = (value: unknown) => string | number | ReactNode

export type EntityInfoStructure = {
    key: string,
    label: string | number | ReactNode,
    direction?: 'horizontal' | 'vertical',
    valueAsLabel?: boolean
    render?: RenderFunc
}

type Props = {
    entityInfoStructureList: EntityInfoStructure[],
    entity: AnyEntity,
    title?: string
}

const { Title } = Typography

const EntityInfoDisplay: FC<Props> = ({ entity, entityInfoStructureList, title }) => {
    return (
        <Row gutter={[8, 8]}>
            {title &&
                <Col>
                    <Title level={4}>{title}</Title>
                </Col>
            }
            {entityInfoStructureList.map(({ key, label, render, direction, valueAsLabel }) => {
                const hasCustomRender = !!render

                const initValue = (entity as Record<string, any>)[key]

                const value = hasCustomRender
                    ? (render as RenderFunc)(initValue)
                    : initValue

                return <Col span={24} key={`${key}-${label}`}>
                    <LabelValuePresentation
                        label={valueAsLabel ? value : label}
                        value={valueAsLabel ? undefined : value}
                        direction={direction}
                    />
                </Col>
            })}
        </Row>
    )
}

export default EntityInfoDisplay
