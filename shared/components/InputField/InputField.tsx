import * as React from 'react';
import classes from "./input-field.module.scss";

export const InputField: React.FC<any> = ({ label, available }) => {

    return (
        <>
            <div className={classes.container}>
                <div className={classes["input-heading"]}>
                    <span className={classes["input-heading-label"]}>{label}</span>
                    <span className={classes["input-heading-available"]}>Available: {available}</span>
                </div>
                <div className={classes["input-body"]}>
                    <input
                        className={classes["input-body-text-field"]}
                        type="number"
                        placeholder='0'
                    />
                    <select
                        className={classes["input-body-select"]}
                    >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

            </div>
        </>
    )
}
