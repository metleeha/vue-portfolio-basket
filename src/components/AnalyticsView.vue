<template>
  <div>
    <!-- The Sign-in button. This will run `queryReports()` on success. -->
    <p class="g-signin2" data-onsuccess="queryReports"></p>

    <!-- The API response will be printed here. -->
    <textarea cols="80" rows="20" id="query-output"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'AnalyticsView',
    data: () => ({
      }),
    methods:{
    }
  }


</script>

<!-- Load the JavaScript API client and Sign-in library. 
<script src="https://apis.google.com/js/client:platform.js"></script> -->
<style>

</style>
