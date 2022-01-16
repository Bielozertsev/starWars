<template>
  <v-container>
    <PeopleFilters
      @applyFilters="applyFilters"
      @resetFilters="setInitialList"
    />
    <PeopleTable
      @deletePerson="updateList"
      :search="search"
      :peopleList="peopleList"
      :prevRouteId="prevRouteId"
    />
  </v-container>
</template>

<script>
  import PeopleTable from '../components/PeopleTable.vue';
  import PeopleFilters from '../components/PeopleFilters.vue';
  
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapActions } = createNamespacedHelpers('starWarsData');

  export default {
    components: { 
      PeopleTable,
      PeopleFilters,
    },
    name: 'PeopleListPage',
    data: () => ({
      search: '',
      filters: {},
      peopleList: null,
      prevRouteId: '',
    }),
    methods: {
      ...mapActions(['loadPeople', 'loadFilms', 'loadSpecies']),
      updateList() {
        this.peopleList = [...this.filteredPeopleList];
      },
      applyFilters(search, filters) {
        this.search = search;
        this.filters = filters;
        this.updateList();
      },
      filterByCategories(people, films, species) {
        let result = people;
        if (films) {
          result = this.getFilterByFilm(people, films);
        }
        if (species) {
          result = this.getFilterBySpecies(result, species);
        }
        return result;
      },
      getFilterByFilm(people, films) {
        return people.filter((person) => person.films.includes(films));
      },
      getFilterBySpecies(people, speciesPeopleIds) {
        return people.filter((person) => speciesPeopleIds.includes(person.url));
      },
      setInitialList() {
        this.peopleList = [...this.people];
      },
    },
    computed: {
      ...mapState(['people', 'films', 'species']),
      filteredPeopleList() {
        let localPeople = [...this.people];
        let films = this.filters.films;
        let species = this.filters.species;
        localPeople = this.filterByCategories(localPeople, films, species);
        return localPeople;
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.prevRouteId = from.params.id
      })
    },
    async mounted() {
      if (!this.people) {
        await this.loadPeople();
      }
      this.setInitialList();
    }
  }
</script>
