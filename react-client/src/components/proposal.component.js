import React, { Component } from "react";
import ProposalDataService from "../services/proposal.service";
import { withRouter } from '../common/with-router';

class Proposal extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTeamName = this.onChangeTeamName.bind(this);
    this.onChangeMember = this.onChangeMember.bind(this);
    this.onChangeThought = this.onChangeThought.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.getProposal = this.getProposal.bind(this);
    this.updateProposal = this.updateProposal.bind(this);
    this.deleteProposal = this.deleteProposal.bind(this);

    this.state = {
      currentProposal: {
        id: null,
        title: "",
        teamName: "",
        member: "",
        thought: "",
        fileName: "",
        filePath: ""
      },
      message: "",
      file: null
    };
  }

  componentDidMount() {
    this.getProposal(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function(prevState) {
      return {
        currentProposal: {
          ...prevState.currentProposal,
          title: title
        }
      };
    });
  }

  onChangeTeamName(e) {
    const teamName = e.target.value;
    this.setState(prevState => ({
      currentProposal: {
        ...prevState.currentProposal,
        teamName: teamName
      }
    }));
  }

  onChangeMember(e) {
    const member = e.target.value;
    this.setState(prevState => ({
      currentProposal: {
        ...prevState.currentProposal,
        member: member
      }
    }));
  }

  onChangeThought(e) {
    const thought = e.target.value;
    this.setState(prevState => ({
      currentProposal: {
        ...prevState.currentProposal,
        thought: thought
      }
    }));
  }

  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  getProposal(id) {
    ProposalDataService.get(id)
      .then(response => {
        this.setState({
          currentProposal: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProposal() {
    const formData = new FormData();
    formData.append('title', this.state.currentProposal.title);
    formData.append('teamName', this.state.currentProposal.teamName);
    formData.append('member', this.state.currentProposal.member);
    formData.append('thought', this.state.currentProposal.thought);
    if (this.state.file) {
      formData.append('file', this.state.file);
    }

    ProposalDataService.update(
      this.state.currentProposal.id,
      formData
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The proposal was updated successfully!",
          currentProposal: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProposal() {    
    ProposalDataService.delete(this.state.currentProposal.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/proposal');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProposal } = this.state;

    return (
      <div>
        {currentProposal ? (
          <div className="edit-form">
            <h4>Proposal</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProposal.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="teamName">Team Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="teamName"
                  value={currentProposal.teamName}
                  onChange={this.onChangeTeamName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="member">Member</label>
                <input
                  type="text"
                  className="form-control"
                  id="member"
                  value={currentProposal.member}
                  onChange={this.onChangeMember}
                />
              </div>
              <div className="form-group">
                <label htmlFor="thought">Thought</label>
                <input
                  type="text"
                  className="form-control"
                  id="thought"
                  value={currentProposal.thought}
                  onChange={this.onChangeThought}
                />
              </div>
              <div className="form-group">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="file"
                  onChange={this.onFileChange}
                />
              </div>
              {currentProposal.fileName && (
                <div className="form-group">
                  <label>Current File: </label>
                  <a href={`http://localhost:8080/${currentProposal.filePath}`} target="_blank" rel="noopener noreferrer">
                    {currentProposal.fileName}
                  </a>
                </div>
              )}
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProposal}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProposal}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Proposal...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Proposal);