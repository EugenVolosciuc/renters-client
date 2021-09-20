import { Row, Col } from "antd"
import { FC, ReactNode } from "react"

import styles from 'components/misc/CardTitle/CardTitle.module.less'

type Props = {
    title: string | ReactNode,
    extra?: ReactNode
}

const CardTitle: FC<Props> = ({ title, extra }) => {
    return (
        <Row justify="space-between" align="middle">
            <Col>
                {typeof title === 'string'
                    ? <p className={styles.title}>{title}</p>
                    : title
                }
            </Col>
            {extra &&
                <Col>
                    {extra}
                </Col>
            }
        </Row>
    )
}

export default CardTitle
