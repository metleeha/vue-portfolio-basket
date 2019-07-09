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

  // Replace with your view ID.
  var VIEW_ID = '198185623';

  // Query the API and print the results to the page.
  function queryReports() {
    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              }
            ]
          }
        ]
      }
    }).then(displayResults, console.error.bind(console));
  }

  function displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    document.getElementById('query-output').value = formattedJson;
  }
</script>

<!-- Load the JavaScript API client and Sign-in library. 
<script src="https://apis.google.com/js/client:platform.js"></script> -->
<style>

</style>
