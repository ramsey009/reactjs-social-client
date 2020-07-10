import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {signUpEmailConfirmation} from "../../actions/auth"

const SignUpEmailComfirmation = ({match, auth_info, signUpEmailConfirmation}) => {

    console.log(match.params.token)

    useEffect(() => {

        console.log("00000000",match.params.token)


        signUpEmailConfirmation(match.params.token)

    }, [signUpEmailConfirmation]);

    return (
        <div>            
            <h1 style={{textAlign:"center"}}>{auth_info.auth_status}</h1>
            <div style={{textAlign:"center"}}>{auth_info.auth_status_detail} </div>
        </div>
    )
}

SignUpEmailComfirmation.propTypes = {
    signUpEmailConfirmation: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => {
    return {
       auth_info: state.auth.auth_info
   };
};

export default connect(mapStateToProps,{signUpEmailConfirmation})(SignUpEmailComfirmation)



