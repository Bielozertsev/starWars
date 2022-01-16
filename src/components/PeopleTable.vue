<template>
  <v-container>
    <div>
      <v-data-table
        v-if="peopleList && peopleList.length"
        :headers="headers"
        :items="peopleList"
        :search="search"
        :item-class="setItemRowBackground"
        @click:row="goToDetails"
      >
      <template v-slot:[`item.gender`]="{ item }">
        <GenderIcon 
          :gender="item.gender"
        />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          @click="deleteItem($event, item)"
        >
          mdi-delete
        </v-icon>
      </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
  import GenderIcon from '@/components/GenderIcon.vue';

  import { createNamespacedHelpers } from 'vuex';

  const { mapActions } = createNamespacedHelpers('starWarsData');

  export default {
    name: 'PeopleTable',
    components: { 
      GenderIcon,
    },
    props: {
      filter: Object,
      search: String,
      peopleList: Array,
      prevRouteId: String,
    },
    data: () => ({
      prevRoute: null,
      headers: [
        { text: '', value: 'gender', sortable: false },
        { text: 'Name', value: 'name' },
        { text: 'Height', value: 'height' },
        { text: 'Hair color', value: 'hair_color' },
        { text: 'Eye color', value: 'eye_color' },
        { text: 'Birth year', value: 'birth_year' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }),
    methods: {
      ...mapActions(['deletePerson']),
      goToDetails(event, {item}) {
        this.$router.push({ 
          name: 'PersonInfoPage', 
          params: { id: item.url.toString() } 
        });
      },
      setItemRowBackground(item) {
        return item.url.toString() === this.prevRouteId ? 'highlighted-row' : 'dasdasd';
      },
      deleteItem(event, item) {
        event.stopPropagation();
        this.deletePerson(item.url);
        this.$emit('deletePerson');
      }
    },
  }
</script>

<style>
  .highlighted-row {
    background: #cccccc;
  }
</style>