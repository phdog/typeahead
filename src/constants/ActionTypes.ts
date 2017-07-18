// API SERVER
export const FETCH_DATA = 'fecth_data'; /* Загрузить данные с сервера */
export const PUT_DATA = 'put_data'; /* Изменить запись на сервере */
export const POST_DATA = 'post_data'; /* Отправить новые записи на сервер */

// REDUX STORE
export const PUSH_DATA = 'push_data'; /* Отправить доставленные данные в Стор */
export const EDIT_DATA = 'edit_data'; /* Редактирование значений в Сторе */
export const NEW_NODE = 'new_node'; /* Создание нового элемента */

// SEARCH
export const START_SEARCH = 'start_search';  /* Активировать режим поиска */
export const TRIGGER_SEARCH = 'trigger_search'; /* Новые значение поиска */
export const PICK_SEARCH = 'pick_search'; /* Выбор текущего элемента поиска */
export const STOP_SEARCH = 'stop_search'; /* Прекратить поиск, сохранить значение */
export const FLUSH_SEARCH = 'flush_search'; /* Обнулить состояние поиска */
export const SEARCH_UP = 'search_up'; /* Вверх по индексам найденах значений */
export const SEARCH_DOWN = 'search_down'; /* Вниз по индексам найденых значений */

// UI
export const REQ_SEND = 'request_send'; /* Начать сетевой запрос */
export const RES_RECIEVED = 'response_received'; /* Получен сетевой ответ */
export const TRIGGER_EDIT = 'trigger_edit'; /* Переключение режима редактирования */
export const FLUSH_EDIT = 'select_edit'; /* Сброс режима редактирования */
export const START_ADD = 'start_add'; /* Включить режим добавления нового элемента */
export const STOP_ADD = 'stop_add'; /* Включить режим добавления нового элемента */
