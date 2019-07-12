<template>
  <div>
    <ImgBanner :imgSrc='$route.params.imgSrc'>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">{{$route.params.title}}</div>
    </ImgBanner>
    <v-container>
      <v-layout>
        <v-flex xs10>
          <v-flex xs12 style="font-size:2vw;" id="aboutmeText">
            <p>{{$route.params.body}}<br/>
              {{$route.params.date}}
            </p>
          </v-flex>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>



<script>
import ImgBanner from '../components/ImgBanner'

export default {
	name: 'PortfolioViewPage',
	components: {
		ImgBanner
	}
}
</script>


<style>
@media screen and (max-width:960px) {

}
@media screen and (max-width:600px) {

}
</style>
