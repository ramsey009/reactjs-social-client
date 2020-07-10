import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";

const AuthInfo = ({auth_info}) => {
    return (
        <div>
            <h1 style={{textAlign:"center"}}>{auth_info.auth_status}</h1>
            <div style={{textAlign:"center"}}>{auth_info.auth_status_detail} </div>
        </div>
    )
}

AuthInfo.propTypes = {
}

const mapStateToProps = (state) => {
     return {
        auth_info: state.auth.auth_info
    };
};

export default connect(mapStateToProps,{})(AuthInfo)
