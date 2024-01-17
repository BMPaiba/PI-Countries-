import {
  ACTIVITIES,
  ORDER,
  ALLCOUNTRIES,
  PAGED,
  SEARCH,
  CLEARFILTERS,
  FILTERS,
} from "./action-types";

const initialState = {
  countries: [],
  originalCountries: [],
  activities: [],
  currentPage: 1,
  pageSize: 10,
};

const applyFilters = (continent, activity, countries, activities) => {
  if (continent === "All" && activity === "All") {
    console.log("estas son las actividades: ", activities);
    return countries;
  }
  
  if (continent !== "All" && activity === "All") {
    const filteredContinentsOnly = countries.filter(
      (country) => country.continent === continent
    );
    if (filteredContinentsOnly.length > 0) {
      return filteredContinentsOnly;
    } else return console.log("No existe la data");
  }

  if (activity !== "All") {
    const activityNumer = Number(activity);
    let filterActivity = activities.find((act) => act.id === activityNumer);

    const countriesOfActivityId = filterActivity.countries;

    
    const filterActivityOnAllContinents = countries.filter((country) =>
      countriesOfActivityId.includes(country.id)
    );

    const filteredContinents = filterActivityOnAllContinents.filter(
      (country) => country.continent === continent
    );
    if (continent === "All") {
      return filterActivityOnAllContinents;
    }

    if (continent !== "All") {
      return filteredContinents;
    }

  }

  return countries;
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ALLCOUNTRIES:
      return {
        ...state,
        countries: payload,
        originalCountries: payload,
      };

    case FILTERS:
      const { continent, activity } = payload;
      const filterFinallyComb = applyFilters(
        continent,
        activity,
        state.originalCountries,
        state.activities
      );
      return {
        ...state,
        countries: filterFinallyComb,
      };

    case PAGED:
      return {
        ...state,
        currentPage: payload,
      };

    case ORDER:
      const copyState = [...state.countries];
      if (payload === "ascendant")
        copyState.sort((a, b) => a.name.localeCompare(b.name));
      if (payload === "descending")
        copyState.sort((a, b) => b.name.localeCompare(a.name));
      if (payload === "maximum")
        copyState.sort((a, b) => a.population - b.population);
      if (payload === "minimum")
        copyState.sort((a, b) => b.population - a.population);
      return {
        ...state,
        countries: copyState,
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
