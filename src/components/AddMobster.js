import React, { Component } from 'react';
import { Input, message } from 'antd';

export default class AddMobster extends Component {
    addMobster(e) {
        if (e.key === 'Enter' && e.target.value !== '') {
            if(this.mobsterExists(this.props.state.mobsters, e.target.value)) {
                return message.info('That mobster already exists, make the names unique');
            }
            this.props.actions.addMobster(e.target.value);
            this.props.actions.updateState({add:''});

        }
    }
    mobsterExists = (mobsters, mobster) => {
        return mobsters.indexOf(mobster) > -1;
    }

    updateAdd(char){
        this.props.actions.updateState({add:char});
    }
    render() {
        return(
            <div>
                <Input style={{ marginBottom: 6 }} value={this.props.state.add} placeholder="Add Mobster" onChange={(e) => this.updateAdd(e.target.value)} onKeyPress={e => this.addMobster(e)} type="text" />
            </div>
        )
    }
}