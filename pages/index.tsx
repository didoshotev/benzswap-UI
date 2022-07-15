import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>BenzSwap Blockchain Services</title>
                <meta name="description" content="Blockchain Services" />
            </Head>
        </div>
    )
}

export default Home
