import { Button } from '@mui/material';
import type { NextPage } from 'next'
import { useWallet } from 'use-wallet'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const wallet = useWallet();

    const handleClick = async () => {
        const res = await wallet.connect("injected");
        console.log('result: ', res);
    }

    const handleDisconnect = async () => {
        await wallet.reset()
    }

    return (
        <div className={styles.container}>
            <Button onClick={handleClick} variant='contained'>Connect</Button>
            <Button onClick={handleDisconnect} variant='contained'>Disconnect</Button>
        </div>
    )
}

export default Home
