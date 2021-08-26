import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
    return (
        <div>
            <Link href="/auth/login" passHref><a>To Login Page</a></Link>
        </div>
    )
}

export default Home
