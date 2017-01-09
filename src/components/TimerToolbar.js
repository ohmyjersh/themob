import React, { Component } from 'react';
import { Icon, Modal, Checkbox, Input } from 'antd';

export default class Timer extends Component {
  showModal = (status) => {
      this.props.actions.updateState({showSettings:status});
  }
  handleOk = () => {
    if(this.props.state.setting.saveLocal) 
    {
        localStorage.setItem('mobSettings', JSON.stringify(this.props.state.setting));
    }
    if(!this.props.state.setting.saveLocal && localStorage.getItem('mobSettings')){
        localStorage.removeItem('mobSettings');
    }
    this.showModal(false);
  }
  handleCancel = (e) => {
    this.showModal(false);
  }      
  onReset = () => {
      this.props.actions.updateState({isPlaying:false, isSwitching:false})
      this.props.actions.updateOrder([]);
  }
  onCheck = (e) => {
      this.props.actions.updateState({setting: {
        mobDuration:this.props.state.setting.mobDuration,
        waitDuration:this.props.state.setting.waitDuration,
        saveLocal:e.target.checked
      }});
  }

  onMobDurationChange = (duration) => {
      this.props.actions.updateState({setting: {
        mobDuration:duration,
        waitDuration:this.props.state.setting.waitDuration,
        saveLocal:this.props.state.setting.checked
      }});
  }

  onWaitDurationChange = (duration) => {
    this.props.actions.updateState({setting: {
        mobDuration:this.props.state.setting.mobDuration,
        waitDuration:duration,
        saveLocal:this.props.state.setting.checked
      }});
  }

render() { 
    return(
            <div style={{width:'100%', height:'25px', marginBottom: 8}}>
                <Icon style={{
                    float:'left',
                    color: '#000',
                    fontSize:'200%'}} onClick={this.onReset} type="reload" />
                <Icon style={{
                    float:'right',
                    color: '#000',
                    fontSize:'200%'}} onClick={(e) => this.showModal(true)} type="setting" />
                <Modal title="Settings" visible={this.props.state.showSettings}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    okText="OK" cancelText="Cancel"
                    >
    <div style={{ marginBottom: 16, marginTop:16}}><Input placeholder="Mob Duration (Minutes)" value={this.props.state.setting.mobDuration} onChange={(e) => this.onMobDurationChange(e.target.value)} /></div>
                        <div style={{ marginBottom: 16 }}><Input placeholder="Wait Period (Seconds)" value={this.props.state.setting.waitDuration} onChange={(e) => this.onWaitDurationChange(e.target.value)}/></div>
                        <div style={{ marginBottom: 16 }}><Checkbox value={this.props.state.setting.checked} onChange={this.onCheck}>Save settings to local storage</Checkbox></div>
                    </Modal>
            </div>
        )
    }
}