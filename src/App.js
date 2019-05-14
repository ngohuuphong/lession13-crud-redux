import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import {connect} from 'react-redux';
import * as actions from './actions/index';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            taskEditing: null,
            keyword: '',
            sortBy: '',
            sortValue: 1
        }
    }
 
    onGenerateData = () => {
        var tasks = [
            {
                id: this.gererateID(),
                name: 'Học lập trình',
                status: true
            },
            {
                id: this.gererateID(),
                name: 'Đi bơi',
                status: false
            },
            {
                id: this.gererateID(),
                name: 'Ngủ',
                status: true
            }
        ];
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    
    onToggleForm = () =>{
        var { itemEditing } = this.props;
        if(itemEditing && itemEditing.id !== ''){
            this.props.onOpenForm();
        }else{
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
    }
    
    onShowForm = () =>{
        this.setState({
            isDisplayForm : true
        });
    }

    findIndex = (id) =>{
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task,index) =>{
            if(task.id===id){
                result =  index;
            }
        });
        return result;
    }

    onUpdate = (id) =>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing= tasks[index];
        this.onCloseForm();
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();
    }

    onSearch = (keyword) =>{
        this.setState({
            keyword: keyword
        });
    }
    onSort = (sortBy,sortValue) =>{
        this.setState({
           sortBy: sortBy,
           sortValue: sortValue
        });
    }
    render() {
        var {
            // keyword,
            sortBy,
            sortValue
        } = this.state; // var tasks = this.state.tasks

        var { isDisplayForm } = this.props;

        // if(sortBy === 'name'){
        //     tasks.sort( (a, b) =>{
        //         if(a.name > b.name) return sortValue;
        //         else if(a.name < b.name) return -sortValue;
        //         else return 0;
        //     });
        // }else{
        //     tasks.sort( (a, b) =>{
        //         if(a.status > b.status) return sortValue;
        //         else if(a.status < b.status) return -sortValue;
        //         else return 0;
        //     });
        // }
        
        return (
             <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4': ''}>
                        <TaskForm/> 
                    </div>
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8': 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick = {this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>

                        <Control 
                            onSearch={this.onSearch} 
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />

                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing: state.itemEditing
    };
};
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleForm : () =>{
            dispatch(actions.toggleForm());
        },
        onClearTask : (task) =>{
            dispatch(actions.editTask(task));
        },
        onOpenForm : () =>{
            dispatch(actions.openForm());
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
