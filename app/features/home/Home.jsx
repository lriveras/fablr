import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(props){

  }
  componentDidMount() {
    console.log("mounted");
  }
  render() {
      if(this.props.fbLoaded){
          return <button onClick={this.props.onPClick}>Welcome to Fablr</button>;
      } else {
          return <button onClick={this.props.onPClick}>loading...</button>;
      }
  }

//   static propTypes = {
//     fbLoaded: PropTypes.bool.isRequired,
//     authenticated: PropTypes.bool.isRequired,
//   }
}

const initialState = {fbLoaded: false, authenticated: false};

const togglefbLoaded = () => {
    return {type: 'LOGIN'}
};


const mapStateToProps = (state = initialState) => ({
  fbLoaded: state.fbLoaded,
  authenticated: state.authenticated
});

const mapDispatchToProps = (dispatch) => {
  return {
    onPClick: () => {
      dispatch(togglefbLoaded())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)




