<template>
  <v-container>
    <div>
      <v-form
        ref="filtersFormRef"
        v-model="valid"
      >
        <v-select
          ref="filmsListRef"
          v-model="filters.films"
          @change="clearSpeciesList"
          :items="films"
          item-text="title"
          item-value="episode_id"
          label="Films"
          :rules="filmRules"
          required
          single-line
        ></v-select>
        <v-select
          ref="speciesListRef"
          v-model="filters.species"
          :items="speciesList"
          item-text="name"
          item-value="people"
          label="Species"
          single-line
        ></v-select>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Name"
          hide-details
          maxlength="50"
        ></v-text-field>
      </v-form>
    </div>
    <div class="buttons">
      <v-btn 
        color="primary"
        @click="applyFilters"
      >
        Apply
      </v-btn>
      <v-btn @click="resetFilters">Clear</v-btn>
    </div>
  </v-container>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapActions } = createNamespacedHelpers('starWarsData');

  export default {
    name: 'PeopleFilters',
    data: () => ({
      valid: false,
      search: '',
      filters: {},
      filmRules: [
        v => !!v || 'Film is required',
      ],
    }),
    methods: {
      ...mapActions(['loadFilms', 'loadSpecies',]),
      clearSpeciesList() {
        this.$refs.speciesListRef.reset()
        this.filters.species = null;
      },
      validateFilters() {
        this.$refs.filtersFormRef.validate()
      },
      resetFilters() {
        this.$refs.filtersFormRef.resetValidation();
        this.$refs.filtersFormRef.reset();
        this.$emit('resetFilters');
      },
      async applyFilters() {
        await this.validateFilters();
        if (!this.valid) { return; }
        this.$emit('applyFilters', this.search, this.filters);
      },
    },
    computed: {
      ...mapState(['films', 'species']),
      speciesList() {
        if (!this.filters.films) { 
          return this.species; 
        }
        return this.species && this.species
          .filter((spec) => spec.films
          .includes(this.filters.films));
      },
    },
    async mounted() {
      if (!this.films) {
        this.loadFilms();
      }
      if (!this.species) {
        this.loadSpecies();
      }
    }
  }
</script>

<style scoped>
  .buttons {
    padding: 20px 0;
  }
  .buttons button{
    margin-right: 20px;
  }
</style>