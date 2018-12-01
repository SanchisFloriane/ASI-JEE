export const setSelectedSlid=(slid_obj)=>{
  return {
    type: 'UPDATE_SELECTED_SLID',
    obj: slid_obj
  };
}

export const updateContentMap=(content_map_obj)=>{
  return {
    type: 'UPDATE_CONTENT_MAP',
    obj: content_map_obj
  };
}

export const updatePresentation=(presentation_obj)=>{
  return {
    type: 'UPDATE_PRESENTATION',
    obj: presentation_obj
  }
}

export const updatePresentationSlids=(slid_obj)=>{
  return{
    type: 'UPDATE_PRESENTATION_SLIDS',
    obj: slid_obj
  }
}

export const updateDraggedElt=(slid_obj)=>{
  return{
    type: 'UPDATE_DRAGGED_SLID',
    obj: slid_obj
  }
}

export const addContent=(content_obj)=>{
  return{
    type: 'ADD_CONTENT',
    obj: content_obj
  }
}
