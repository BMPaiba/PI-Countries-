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
  FILTERS,
} from "./action-types";
import { filters } from "./actions";

const initialState = {
  countries: [],
  originalCountries: [],
  activities: [],
  currentPage: 1,
  pageSize: 10,
};

const applyFilters = (continent, activity, countries, activities) => {
  // Si ambos filtros son "All", devuelve la lista completa
  if (continent === "All" && activity === "All") {
    console.log("estas son las actividades: ", activities);
    return countries;
  }

  // Filtrar por continente
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

    //filtro para todos los continentes
    const filterActivityOnAllContinents = countries.filter((country) =>
      countriesOfActivityId.includes(country.id)
    );

    //filtra por actividad y continente
    const filteredContinents = filterActivityOnAllContinents.filter(
      (country) => country.continent === continent
    );
    if (continent === "All") {
      return filterActivityOnAllContinents;
    }

    if (continent !== "All") {
      return filteredContinents;
    }

    console.log(filteredContinents);
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
        let filterCountryId = state.activities
          .map((elem) => elem.countries)
          .flat();

        let filterCountryIdSet = [...new Set(filterCountryId)];

        const filterFinally = state.originalCountries.filter((country) =>
          filterCountryIdSet.includes(country.id)
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
