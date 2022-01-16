<template>
  <v-icon v-if="gender === 'female'">
    mdi-face-woman-outline
  </v-icon>
  <v-icon v-else-if="gender === 'male'">
    mdi-face-man-outline
  </v-icon>
  <v-icon v-else>
    mdi-white-balance-sunny
  </v-icon>
</template>

<script>
  export default {
    name: 'GenderIcon',
    props: {
      gender: String,
    },
  }
</script>