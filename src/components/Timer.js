import React, { Component } from 'react';
import { Card, message } from 'antd';
import ReactCountdownClock from 'react-countdown-clock';

export default class Timer extends Component {
    shouldComponentUpdate(newProps)
    {
        if(newProps.state.mobsters[0] !== this.props.state.mobsters[0]) {
            this.props = newProps;
            return true;
        }
        if(newProps.state.isSwitching !== this.props.state.isSwitching) {
            this.props = newProps;
            return true;
        }
        if(newProps.state.isPlaying !== this.props.state.isPlaying) {
            this.props = newProps;
            return true;
        }
        return false;
    }
    
    onPlay = (props) => {
        if(props.state.mobsters.length < 1) {
            message.info('Need to add some mobsters to start the mob.');
            return this.onReset();
        }
        this.props.actions.updateState({isPlaying: true, isSwitching: false});

    }

    onStart = () => {
        if(this.props.state.mobsters.length < 1) {
            message.info('Need to add some mobsters to start the mob.');
            return this.onReset();
        }
        this.props.actions.updateState({isPlaying: false, isSwitching: true});
    }

    onFinish = () => {
        this.onStart();
        this.props.actions.switchNext();
    }

    onReset = () => {
        this.props.actions.updateState({isPlaying: false, isSwitching: false});
    }

    render() {
    let timer = this.props.state.isPlaying && !this.props.state.isSwitching
                ? <ReactCountdownClock 
                    style={styles.countdown}
                    seconds={this.props.state.setting.mobDuration * 60}
                     color="black"
                     alpha={0.9}
                     size={300}
                    onComplete={this.onFinish} /> 
                : this.props.state.isSwitching && !this.props.state.isPlaying
                ? <ReactCountdownClock 
                     style={styles.countdown}
                     seconds={this.props.state.setting.waitDuration}
                     color="black"
                     alpha={0.9}
                     size={300}
                    onComplete={(e) => this.onPlay(this.props)} /> 
                : null;
    let backgroundColor = this.props.state.isPlaying 
                ? 'green'
                : this.props.state.isSwitching
                ? 'yellow'
                : 'red';

    return (
    <Card style={{background:backgroundColor, height: '465px'}}>
            {!this.props.state.isPlaying && !this.props.state.isSwitching ? <button style={{
                backgroundColor: 'Transparent',
                backgroundRepeat:'no-repeat',
                border: 'none',
                cursor:'pointer',
                overflow: 'hidden',
                fontSize: 45,
                outline:'none',
                width: '300px',
                height:'74vh'}} onClick={(e) => this.onStart()}>Press to Start...</button> : null}
            {timer}
         </Card>
        );
    }
}
// when the timer revs up a version, add in the pausing.
//  paused={true}
//  pausedText='▐▐'

const styles = {
    countdown: {
        padding: 0,
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
}