import {
    GET_PEOPLE,
    GET_PEOPLE_ERROR,
    PROFILE_ERROR,
    EDIT_PROFILE,
    EDIT_PROFILE_ERROR,
    GET_CURRENT_PROFILE,
    GET_CURRENT_PROFILE_ERROR,
    UPDATE_CONTACTS_FOR_PEOPLE,
    UPDATE_CONTACTS_FOR_PEOPLE_ERROR
  } from "../actions/types";
  
  const initialState = {
    people: [],
    people_loading: true,
    people_error: {},
    people_info: {},
    limit: 10,
    offset:0,
    error:false,
    hasMore: true,

  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PEOPLE:
        return {
          ...state,
          people: [...state.people, ...payload.people],
          offset: state.offset + state.limit,
          people_loading: false,
          hasMore: payload.has_more,

        };

      case GET_PEOPLE_ERROR:
        return {
          ...state,
          error: payload,
          people_loading: false
        };

      case UPDATE_CONTACTS_FOR_PEOPLE:
        return {
          ...state,
          people: state.people.map(person => person.id === payload.id ? 
            {
              ...person,
              is_following_this: payload.is_following_this
          }:person
          ),
          people_loading: false
        };
      case UPDATE_CONTACTS_FOR_PEOPLE_ERROR:
        return {
          ...state,
          error : payload,
          people_loading: false
        }

      default:
        return state;
    }
  }
  