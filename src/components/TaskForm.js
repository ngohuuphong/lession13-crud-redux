import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    componentWillMount(){
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            this.setState({
               id: this.props.itemEditing.id, 
               name: this.props.itemEditing.name,
               status: this.props.itemEditing.status
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
        if(nextProps && nextProps.itemEditing){
            this.setState({
               id: nextProps.itemEditing.id, 
               name: nextProps.itemEditing.name,
               status: nextProps.itemEditing.status
            });
        }else if(nextProps && nextProps.itemEditing === null){
            this.onClear();
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name==='status'){
            value = target.value === 'true'? true:false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) =>{
        event.preventDefault();
        
        this.props.onSaveTask(this.state);
        // close form & cancle
        this.onClear();
        this.onCloseForm();
    }

    onClear = () =>{
        this.setState({
            id: '',
            name: '',
            status: false
        });
    }

    render() {
        var { id } = this.state;
        if(!this.props.isDisplayForm) return '';
        return (
      		<div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id?'Update Job':'Add Job'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                        >
                        </span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                name="name"
                                className="form-control"
                                value={this.state.name} 
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            name="status"
                            className="form-control"
                            value={this.state.status} 
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Save</button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch,props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () =>{
            dispatch(actions.closeForm());
        },
        onToggleForm : () =>{
            dispatch(actions.toggleForm());
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
