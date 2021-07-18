import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import './infoBox.css';

function InfoBox({ title, cases, isRed, active, total, ...props }) {
    return (

        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} `}
         onClick={props.onClick}
         >
            <CardContent className="infoBox__CardContent">
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className="infoBoxCard__cases">{cases}</h2>

                <Typography className="infoBoxCard__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>

    )
}

export default InfoBox
