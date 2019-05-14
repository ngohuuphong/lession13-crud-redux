import React, { Component } from 'react';
import TaskItem from './TaskItem';
import  {connect} from 'react-redux';
import * as actions from './../actions/index';
class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // all: -1 / active: 1 / deactive: 0        
        }
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name: name==='filterName'? value : this.state.filterName,
            status: name==='filterStatus'? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }
    render() {
        var {tasks, filterTable, keyword, sort} = this.props; // var tasks = this.props.tasks
        //filter
        if(filterTable.name){
            tasks = tasks.filter((task) =>{
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
            });
        }
        if(filterTable.status !== null){
            tasks = tasks.filter((task) =>{
                if(filterTable.status === -1){
                    return task;
                }else{
                    return task.status === (filterTable.status === 1?true:false);
                }
            });
        }
        //search
        tasks = tasks.filter((task) =>{
            return task.name.toLowerCase().indexOf(keyword) !== -1;
        });
        //sort
        if(sort.by === 'name'){
            tasks.sort( (a, b) =>{
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -sort.value;
                else return 0;
            });
        }else{
            tasks.sort( (a, b) =>{
                if(a.status > b.status) return sort.value;
                else if(a.status < b.status) return -sort.value;
                else return 0;
            });
        }
        //pull data
        var {filterName, filterStatus} = this.state;
        var elmTasks = tasks.map((task,index) =>{
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                    />
        });
        //render
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                name="filterName" 
                                value={filterName}
                                onChange={this.onChange}
                                type="text" 
                                className="form-control" 
                            />
                        </td>
                        <td>
                            <select 
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onChange} 
                                className="form-control"
                            >
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    {elmTasks}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        tasks : state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
