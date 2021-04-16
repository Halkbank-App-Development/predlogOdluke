import React from 'react'
import Alert from "react-bootstrap/Alert"

export default function CustomeAlert(props) {
    const setAlertClose = () => props.setAlertClose();
    if (props.show) {
        return (
            <Alert variant={props.alertVariant} onClose={() => setAlertClose(false)} dismissible>
                <Alert.Heading>{props.alertHeading}</Alert.Heading>
                <p>
                    {props.alertBody}
                </p>
            </Alert>
        );
    }
}