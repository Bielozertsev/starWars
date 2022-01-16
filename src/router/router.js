import Vue from 'vue';
import Router from 'vue-router';
import PersonInfoPage from '@/pages/PersonInfoPage.vue';
import PeopleListPage from '@/pages/PeopleListPage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/people-list',
      name: 'PeopleListPage',
      component: PeopleListPage,
    },
    {
      path: '/person-info/:id',
      name: 'PersonInfoPage',
      component: PersonInfoPage,
      props: true,
    },
    {
      path: '*',
      redirect: '/people-list',
    },
  ],
});

export default router;
