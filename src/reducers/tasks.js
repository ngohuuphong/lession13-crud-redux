import * as types from './../constants/ActionTypes';
var s4 =() =>{
    return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1);
}
var randomID = () =>{
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4()+ "-" + s4() + s4() + s4();
}
var findIndex = (tasks, id) =>{
    var result = -1;
    tasks.forEach((task,index) =>{
        if(task.id===id){
            result =  index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) =>{
    var id = '';
    var index = -1;
    switch (action.type){
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var temp = {
                id : action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if(!temp.id){
                temp.id = randomID();
                state.push(temp);
            }else{
                index = findIndex(state, temp.id);
                state[index] = temp;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            //state[index].status = !state[index].status;
           
            // cach 1
            //var cloneTask = {...state[index]}
            //cloneTask.status = !cloneTask.status;
            //state[index] = cloneTask;
            // cach 2
            state[index] = {
                ...state[index],
                status: ! state[index].status
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        default: return state;
    }
};
export default myReducer;