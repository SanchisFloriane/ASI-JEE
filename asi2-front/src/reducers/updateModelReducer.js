var Tools = require('../services/Tools.js');

const updateModelReducer= (state={presentation:{},content_map:{}},action) => {
  switch (action.type) {
    case 'UPDATE_PRESENTATION':
      return Object.assign({}, state, {
        presentation: action.obj
      })
    case 'UPDATE_PRESENTATION_SLIDS':
      return Object.assign({}, state, {
        presentation: {
          slidArray: state.presentation.slidArray.map((slid) => {
            if (slid.id === action.obj.id) {
              return Object.assign({}, slid, {
                title: action.obj.title,
                txt: action.obj.txt,
                content_id: action.obj.content_id
              })
            }
            return slid;
          })
        }
      })
    case 'UPDATE_CONTENT_MAP':
      return Object.assign({}, state, {
        content_map: action.obj
      })
    case 'ADD_CONTENT':
      let uuid = Tools.generateUUID();
      return Object.assign({}, state, {
        content_map: Object.assign({}, state.content_map, {
          [uuid]: {
            id: uuid,
            title: action.obj.title,
            type: action.obj.type,
            src: action.obj.src,
          }
        })
      });
    default:
      return state;
  }
}

export default updateModelReducer;
