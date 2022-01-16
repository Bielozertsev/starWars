
<template>
  <v-card
    v-if="currentPerson"
    max-width="375"
    class="mx-auto"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title class="white--text pl-12 pt-12">
          <div class="text-h4 pl-12 pt-12">
            {{ currentPerson.name }}
          </div>
        </v-card-title>
      </v-row>
    </v-img>
    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ currentPerson.hair_color }}</v-list-item-title>
          <v-list-item-subtitle>hair color</v-list-item-subtitle>
        </v-list-item-content>  
        <v-list-item-content>        
          <v-list-item-title>{{ currentPerson.skin_color }}</v-list-item-title>
          <v-list-item-subtitle>skin color</v-list-item-subtitle>
        </v-list-item-content>  
        <v-list-item-content>
          <v-list-item-title>{{ currentPerson.eye_color }}</v-list-item-title>
          <v-list-item-subtitle>eye color</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> {{ currentPerson.height }}</v-list-item-title>
          <v-list-item-subtitle>height</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>{{ currentPerson.birth_year }}</v-list-item-title>
          <v-list-item-subtitle>birth year</v-list-item-subtitle>
        </v-list-item-content>  
        <v-list-item-content>  
          <v-list-item-title>{{ currentPerson.gender }}</v-list-item-title>
          <v-list-item-subtitle>gender</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-content>  
          <div 
            v-for="(film, index) in currentPersonFilms"
            :key="index"
          >
            <div><b>{{ film.title }}</b> ({{ film.release_date }})</div>
            
            {{ film.opening_crawl}}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';

  const { mapState, mapActions } = createNamespacedHelpers('starWarsData');

  export default {
    name: 'PersonInfoPage',
    props: {
      id: String,
    },
    methods: {
      ...mapActions(['loadPerson', 'loadFilms']),
    },
    computed: {
      ...mapState(['peopleDetailsList', 'films']),
      currentPerson() {
        return this.peopleDetailsList && this.peopleDetailsList
          .find((person) => person.url.toString() === this.id );
      },
      currentPersonFilms() {
        return this.films && this.films
          .filter((film) => this.currentPerson.films
          .includes(film.episode_id));
      }
    },
    async mounted() {
      await this.loadPerson(this.id);
      if (!this.films) {
        this.loadFilms();
      }
    }
  }
</script>
