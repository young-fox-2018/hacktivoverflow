<template>
    <div class="card p-3 mb-2">
        <div class="row">
            <div class="col-9">
                <div class="mb-3">
                    <router-link
                        :to="$route.fullPath.substr(1, $route.fullPath.length)+'/'+question.slug+'/'+question._id"
                        style="text-decoration: none; color: black;"
                    >
                        <b>{{ question.title }}</b>
                    </router-link>
                </div>
                <div>
                    <div>
                        <span class="badge badge-warning p-2 mr-1 mb-1" v-for="(data, index) in question.tags" :key="index">{{ data.text }}</span>
                    </div>
                    <div>
                        <small>
                            <b>
                                <router-link :to="'/profile/'+question.user._id">{{ question.user.email }}</router-link> |
                                Updated At : {{ new Date(question.updatedAt).toDateString() }}
                            </b>
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <i class="fa fa-hand-point-up mr-5 mb-3" style="color: #D0BEBE; transform: scale(1.5, 1.5);">
                    <span class="ml-1 mr-1">{{ question.upvote.length }}</span>
                </i>
                <i class="fa fa-hand-point-down mr-3 mb-3" style="color: #D0BEBE; transform: scale(1.5, 1.5);">
                    <span class="ml-1 mr-1">{{ question.downvote.length }}</span>
                </i>
                <div v-if="userAktif">
                    <button class="btn btn-outline-warning btn-sm mr-1" @click="$emit('edit', question)"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-outline-warning btn-sm" @click="$emit('delete', question)"><i class="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: ['question', 'userAktif'],
    };
</script>