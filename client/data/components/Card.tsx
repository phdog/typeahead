import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectSearchValue, getSearchValue, getSearchData, selectFindData } from '../../search/selector';

import { triggerEdit, flushEdit } from '../../ui/actions';
import { editData } from '../actions';

interface IState {
  id: string;
  value: {name: string, recipe: string};
  field: string;
  data: {};
  search: { mode: boolean };
  findData: [{}];
}

interface DispatchProps {
  triggerEdit: Function;
  editData: Function;
  flushEdit: Function;
}

class Card extends React.Component<IState & DispatchProps, void> {

// Отрисовать иконку поля редактирование в разных режимах
  private renderIcon(field) {

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
    const { value, search } = this.props;
    return (
      !search.mode && value &&
      <form className='card'>
      <table>
      <tbody>
        <tr>
          <td onClick={() => {this.switchEdit('name')}} >Name</td>
          <td>{this.renderField('name')}</td>
          <td>{this.renderIcon('name')}</td>
        </tr>
        <tr>
          <td onClick={() => {this.switchEdit('recipe')}} >Recipe</td>
          <td>{this.renderField('recipe')}</td>
          <td>{this.renderIcon('recipe')}</td>
        </tr>
        </tbody>
      </table>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search,
  findData: selectFindData(state),
  id: getSearchValue(state),
  value: selectSearchValue(state),
  field: state.ui.field,
  data: getSearchData(state)
})

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
  triggerEdit: (field: string) => {dispatch(triggerEdit(field))},
  editData: (data: {}) => {dispatch(editData(data))},
  flushEdit: () => {dispatch(flushEdit())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);
