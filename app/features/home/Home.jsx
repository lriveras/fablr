import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { togglefbLoaded } from './home-actions';
import { bindActionCreators } from 'redux'

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  componentWillMount(props){

  }
  componentDidMount() {
    
  }
  render() {
      if(this.props.fbLoaded){
          return <button onClick={this.props.onPClick}>Welcome to Fablr</button>;
      } else {
          return <button onClick={this.props.onPClick}>loading...</button>;
      }
  }
}

// Home.propTypes = {
//   fbLoaded: PropTypes.bool.isRequired,
//   authenticated: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

const initialState = {fbLoaded: false, authenticated: false};

const mapStateToProps = ({fbLoaded = initialState.fbLoaded, authenticated = initialState.authenticated}) => ({
  fbLoaded: fbLoaded,
  authenticated: authenticated
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { fbLoaded = false, authenticated = false } = stateProps;
  const { dispatch } = dispatchProps;
  const actions = {
      onPClick: () => dispatch(togglefbLoaded(fbLoaded))
  };
  return Object.assign({},stateProps, ownProps, actions);
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Home)




