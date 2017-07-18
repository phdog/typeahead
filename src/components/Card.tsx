import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Dispatch } from 'redux';
import {
  selectSearchValue,
  getSearchData,
  selectFindData,
  selectIdFromPath
} from '../selectors';
import { edit, arrow } from '../style/img/';
import {
  triggerEdit,
  flushEdit,
  startAdd,
  stopAdd,
  flushSearch,
  pickSearch,
  editData,
  putData,
  fetchData,
  deleteData,
  newNode,
  postData } from '../actions';

import Buttons from './commons/buttons';

interface IState {
  id: string;
  value: {name: string, recipe: string};
  field: string;
  data: {};
  search: { mode: boolean, value: string };
  findData: [{}];
  loading: boolean;
  add: boolean;
  prevID: string;
}

interface DispatchProps {
  triggerEdit: Function;
  editData: Function;
  flushEdit: Function;
  putData: Function;
  fetchData: Function;
  deleteData: Function;
  flushSearch: Function;
  newNode: Function;
  startAdd: Function;
  stopAdd: Function;
  postData: Function;
  pickSearch: Function;
}

class Card extends React.Component<IState & DispatchProps, void> {

// Отрисовать иконку поля редактирование в разных режимах
  private renderIcon(form_field) {
    const { field, add } = this.props;
    if (field && field === form_field) {
      return <img src={arrow}/>
    } else if (add) {
      return null;
    } else {
      return <img src={edit}/>
    }
  }

// Отрисовать значение или поле для редактирования в разных режимах
  private renderField(form_field) {
    const { value, id, field, data, add, triggerEdit } = this.props;
    if (field && field === form_field || add) {
      return (
        <input
          onFocus={() => {triggerEdit(form_field)}}
          type='text'
          name={field}
          value={value[form_field]}
          onChange={this.handleInput}
          onKeyPress={this.handleKeyPress}
        />
      );
    } else {
      return value[form_field]
    }
  }

// Завершить редактирование при нажатии Enter
private handleKeyPress = (target) => {
  const { flushEdit } = this.props;
  if (target.charCode === 13) {
    flushEdit();
  }
}

// Изменение данных в Сторе
  private handleInput = (e) => {
    let { field, id, editData } = this.props;
    editData({
      id,
      field,
      value: e.target.value
    })
  }

// Переключение режима редактирования поля по клику на иконке
  private switchEdit = (form_field) => {
    const { field, triggerEdit } = this.props;
    if (field && field === form_field) {
      triggerEdit('')
    } else {
      triggerEdit(form_field)
    }
  }

// Переключение режима добавления нового элемента
  private addNew = () => {
    const { flushEdit, flushSearch, newNode, startAdd, stopAdd, add, id, pickSearch, prevID } = this.props;
    if (!add) {
      flushEdit();
      flushSearch();
      startAdd(id);
      newNode();
    } else {
      browserHistory.goBack();
      flushEdit();
      pickSearch(prevID);
      stopAdd();
    }
  }

  render() {
    const { search, putData, id, fetchData, deleteData, loading, add, postData } = this.props
    if  ((!search.mode && search.value && !loading) || add ) {
      return (
        <div className='card'>

        { add ? <Buttons
          mod1='__active'
          mod2='__disabled'
          name1='Add new'
          name2=''
          id={id}
          func1={this.addNew}
           /> :
          <Buttons
            mod1='__lite'
            mod2='__lite'
            name1='Add new'
            name2='Delete'
            id={id}
            func1={this.addNew}
            func2={deleteData} /> }

        <form>
        <table>
          <tbody>
            <tr>
              <td onClick={() => {this.switchEdit('name')}}>
                Name :
              </td>
              <td className='field'>
                {this.renderField('name')}
              </td>
              <td onClick={() => {this.switchEdit('name')}}>
                {this.renderIcon('name')}
              </td>
            </tr>
            <tr>
              <td onClick={() => {this.switchEdit('recipe')}}>
                Recipe :
              </td>
              <td className='field'>
                {this.renderField('recipe')}
              </td>
              <td onClick={() => {this.switchEdit('recipe')}}>
                {this.renderIcon('recipe')}
              </td>
            </tr>
            </tbody>
          </table>
      {add ? <Buttons
          mod1='__disabled'
          name1=''
          name2='Save'
          id={id}
          func2={postData} /> : <Buttons
              name1='Restore'
              name2='Save'
              id={id}
              func1={fetchData}
              func2={putData} />}
        </form>

        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  search: state.search,
  findData: selectFindData(state),
  id: selectIdFromPath(state),
  value: selectSearchValue(state),
  field: state.ui.field,
  data: getSearchData(state),
  loading: state.ui.loading,
  add: state.ui.add,
  prevID: state.ui.prevID
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
  triggerEdit: (field: string) => {dispatch(triggerEdit(field))},
  editData: (data: {}) => {dispatch(editData(data))},
  flushEdit: () => {dispatch(flushEdit())},
  putData: (payload: string) => {dispatch(putData(payload))},
  fetchData: () => {dispatch(fetchData())},
  deleteData: (id: string) => {dispatch(deleteData(id))},
  flushSearch: () => {dispatch(flushSearch())},
  newNode: () => {dispatch(newNode())},
  startAdd: (id: string) => {dispatch(startAdd(id))},
  stopAdd: () => {dispatch(stopAdd())},
  postData: (id: string) => {dispatch(postData(id))},
  pickSearch: (id: string) => {dispatch(pickSearch(id))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
