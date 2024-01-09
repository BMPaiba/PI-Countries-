import {
  CONTINENT,
  ACTIVITIES,
  ORDER,
  POPULATION,
  ALLCOUNTRIES,
  PAGED,
  SEARCH,
  NEWACTIVITIES,
  FILTERACTIVITIES,
  CLEARFILTERS,
} from "./action-types";

const initialState = {
  countries: [],
  originalCountries: [],
  activities: [],
  currentPage: 1,
  pageSize: 10,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ALLCOUNTRIES:
      return {
        ...state,
        countries: payload,
        originalCountries: payload,
      };
    case CONTINENT:
      if (payload === "All") {
        return {
          ...state,
          countries: [...state.originalCountries],
        };
      }
      const contStateFiltered = state.originalCountries.filter(
        (country) => country.continent === payload
      );
      return {
        ...state,
        countries: contStateFiltered,
      };

    case PAGED:
      return {
        ...state,
        currentPage: payload,
      };

    case ORDER:
      const copyState = [...state.countries];
      if (payload === "A")
        copyState.sort((a, b) => a.name.localeCompare(b.name));
      if (payload === "D")
        copyState.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        countries: copyState,
      };

    case POPULATION:
      const populState = [...state.countries];
      if (payload === "A")
        populState.sort((a, b) => a.population - b.population);
      if (payload === "D")
        populState.sort((a, b) => b.population - a.population);
      return {
        ...state,
        countries: populState,
      };
      
    case CLEARFILTERS:
      return {
        ...state,
        countries: [...state.originalCountries],
      };

      case ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };

    case FILTERACTIVITIES:
      if (payload === "All") {

        let filterCountries = [...new Set(state.activities.map((elem) => elem.countries[0]))];
        const filterFinally = state.originalCountries.filter((country) =>
        filterCountries.includes(country.id)
      );

        return {
          ...state,
          countries: filterFinally,
        };
      }
      const filterActivities = state.activities.find(
        (act) => act.id === parseInt(payload)
        );
        
      const filterCountries = filterActivities.countries;

      const filterFinally = state.originalCountries.filter((country) =>
        filterCountries.includes(country.id)
      );

      return {
        ...state,
        countries: filterFinally,
      };

      case SEARCH:
      return {
        ...state,
        countries: payload,
      };
      
    default:
      return {
        ...state,
      };
  }
}
