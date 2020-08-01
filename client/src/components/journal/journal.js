import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import compose from "recompose/compose";
import {
  editJournal,
  updateTitle,
  addNewJournalData,
  updateJournalData,
  clearJournal,
} from "../../actions/journalActions";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./journal.css";
import JournalImage from "./journalImage";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { loadUserData } from "../../actions/userActions";
import Footer from "../footer/footer";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textAlign: "left",
    // width: "100%",
    textTransform: "capitalize",
    justifyContent: "left", // aligns button to left of container
    fontSize: "16px",
  },
    copyright: {
        paddingTop: theme.spacing(3),
    }
});

class Journal extends React.Component {
  componentWillUnmount() {
    this.props.clearJournal();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{ margin: "5%" }}>
          &nbsp;
          <form noValidate autoComplete="off" style={{ marginBottom: "5%" }}>
            <TextField
              id="standard-basic"
              label="Title"
              fullWidth
              value={this.props.editorData.title}
              onChange={(e) => this.props.updateTitle(e.target.value)}
            />
          </form>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={9}>
              <CKEditor
                editor={ClassicEditor}
                data={this.props.editorData.initialData}
                // onInit={(editor) => {
                //                 //   // You can store the "editor" and use when it is needed.
                //                 //   console.log("Editor is ready to use!", editor);
                //                 // }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.props.editJournal(data);
                  console.log({ event, editor, data });
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <JournalImage />
            </Grid>
          </Grid>
          {this.props.editorData._id.length === 0 ? (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.addNewJournalData(
                  this.props.editorData,
                  this.props.userInfo
                );
                this.props.history.push("/journalView");
              }}
            >
              Submit Journal
            </Button>
          ) : (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.updateJournalData(this.props.editorData);
                this.props.history.push("/journalView");
              }}
            >
              Update Journal
            </Button>
          )}
        <div className={classes.copyright}>
          <Footer/>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //name is by convention
  return {
    editorData: state.journalEditorStore,
    userInfo: state.userStore,
    darkMode: state.colorStore,
  }; //now it will appear as props
};

export default compose(
  withStyles(useStyles),
  withRouter,
  connect(mapStateToProps, {
    editJournal,
    updateTitle,
    addNewJournalData,
    updateJournalData,
    loadUserData,
    clearJournal,
  })
)(Journal);
