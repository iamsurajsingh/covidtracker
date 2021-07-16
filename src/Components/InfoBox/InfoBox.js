import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function InfoBox({ title, cases, total }) {
    return (
        <div className="infoBox">
            <Card className="infoBoxCard">
                <CardContent className="infoBox__CardContent">
                    <Typography className="infoBox__title" color="textSecondary">
                        {title}
                    </Typography>

                    <h2 className="infoBoxCard__cases">{cases}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>

    )
}

export default InfoBox
