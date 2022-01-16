import starWarsApiService from '@/services/api/starWarsApiService.js';

import {
  PEOPLE_LOAD_START,
  PEOPLE_LOADED,
  PEOPLE_LOAD_FAILED,

  FILMS_LOAD_START,
  FILMS_LOADED,
  FILMS_LOAD_FAILED,

  SPECIES_LOAD_START,
  SPECIES_LOADED,
  SPECIES_LOAD_FAILED,

  PERSON_LOAD_START,
  PERSON_LOADED,
  PERSON_LOAD_FAILED,

  PERSON_DELETED,
} from './mutations-types.js';

export const starWarsData = {
  namespaced: true,

  state: {
    // data
    people: null,
    films: null,
    species: null,
    peopleDetailsList: [],
    // flags
    loading: false,
    // errors
    error: null,
  },

  mutations: {
    [PEOPLE_LOAD_START](state) {
      state.error = null;
    },
    [PEOPLE_LOADED](state, payload) {
      state.people = payload;
      state.loading = false;
    },
    [PEOPLE_LOAD_FAILED](state, payload) {
      state.loading = false;
      state.error = payload;
    },

    [FILMS_LOAD_START](state) {
      state.error = null;
    },
    [FILMS_LOADED](state, payload) {
      state.films = payload;
      state.loading = false;
    },
    [FILMS_LOAD_FAILED](state, payload) {
      state.loading = false;
      state.error = payload;
    },

    [SPECIES_LOAD_START](state) {
      state.error = null;
    },
    [SPECIES_LOADED](state, payload) {
      state.species = payload;
      state.loading = false;
    },
    [SPECIES_LOAD_FAILED](state, payload) {
      state.loading = false;
      state.error = payload;
    },

    [PERSON_LOAD_START](state) {
      state.error = null;
    },
    [PERSON_LOADED](state, payload) {
      state.peopleDetailsList.push(payload)
      state.loading = false;
    },
    [PERSON_LOAD_FAILED](state, payload) {
      state.loading = false;
      state.error = payload;
    },

    [PERSON_DELETED](state, id) {
      state.loading = false;
      const deleteId = state.people.findIndex(person =>  {
        return person.url === id
      });
      state.people.splice(deleteId, 1);
    }
  },
  actions: {
    async loadPeople({ commit }) {
      commit(PEOPLE_LOAD_START);
      try {
        const payload = await starWarsApiService.loadPeople();
        commit(PEOPLE_LOADED, payload);
      } catch (e) {
        commit(PEOPLE_LOAD_FAILED, e);
      }
    },

    async loadPerson({ commit, state }, id) {
      commit(PERSON_LOAD_START);

      if (!id) {
        commit(PERSON_LOADED, null);
        return;
      }
      // to avoid extra queries in case if info was already loaded
      const foundPersonUrlIndex = state.peopleDetailsList.findIndex(person => person.url.toString() === id);
      if (foundPersonUrlIndex > -1) {
        commit(PERSON_LOADED);
        return;
      }

      try {
        const payload = await starWarsApiService.loadPerson(id);
        commit(PERSON_LOADED, payload);
      } catch (e) {
        commit(PERSON_LOAD_FAILED, e);
      }
    },

    deletePerson({ commit }, id) {
      commit(PERSON_DELETED, id);
    },

    async loadFilms({ commit }) {
      commit(FILMS_LOAD_START);
      try {
        const payload = await starWarsApiService.loadFilms();
        commit(FILMS_LOADED, payload);
      } catch (e) {
        commit(FILMS_LOAD_FAILED, e);
      }
    },

    async loadSpecies({ commit }) {
      commit(SPECIES_LOAD_START);
      try {
        const payload = await starWarsApiService.loadSpecies();
        commit(SPECIES_LOADED, payload);
      } catch (e) {
        commit(SPECIES_LOAD_FAILED, e);
      }
    },
  },
};
