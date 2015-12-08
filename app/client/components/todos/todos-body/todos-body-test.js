import 'app/client/components/test-helpers/jsdom-support.js';

import { assert } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'node-noop';
import TodosBody from './todos-body';

describe('Component: TodosBody', () => {
  const todos = [
    { text: 'Todo 1', complete: false },
    { text: 'Todo 2', complete: false },
    { text: 'Todo 3', complete: false },
    { text: 'Todo 4', complete: false }
  ];

  it('should display a list of todos', () => {
    const component = mount(
      <TodosBody todos={todos} removeTodo={noop} completeTodo={noop} />
    );
    const trComponents = component.find('tr');

    assert.lengthOf(trComponents, todos.length);
  });

  it(`should call 'removeTodo' when click on the delete button`, () => {
    const removeTodo = sinon.spy();
    const component = mount(
      <TodosBody todos={todos} removeTodo={removeTodo} completeTodo={noop} />
    );
    const trComponents = component.find('tr');

    trComponents.forEach((tr, index) => {
      const removeButton = tr.find('.btn-danger');
      removeButton.simulate('click');

      assert.ok(removeButton);
      assert(removeTodo.called);
      assert(removeTodo.calledWith(index));
    });
    assert.equal(removeTodo.callCount, todos.length);
  });

  it(`should call 'completeTodo' when click on the complete button`, () => {
    const completeTodo = sinon.spy();
    const component = mount(
      <TodosBody todos={todos} removeTodo={noop} completeTodo={completeTodo} />
    );
    const trComponents = component.find('tr');

    trComponents.forEach((tr, index) => {
      const completeButton = tr.find('.btn-success');
      completeButton.simulate('click');

      assert.ok(completeButton);
      assert(completeTodo.called);
      assert(completeTodo.calledWith(index));
    });
    assert.equal(completeTodo.callCount, todos.length);
  });
});
