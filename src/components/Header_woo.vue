<template>
  <v-toolbar color="indigo" fixed dark app>
    <v-toolbar-side-icon @click="routerclick('/')"><v-icon>home</v-icon></v-toolbar-side-icon>
    <v-toolbar-title>My Footprints</v-toolbar-title>
    <v-btn icon @click="bookmark()">
      <v-icon rounded>star_border</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items id="toolbaritems">
      <v-btn flat @click="routerclick('/post')">Post</v-btn>
      <v-btn flat @click="routerclick('/portfolio')">Portfolio</v-btn>
      <v-btn flat @click="routerclick('/login')">Login</v-btn>
    </v-toolbar-items>
    <v-menu>
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on" id="toolbaricon">
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile><v-btn flat @click="routerclick('post')" class="menubtn">Post</v-btn></v-list-tile>
          <v-list-tile><v-btn flat @click="routerclick('portfolio')" class="menubtn">Portfolio</v-btn></v-list-tile>
          <v-list-tile><v-btn flat @click="routerclick('login')" class="menubtn">Login</v-btn></v-list-tile>
        </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
	name: 'Header',
  data: () => ({
    }),
  methods:{
    routerclick(page){
      this.$router.push(page);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    bookmark(){
      if (window.opera && window.print){// Opera
        var e = document.createElement('a');
        e.setAttribute('href', location.href);
        e.setAttribute('title', document.title);
        e.setAttribute('rel', 'sidebar');
        e.click();
      }
      else if (document.all){// ie
        window.external.AddFavorite(location.href, document.title);
      }
      else {
        alert("chrome 과 safari, firefox 는 Ctrl + D 키를 눌러 북마크를 추가해주세요");
      }
    }
  }
}

</script>
<style>
.menubtn {
  width: 100%;
  margin: 0;
}
@media screen and (min-width:600px) {
  #toolbaritems {
    display: run-in;
  }
  #toolbaricon {
    display: none;
  }
}
@media screen and (max-width:960px) {

}
@media screen and (max-width:600px) {
  #toolbaritems {
    display: none;
  }
  #toolbaricon {
    display: run-in;
  }
}
</style>
