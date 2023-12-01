import React from 'react'

const Alert = (props) => {
    return (
        <div style={{ height: "40px" }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alerti dismissable fade show`} role="alert">
                {props.alert.message}
            </div>}
        </div>
    )
}

export default Alert
