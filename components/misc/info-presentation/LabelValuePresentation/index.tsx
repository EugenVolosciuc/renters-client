import React, { FC, ReactNode } from 'react'
import { Row, Col, Typography } from 'antd'
import { useTranslation } from 'next-i18next'

import styles from 'components/misc/info-presentation/LabelValuePresentation/LabelValuePresentation.module.less'

type Props = {
    label: string | number | ReactNode,
    value?: string | number | ReactNode,
    showUndefinedValue?: boolean
    direction?: 'horizontal' | 'vertical'
}

const { Paragraph } = Typography

const horizontalProps = { flex: 1 }
const verticalProps = { span: 24 }

const LabelValuePresentation: FC<Props> = ({ label, value, showUndefinedValue = true, direction = 'horizontal' }) => {
    const { t } = useTranslation()
    const isHorizontal = direction === 'horizontal'
    const colProps = isHorizontal ? horizontalProps : verticalProps

    const labelStyles = `${styles.label} ${isHorizontal ? '' : styles.vertical}`
    const valueStyles = `${styles.value} ${isHorizontal ? '' : styles.vertical}`

    const doNotShowComponent = !showUndefinedValue && !value

    if (doNotShowComponent) return null

    return (
        <Row gutter={[4, 4]}>
            <Col {...colProps}>
                {typeof label === 'string' || typeof label === 'number'
                    ? <Paragraph className={labelStyles}>{label}</Paragraph>
                    : label
                }
            </Col>
            {value
                ? <Col {...colProps}>
                    {typeof value === 'string' || typeof value === 'number'
                        ? <Paragraph className={valueStyles}>{value}</Paragraph>
                        : value
                    }
                </Col>
                : <Col {...colProps}>
                    <Paragraph className={valueStyles}>{t('common:not-specified')}</Paragraph>
                </Col>
            }
        </Row>
    )
}

export default LabelValuePresentation
