import React, { Component } from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { Button } from "grommet";

class LogoutButton extends Component {
  onLogout = () => {
    auth.signOut();
    this.props.dispatch({
      type: "LOGOUT",
      payload: {
        authenticated: false,
        userEmail: null
      }
    });
  };

  render() {
    return <Button onClick={this.onLogout} label="Logout" />;
  }
}

export default connect()(LogoutButton);