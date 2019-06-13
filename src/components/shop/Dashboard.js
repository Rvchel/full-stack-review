import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.props.getUser()
    }


    render() {
        return (
            <div>
                Dashboard
            </div>
        )
    }
}


//bring props into from reducer, map 
const mapStateToProps = reduxState => {
    const {user} = reduxState
    return{
        user
    }
}


//high order component
export default connect(
    mapStateToProps,
    {getUser}
)(Dashboard)