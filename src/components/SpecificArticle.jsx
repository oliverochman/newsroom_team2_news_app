import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Grommet, Button } from "grommet";
import { grommet } from "grommet/themes";

class SpecificArticle extends Component {
  componentDidMount() {
    if (this.props.currentUser === "subscriber") {
      this.props.dispatch({ type: "PREMIUM", payload: { premiumUser: true } });
    } else {
      this.props.dispatch({ type: "PREMIUM", payload: { premiumUser: false } });
    }
  }

  render() {
    let specArticle;
    let articleContent;
    let showContent;
    let trimmedArticle;

    if (this.props.readArticle) {
      specArticle = this.props.readArticle;

      if (
        (specArticle.article_class === "premium") &
        (this.props.premiumUser === false)
      ) {
        trimmedArticle = specArticle.content.substring(0, 200) + "...";
      }

      articleContent =
        specArticle.article_class === "free" || this.props.premiumUser
          ? specArticle.content
          : trimmedArticle;
    }
    showContent =
      specArticle.article_class === "free" || this.props.premiumUser ? (
        <>
          <div className="spec-content">
            <p>{articleContent}</p>
          </div>
          <div className="created-date">
            <p>Submitted on {specArticle.new_created_at}</p>
          </div>
        </>
      ) : (
        <>
          <div className="spec-content restricted">
            <p>{articleContent}</p>
          </div>
          <p>
            This article require a premium membership.{" "}
            <Button
              label="Buy Subscription"
              color="lightgreen"
              onClick={() =>
                this.props.dispatch({
                  type: "PAYMENT_FORM",
                  payload: { showPaymentForm: true }
                })
              }
            />
          </p>
        </>
      );

    return (
      <Grommet full theme={grommet}>
        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="medium"
          margin="medium"
          className="article"
          id={specArticle.id}
        >
          <div>
            <div className="spec-title">
              <h2>{specArticle.title}</h2>
            </div>
            {showContent}
          </div>
        </Box>
        <Box align="center">
          <Button
            type="submit"
            label="Back"
            onClick={() => this.props.dispatch({ type: "HIDE_ARTICLE" })}
          ></Button>
        </Box>
      </Grommet>
    );
  }
}

const mapStateToProps = state => {
  return {
    readArticle: state.readArticle,
    currentUser: state.currentUser,
    premiumUser: state.premiumUser
  };
};

export default connect(mapStateToProps)(SpecificArticle);
