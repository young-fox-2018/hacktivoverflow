<template>
    <div class="navbar navbar-light fixed-bottom" style="background-color: #F0FE94;">
        <span class="navbar-brand">@ 2018 Akhir - Hampir 2019</span>
        <div class="form-inline mt-2 mt-md-0">
            <form @submit.prevent="saveChat" v-if="userAktif">
                <div class="input-group mr-1">
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Chatting for Asyikk.."
                        autocomplete="off"
                        style="font-family: 'Lobster', cursive;"
                        id="chatPopover"
                        v-model="messageChat"
                    />
                    <b-popover
                        target="chatPopover"
                        placement="auto"
                    >
                        <div>
                            <ul>
                                <li v-for="(data, index) in chat" :key="index">{{ data.message }}</li>
                            </ul>
                        </div>
                    </b-popover>
                    <span class="input-group-append">
                        <button class="btn btn-outline-success" type="submit">
                            <i class="fa fa-comment-alt"></i>
                        </button>
                    </span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {
                userAktif: null,
                message: null,
                socket: '',
                notif: null,
                messageChat: '',
                chat: [],
            };
        },
    }
</script>