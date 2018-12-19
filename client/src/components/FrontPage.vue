<template>
    <div>
        <div class="container d-flex justify-content-center py-4">
            <h3>Welcome to hacktivOverflow!</h3>
        </div>

        <b-carousel 
            id="carousel1"
            style="text-shadow: 1px 1px 2px #333;"
            controls
            indicators
            background="#ababab"
            :interval="4000"
            img-width="1024"
            img-height="480"
            v-model="slide"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd">

            <b-carousel-slide 
                caption="Awesome"
                text="Search for the answer here"
                img-src="https://source.unsplash.com/1024x480/?technology"
            ></b-carousel-slide>
            <b-carousel-slide 
                caption="Technology"
                text="Keep involving"
                img-src="https://source.unsplash.com/1024x480/?computer"
            ></b-carousel-slide>
            <b-carousel-slide 
                caption="Information"
                text="Answer the question"
                img-src="https://source.unsplash.com/1024x480/?programming"
            ></b-carousel-slide>
            <b-carousel-slide 
                caption="LOL"
                text="The future of technology starts here"
                img-src="https://source.unsplash.com/1024x480/?information"
            ></b-carousel-slide>

        </b-carousel>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                slide: 0,
                sliding: null
            }
        },
        methods: {
            onSlideStart (slide) {
                this.sliding = true
            },
            onSlideEnd (slide) {
                this.sliding = false
            }
        }
    }
</script>
