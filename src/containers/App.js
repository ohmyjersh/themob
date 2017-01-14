import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import Timer from '../components/Timer';
import TimerToolbar from '../components/TimerToolbar';
import Mobsters from '../components/Mobsters';
import {connect} from 'react-redux';
import {actionCreators as actions} from '../reducers';
import {Card, Row, Col } from 'antd';

const Title = () => {
    return(
        <div>
            <h1 style={{float: 'left'}}>themob</h1>
        </div>
    )
}

class App extends Component {
  render() {
    return (
      <Card style={{
          textAlign: 'center',
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '800px',
          marginTop:'20px',
          height: '600px'}}>
          <Row span={24}>
          <Title {...this.props} />
          </Row>
          <Row>
            <Col span={12} style={{paddingRight:'10px'}}>
            <TimerToolbar {...this.props}/>
            <Timer {...this.props}/>
            </Col>
            <Col span={12} style={{paddingLeft:'10px'}}>
              <Mobsters {...this.props} />
            </Col>
          </Row>
        </Card>
    )
}}

function mapStateToProps(state) {
  return {state:state};
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: {
        addMobster: bindActionCreators(actions.addMobster, dispatch),
        updateOrder: bindActionCreators(actions.updateOrder, dispatch),
        switchNext: bindActionCreators(actions.switchNext, dispatch),
        updateState: bindActionCreators(actions.updateState, dispatch)
      }
    }
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);