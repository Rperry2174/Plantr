import axios from 'axios';
import { connect } from 'react-redux';
import GardenGrid from '../GardenSquareGrid/GardenGrid';
import GardenSquareGridView from '../GardenSquareGrid/getGardenSquareGrid';
import IndividualGarden from './IndividualGarden';
import IndividualGardenInfo from './IndividualGardenInfo';
import PlantGrid from '../GardenSquareGrid/PlantGrid';
import React, { Component } from 'react';
import { setSuggestedPlants, setSuggestedGarden, setDropdownStatus } from '../Actions/GardenActions.js';
import { Stage } from 'react-konva';

class RecentGardens extends Component {
  constructor() {
    super()
      this.state = {
        gardenGrid: [],
        plantGrid: [],
        dropdownStatus: false,
        userGardens: [],
        gardenName: ''
      }
  }

  handleClick(){
    this.context.props.dispatchSetSuggestedPlants(this.plantGrid);
    this.context.props.dispatchSetSuggestedGarden(this.gardenGrid);
    this.context.setState({ gardenName: this.gardenName })
    this.context.props.dispatchSetDropdownStatus(this.context.props.dropdownStatus);
  }

  getUserGardens() {
    const profile = this.props.profile;
    axios.get('/api/gardens/' + profile.email).then((res) => {
      let personalGarden = res.data;
      for (let i = 0; i < personalGarden.length; i++) {
        let gardenObj = {
          gardenGrid: personalGarden[i].gardenGrid,
          plantGrid: personalGarden[i].plantGrid,
          profileEmail: personalGarden[i].profileEmail,
          gardenName: personalGarden[i].gardenName,
          profilePicture: personalGarden[i].profilePicture
        }
        let newUserGarden = []
        newUserGarden.push(gardenObj)
        this.setState({userGardens: newUserGarden});
      }
    }).catch((err) => {
      console.error("There was a get request error on the client in User RecentGardens", err);
    });
  }

  componentDidMount() {
    this.getUserGardens();
  }

  render() {
    const profile = this.props.profile;
    const context = this;
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1 right userGarden">
          <div className="userGardenSpan">
            <div className="userRecentSpan">Recent Gardens</div>
            <hr />
              {!this.props.dropdownStatus ? (
                  <div>
                    { this.state.userGardens.map((garden, i) => {
                      return (
                        <div className="container-fluid">
                          <IndividualGardenInfo
                            context={context}
                            gardenGrid={garden.gardenGrid}
                            gardenName={garden.gardenName}
                            nickname={profile.nickname}
                            onClick={this.handleClick}
                            plantGrid={garden.plantGrid}
                            profilePicture={garden.profilePicture}
                            ref={i}
                            />
                         </div>
                         )
                      }
                    )}
                  </div>
                ) : (
                 <div>
                   <h4 className="garden-name-active">{this.state.gardenName}</h4>
                   <div className="row">
                     <div className="col-md-2">
                       <div className="col-md-12 offset-md-3 postPicture" style={profilePic}></div>
                       <div className="row">
                         <div className="col-md-12 postUsername">{ this.props.nickname }</div>
                       </div>
                     </div>
                     <div>
                       <button onClick={() => this.props.dispatchSetDropdownStatus(this.props.dropdownStatus)}>Go Back to your Gardens</button>
                     </div>
                     <div className="row" onClick={ () => {this.handleClick}}>
                       <div className="col-mid-10 gardenName">
                         <div className="row">
                           <Stage width={500} height={500} fill="white" stroke="black" className="text-center">
                             <GardenGrid />
                             <PlantGrid />
                           </Stage>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
    dropdownStatus: state.gardenReducer.dropdownStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetSuggestedGarden(suggestedGarden){
      dispatch(setSuggestedGarden(suggestedGarden))
    },
    dispatchSetSuggestedPlants(suggestedPlants){
      dispatch(setSuggestedPlants(suggestedPlants))
    },
    dispatchSetDropdownStatus(dropdownStatus){
      dispatch(setDropdownStatus(dropdownStatus))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentGardens);
