import {
    ALLCOUNTRIES,
    ACTIVITIES,
    ORDER,
    PAGED,
    SEARCH,
    NEWACTIVITIES,
    CLEARFILTERS,
    FILTERS,
  } from "./action-types";
  
  export const addCountries = (countries) => {
    return {
      type: ALLCOUNTRIES,
      payload: countries,
    };
  };
  
  export const allActivities = (activities) => {
    return {
      type: ACTIVITIES,
      payload: activities,
    };
  };
  
  export const order = (order) => {
    return {
      type: ORDER,
      payload: order,
    };
  };
  
  export const paged = (page) => {
    return {
      type: PAGED,
      payload: page,
    };
  };
  
  export const search = (search) => {
    return {
      type: SEARCH,
      payload: search,
    };
  };
  
  export const newActivities = (newActivity) => {
    return {
      type: NEWACTIVITIES,
      payload: newActivity,
    };
  };
  
  export const clear = (clear) => {
    return {
      type: CLEARFILTERS,
      payload: clear,
    };
  };

  export const filters = (continent, activity) => ({
    type: FILTERS,
    payload: {
      continent: continent,
      activity: activity,
    },
  });