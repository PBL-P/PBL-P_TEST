import React, { Component } from "react";
import ProposalDataService from "../services/proposal.service";
import { Link } from "react-router-dom";

export default class Proposal extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveProposal = this.retrieveProposal.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProposal = this.setActiveProposal.bind(this);
    this.removeAllProposal = this.removeAllProposal.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.deleteProposal = this.deleteProposal.bind(this); // Delete 함수 바인딩

    this.state = {
      proposal: [],
      currentProposal: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveProposal();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveProposal() {
    ProposalDataService.getAll()
      .then(response => {
        this.setState({
          proposal: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProposal();
    this.setState({
      currentProposal: null,
      currentIndex: -1
    });
  }

  setActiveProposal(proposal, index) {
    this.setState({
      currentProposal: proposal,
      currentIndex: index
    });
  }

  removeAllProposal() {
    ProposalDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProposal(id) {
    ProposalDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.refreshList(); // 삭제 후 목록을 새로고침하여 반영
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentProposal: null,
      currentIndex: -1
    });

    ProposalDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          proposal: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, proposal, currentProposal, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Proposal List</h4>

          <ul className="list-group">
            {proposal &&
              proposal.map((proposal, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProposal(proposal, index)}
                  key={index}
                >
                  {proposal.title}
                  <button
                    className="btn btn-danger btn-sm float-right"
                    onClick={(e) => {
                      e.stopPropagation(); // 목록 항목 클릭과 충돌 방지
                      this.deleteProposal(proposal.id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProposal}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
        {currentProposal ? (
            <div>
              <h4>Proposal</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentProposal.title}
              </div>
              <div>
                <label>
                  <strong>Team Name:</strong>
                </label>{" "}
                {currentProposal.teamName}
              </div>
              <div>
                <label>
                  <strong>Member:</strong>
                </label>{" "}
                {currentProposal.member}
              </div>
              <div>
                <label>
                  <strong>Thought:</strong>
                </label>{" "}
                {currentProposal.thought}
              </div>
              {currentProposal.fileName && (
                <div>
                  <label>
                    <strong>Attached File:</strong>
                  </label>{" "}
                  <a href={`http://localhost:8080/${currentProposal.filePath}`} target="_blank" rel="noopener noreferrer">
                    {currentProposal.fileName}
                  </a>
                </div>
              )}
              <Link
                to={"/proposal/" + currentProposal.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Proposal...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
