import Vue from 'vue';

const starWarsUrl = process.env.VUE_APP_STAR_WARS_BACKUP_URL;

/**
 * Service for the People API integration.
 */
export default {
  loadPeople: async () => {
    const { data } = await Vue.axios.get(`${starWarsUrl}/people/`,);
    return data;
  },
  loadFilms: async () => {
    const { data } = await Vue.axios.get(`${starWarsUrl}/films/`,);
    return data;
  },
  loadSpecies: async () => {
    const { data } = await Vue.axios.get(`${starWarsUrl}/species/`,);
    return data;
  },
  loadPerson: async (id) => {
    const { data } = await Vue.axios.get(`${starWarsUrl}/people/${id}`,);
    return data;
  },
};
