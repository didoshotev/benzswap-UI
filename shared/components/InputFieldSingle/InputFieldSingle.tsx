import Image from 'next/image'
import * as React from 'react'
import classes from './input-field-single.module.scss'

export const InputFieldSingle: React.FC<any> = ({ available, tokenName, tokenImgPath }) => {
    // /images/ether-logo.png
    return (
        <>
            <div className={classes.container}>
                <div className={classes['input-heading']}>
                    <span className={classes['input-heading-available']}>
                        Available: {available}
                    </span>
                </div>
                <div className={classes['input-body']}>
                    <div className={classes['input-body-field']}>
                        <input
                            className={classes['input-body-field-text']}
                            type="number"
                            placeholder="0.0"
                        />
                    </div>
                    <div className={classes['input-body-max']}>MAX</div>
                    <div className={classes['input-body-token']}>
                        <Image src={tokenImgPath} width={30} height={30} alt={tokenName} />
                        <span className={classes['input-body-token-label']}>{tokenName}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
