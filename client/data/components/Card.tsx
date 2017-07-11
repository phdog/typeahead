import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectSearchValue, getSearchValue, getSearchData, selectFindData } from '../../search/selector';
import { edit, arrow } from '../../style/img/';

import { triggerEdit, flushEdit } from '../../ui/actions';
import { editData, putData, fetchData, deleteData } from '../actions';

import Buttons from './Buttons';

interface IState {
  id: string;
  value: {name: string, recipe: string};
  field: string;
  data: {};
  search: { mode: boolean, value: string };
  findData: [{}];
  loading: boolean
}

interface DispatchProps {
  triggerEdit: Function;
  editData: Function;
  flushEdit: Function;
  putData: Function;
  fetchData: Function;
  deleteData: Function;
}

class Card extends React.Component<IState & DispatchProps, void> {

// Отрисовать иконку поля редактирование в разных режимах
  private renderIcon(form_field) {
    const { field } = this.props;
    if (field && field === form_field) {
      return <img src={arrow}/>
    } else {
      return <img src={edit}/>
    }
  }

// Отрисовать значение или поле для редактирования в разных режимах
  private renderField(form_field) {
    const { value, id, field, data } = this.props;
    if (field && field === form_field) {
      return (
        <input
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
    const { field, id, editData } = this.props;
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

  render() {
    const { search, putData, id, fetchData, deleteData, loading } = this.props
    if  (!search.mode && search.value && !loading) {
      return (
        <div className='card'>
        <Buttons
          mod='__lite'
          name1='Add new'
          name2='Delete'
          id={id}
          func1={putData}
          func2={deleteData} />

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
        <Buttons
          name1='Restore'
          name2='Save'
          id={id}
          func1={fetchData}
          func2={putData} />
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
  id: getSearchValue(state),
  value: selectSearchValue(state),
  field: state.ui.field,
  data: getSearchData(state),
  loading: state.ui.loading
})

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
  triggerEdit: (field: string) => {dispatch(triggerEdit(field))},
  editData: (data: {}) => {dispatch(editData(data))},
  flushEdit: () => {dispatch(flushEdit())},
  putData: (payload: string) => {dispatch(putData(payload))},
  fetchData: () => {dispatch(fetchData())},
  deleteData: (id: string) => {dispatch(deleteData(id))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);
