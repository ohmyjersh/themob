import reducer, {actionCreators as actions} from './index';

test('should add mobster', () => {
    var addMobster = actions.addMobster('jim bob');
    expect(reducer(undefined, addMobster)).toEqual(
        {
            add: "", 
            isPlaying: false, 
            isSwitching: false, 
            mobsters: ["jim bob"], 
            setting: {
                mobDuration: 5, 
                saveLocal: false,
                waitDuration: 5
            }, 
            showSettings: false
        })
    });

test('should update property on root state', () =>{
    var addMobster = actions.updateState({add:'a'});
    expect(reducer(undefined, addMobster)).toEqual( 
        {
            add: "a", 
            isPlaying: false, 
            isSwitching: false, 
            mobsters: [], 
            setting: {
                mobDuration: 5, 
                saveLocal: false,
                waitDuration: 5
            }, 
            showSettings: false
        });
});

test('should update order of mobsters', () =>{
    var addMobster = actions.updateOrder(["lol","butts","wat"]);
    expect(reducer(undefined, addMobster)).toEqual( 
        {
            add: "", 
            isPlaying: false, 
            isSwitching: false, 
            mobsters: ["lol","butts","wat"], 
            setting: {
                mobDuration: 5, 
                saveLocal: false,
                waitDuration: 5
            }, 
            showSettings: false
        });
});

test('should switch to next mobster', () =>{
    var addMobster = actions.switchNext();
    expect(reducer({
            add: "", 
            isPlaying: false, 
            isSwitching: false, 
            mobsters: ["lol","butts","wat"], 
            setting: {
                mobDuration: 5, 
                saveLocal: false,
                waitDuration: 5
            }, 
            showSettings: false
        }, addMobster)).toEqual( 
        {
            add: "", 
            isPlaying: false, 
            isSwitching: false, 
            mobsters: ["butts","wat","lol"], 
            setting: {
                mobDuration: 5, 
                saveLocal: false,
                waitDuration: 5
            }, 
            showSettings: false
        });
});