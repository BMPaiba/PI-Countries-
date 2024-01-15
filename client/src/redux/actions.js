import {
    ALLCOUNTRIES,
    CONTINENT,
    ACTIVITIES,
    ORDER,
    POPULATION,
    PAGED,
    SEARCH,
    NEWACTIVITIES,
    FILTERACTIVITIES,
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
  
  export const population = (population) => {
    return {
      type: POPULATION,
      payload: population,
    };
  };
  
  export const continent = (continent) => {
    return {
      type: CONTINENT,
      payload: continent,
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
  
  export const filterActivities = (activity) => {
    return {
      type: FILTERACTIVITIES,
      payload: activity,
    };
  };
  
  export const clear = (clear) => {
    return {
      type: CLEARFILTERS,
      payload: clear,
    };
  };
  

  //? combined filters
  export const filters = (continent, activity) => ({
    type: FILTERS,
    payload: {
      continent: continent,
      activity: activity,
    },
  });