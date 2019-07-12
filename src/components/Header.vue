<template>
    <div>
    <!-- sidebar -->
	<v-navigation-drawer v-model="drawer" app fixed temporary>
		<v-list>
			<v-list-tile v-for="item in menuItems" 
			:key="item.title"
			router
			:to="item.link">
				<v-icon>{{ item.emoji }}</v-icon>
				<v-list-tile-content>{{ item.title }}</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>
	<!-- end sidebar -->

    <!-- navbar --> 
    <v-toolbar color='#112d4e' fixed app temporary dark scroll-off-screen >
		<v-toolbar-side-icon 
			@click.stop="drawer = !drawer"
			class="hidden-sm-and-up"
		><v-icon>fa-bars</v-icon></v-toolbar-side-icon>
		<v-toolbar-title>
		<router-link to="/" tag="span" style="cursor: pointer"><v-icon left>free_breakfast</v-icon></router-link>
		TEN</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-xs-only">
			<v-btn flat v-for="item in menuItems" 
			:key="item.title"
			:to="item.link">
				<v-icon left>{{ item.emoji }}</v-icon>
				{{ item.title }}
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>
	<!-- end navbar -->

    <!-- backTotop button -->
	<v-fab-transition>
		<v-btn
			v-show="fab"
			v-scroll="onScroll"
			class="md-5 mr-3 elevation-21"
			fab
			fixed
			bottom
			right
			color="#d6e4f0"
			@click="toTop"
			>
		<v-icon color="#112d4e">keyboard_arrow_up</v-icon>
		</v-btn>
	</v-fab-transition>
	<!-- end backTotop button -->
    </div>
</template>

<script>
 export default {
    name: 'Header',
    data(){
        return {
            fab: false,
            drawer: false,
			menuItems: [
				{ emoji: 'assessment', title: 'Portfolio', link: '/portfolio'},
				{ emoji: 'create', title: 'New', link: '/portfoliowriter'},
				{ emoji: 'input', title: 'LogIn', link: '/login'}
            ],
        }
	},
    methods: {
      onScroll () {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||
          document.documentElement.offsetTop ||
          0
        this.fab = top > 300
      },
      toTop () {
        this.$router.push({ hash: '' })
		this.$vuetify.goTo(0)
		behavior: "smooth"
      }
    }
    
}
</script>
<style scoped>

</style>
