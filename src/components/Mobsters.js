import React, { Component } from 'react';
import { Icon } from 'antd';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import AddMobster from './AddMobster';


const SortableItem = SortableElement((item) => (
    <div style={{
        position: 'relative',
        width: '100%',
        display: 'block',
        padding: 10,
        backgroundColor: '#FFF',
        borderBottom: '1px solid #EFEFEF',
        boxSizing: 'border-box',
        WebkitUserSelect: 'none',
        zIndex: 100
    }}>
    {
        item.mobster.index === 0 ? <span><Icon style={{float:'left', fontSize:'200%', paddingRight:25}} type="desktop" /> <p style={{fontSize:20}}> {item.mobster.value } </p></span>
        : item.mobster.index === 1 ? <span><Icon style={{float:'left', fontSize:'200%', paddingRight:25}} type="notification" /> <p style={{fontSize:20}}> {item.mobster.value } </p></span>
        : <span><Icon style={{float:'left', fontSize:'200%', paddingRight:25}} type="user" /> <p style={{fontSize:20}}> {item.mobster.value } </p></span>
    }
    </div>
));

const SortableList = SortableContainer(({items}) => (
    <div style={{
        height: '465px',
        maxWidth: '500px',
        overflow: 'auto',
        backgroundColor: '#f3f3f3',
        border: '1px solid #EFEFEF',
        borderRadius: 3
    }}>
        {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} mobster={{value:value, index:index}} />
            )}
    </div>
));

export default class Mobsters extends Component {
    onSortEnd = ({oldIndex, newIndex}) => {
      let newArray = arrayMove(this.props.state.mobsters, oldIndex, newIndex);
      return this.props.actions.updateOrder(newArray);
    };
    render() {
        return (
          <div>
            <AddMobster {...this.props} />
            <SortableList items={this.props.state.mobsters} onSortEnd={this.onSortEnd} />
          </div>
        )
    }
}