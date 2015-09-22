import R from 'ramda';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDataEnhancer from './../helpers/fetch-data-enhancer';
import TodosAdd from './../todos/todos-add/todos-add';
import TodosHeader from './../todos/todos-header/todos-header';
import TodosBody from './../todos/todos-body/todos-body';
import { addTodo, removeTodo, completeTodo, fetchTodos } from 'app/client/actions/todos';

@fetchDataEnhancer(store => store.dispatch(fetchTodos()))
@connect(R.pick(['todos']), (dispatch) => {
  return {
    actions: bindActionCreators({
      addTodo,
      removeTodo,
      completeTodo,
      fetchTodos
    }, dispatch)
  };
})
class Todos extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <TodosHeader />
          <TodosAdd addTodo={this.props.actions.addTodo} />
          <TodosBody todos={this.props.todos}
            removeTodo={this.props.actions.removeTodo}
            completeTodo={this.props.actions.completeTodo} />
        </div>
      </div>
    );
  }
}

export default Todos;