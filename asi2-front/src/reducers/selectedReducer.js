const selectedReducer= (state={slid:{},draggedSlid:{}}, action) => {
  switch(action.type) {
    case 'UPDATE_SELECTED_SLID':
      return Object.assign({}, state, {
        slid: action.obj
      })
    case 'UPDATE_DRAGGED_SLID':
      return Object.assign({}, state, {
        draggedSlid: action.obj
      })
    default:
      return state;
  }
}
export default selectedReducer;
