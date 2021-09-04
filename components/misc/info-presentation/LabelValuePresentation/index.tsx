import React, { FC, ReactNode } from 'react'
import { Row, Col, Typography } from 'antd'

import styles from 'components/misc/info-presentation/LabelValuePresentation/LabelValuePresentation.module.less'

type Props = {
    label: string | number | ReactNode,
    value?: string | number | ReactNode,
    direction?: 'horizontal' | 'vertical'
}

const { Paragraph } = Typography

const horizontalProps = { flex: 1 }
const verticalProps = { span: 24 }

const LabelValuePresentation: FC<Props> = ({ label, value, direction = 'horizontal' }) => {
    const isHorizontal = direction === 'horizontal'
    const colProps = isHorizontal ? horizontalProps : verticalProps

    const labelStyles = `${styles.label} ${isHorizontal ? '' : styles.vertical}`
    const valueStyles = `${styles.value} ${isHorizontal ? '' : styles.vertical}`

    return (
        <Row gutter={[4, 4]}>
            <Col {...colProps}>
                {typeof label === 'string' || typeof label === 'number'
                    ? <Paragraph className={labelStyles}>{label}</Paragraph>
                    : label
                }
            </Col>
            {value &&
                <Col {...colProps}>
                    {typeof value === 'string' || typeof value === 'number'
                        ? <Paragraph className={valueStyles}>{value}</Paragraph>
                        : value
                    }
                </Col>
            }
        </Row>
    )
}

export default LabelValuePresentation
