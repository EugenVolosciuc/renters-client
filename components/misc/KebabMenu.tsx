import { FC, ReactElement } from 'react'
import { Menu, Dropdown, Typography, Button } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

type MenuType = ReactElement<Menu>

type Props = {
    title?: string,
    menu: MenuType
}

const { Text } = Typography

const KebabMenu: FC<Props> = ({ title, menu }) => {
    return (
        <Dropdown overlay={menu}>
            <div style={{ cursor: 'pointer' }}>
                {title && <Text>{title}</Text>}
                <MoreOutlined />
            </div>
        </Dropdown>
    )
}

export default KebabMenu
