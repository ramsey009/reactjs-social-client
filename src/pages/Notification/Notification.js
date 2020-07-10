import React from 'react'
import PropTypes from 'prop-types'

const Notification = ()  => {


    console.log(window.location)

    var endpoint = ''
    var wsStart = 'ws://' + window.location.host + window.location.pathname
    var socket = new WebSocket(wsStart)

    socket.onmessage = function(e){
        console.log("message", e)
        console.log("abhishek======================>")
    }
    socket.onclose = function(e){
        console.log("open", e)
    }
    socket.onopen= function(e){
        console.log("close", e)
    }
    socket.onerror = function(e){
        console.log("error", e)
    }




    return (
        <div>
            <h1>
            this is notification page


            </h1>
            <h1>
            this is notification page


            </h1>
            <h1>
            this is notification page


            </h1>
            <h1>
            this is notification page


            </h1>
        </div>
    )
}

Notification.propTypes = {

}

export default Notification
