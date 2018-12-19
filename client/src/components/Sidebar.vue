<template>
    <div>
        <h1>Menu </h1>
        <hr>
        <ul class="list-group"> 
            <li class="list-group-item" data-toggle="collapse" data-target="#topUser">
                <button class="btn btn-link m-0 p-0">Top Users</button>

                <ul id="topUser" class="collapse">
                    <li 
                        v-for="user in popularUsers"
                        :key="user._id"
                        > 
                        <small>{{ user.name }} (points: {{ user.point }})</small>
                    </li>
                </ul>

            </li>
            <li class="list-group-item" data-toggle="collapse" data-target="#tags">
                <button class="btn btn-link m-0 p-0">Tags</button>

                <ul id="tags" class="collapse">
                    <li 
                        v-for="tag in tags"
                        :key="tag._id"
                        > 
                        <router-link :to="`/tags/${tag._id}/${tag.name}`">{{ tag.name }}</router-link>
                    </li>
                </ul>

            </li>
            <li class="list-group-item">
                <router-link to="/questions"> All Questions</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['tags', 'popularUsers'])
    }

}

</script>

