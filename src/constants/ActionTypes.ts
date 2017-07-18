// DATA

export const FETCH_DATA = 'fecth_data'; /* Принести с сервера */
export const PUT_DATA = 'put_data'; /* Изменить запись на сервере */
export const POST_DATA = 'post_data'; /* Отправить новые записи на сервер */

export const PUSH_DATA = 'push_data'; /* Отправить доставленные данные в Стор */
export const EDIT_DATA = 'edit_data'; /* Редактирование значений */
export const NEW_NODE = 'new_node'; /* Создание нового элемента */

// SEARCH

export const START_SEARCH = 'start_search';
export const TRIGGER_SEARCH = 'trigger_search';
export const PICK_SEARCH = 'pick_search';
export const STOP_SEARCH = 'stop_search'; //прекратить поиск, сохранить значение
export const FLUSH_SEARCH = 'flush_search'; //обнулить состояние поиска
export const SEARCH_UP = 'search_up';
export const SEARCH_DOWN = 'search_down';

// UI

export const REQ_SEND = 'request_send'; /* Start network request */
export const RES_RECIEVED = 'response_received'; /* Network request ended with response */
export const TRIGGER_EDIT = 'trigger_edit'; /* Toggle editing mode */
export const FLUSH_EDIT = 'select_edit'; /* Turn off editing mode */
export const START_ADD = 'start_add'; /* Включить режим добавления нового элемента */
export const STOP_ADD = 'stop_add'; /* Включить режим добавления нового элемента */
