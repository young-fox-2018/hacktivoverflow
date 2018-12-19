<template>
  <div class="jumbotron m-0 p-0 blue mt-5">
    <h3 class="text-white">Loby chat</h3>
    <div class="row m-0 p-0 position-relative">
      <div class="col-12 p-0 m-0 position-absolute" style="right: 0px;">
        <div
          class="card border-0 rounded"
          style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 6px 10px 0 rgba(0, 0, 0, 0.01); overflow: hidden; height: 50vh;"
        >
          <div class="card bg-sohbet border-0 m-0 p-0" style="height: 100vh;">
            <div
              id="sohbet"
              class="card border-0 m-0 p-0 position-relative bg-transparent"
              style="overflow-y: auto; height: 100vh;"
            >
              <div
                v-for="(element, index) in listChat"
                :key="index"
                :class="element[1].class1"
                :data-is="element[1].datais"
              >
                <a :class="element[1].class2">{{element[1].said}}</a>
              </div>
            </div>
          </div>
          <div
            class="w-100 card-footer p-0 bg-light border border-bottom-0 border-left-0 border-right-0"
          >
            <form class="m-0 p-0" @submit.prevent="submitChat">
              <div class="row m-0 p-0">
                <div class="col-9 m-0 p-1">
                  <input
                    id="text"
                    class="mw-100 border rounded form-control"
                    type="text"
                    name="text"
                    title="Type a message..."
                    placeholder="Type a message..."
                    required
                    v-model="word"
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/api/firebase.js";
import jwt from "jsonwebtoken";
export default {
  data() {
    return {
      listChat: [
        [
          "",
          {
            name: "",
            said: "",
            id: ""
          }
        ]
      ],

      users: "",
      word: ""
    };
  },
  methods: {
    submitChat() {
      let self = this;
      firebase
        .database()
        .ref("/chat")
        .push({
          said: self.word,
          name: self.users.name,
          id: self.users.id
        })
        .then(data => {
          self.word = "";
        });
    }
  },
  mounted() {
    let self = this;
    let user = "";
    if (localStorage.getItem("token")) {
      user = jwt.decode(localStorage.getItem("token"));
      this.users = {
        id: user._id,
        name: user.name
      };
    } else {
      user = Math.ceil(Math.random() * 1000000 + Math.random() * 100);
      this.users = {
        id: user + "",
        name: "anonymous"
      };
    }

    firebase
      .database()
      .ref("/chat")
      .on("value", function(payload) {
        if (payload.val()) {
          let data = Object.entries(payload.val());
          let filterData = data.filter(val => {
            if (val[1].id == self.users.id) {
              val[1].class1 = "balon1 p-2 m-0 position-relative";
              val[1].class2 = "float-right";
              val[1].datais = "you";
            } else {
              val[1].class1 = "balon2 p-2 m-0 position-relative";
              val[1].class2 = "float-left";
              val[1].datais = val[1].name;
            }
          });
          self.listChat = data;
        }
      });
  }
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}

label {
  color: rgba(120, 144, 156, 1) !important;
}

.btn:focus,
.btn:active:focus,
.btn.active:focus {
  outline: none !important;
  box-shadow: 0 0px 0px rgba(120, 144, 156, 1) inset,
    0 0 0px rgba(120, 144, 156, 0.8);
}

textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus {
  border-color: rgba(120, 144, 156, 1);
  color: rgba(120, 144, 156, 1);
  opacity: 0.9;
  box-shadow: 0 0px 0px rgba(120, 144, 156, 1) inset,
    0 0 10px rgba(120, 144, 156, 0.3);
  outline: 0 none;
}

.card::-webkit-scrollbar {
  width: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 9px;
  background: rgba(96, 125, 139, 0.99);
}

.balon1,
.balon2 {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}

.balon1 a {
  background: #42a5f5;
  color: #fff !important;
  border-radius: 20px 20px 3px 20px;
  display: block;
  max-width: 75%;
  padding: 7px 13px 7px 13px;
}

.balon1:before {
  content: attr(data-is);
  position: absolute;
  right: 15px;
  bottom: -0.8em;
  display: block;
  font-size: 0.75rem;
  color: rgba(84, 110, 122, 1);
}

.balon2 a {
  background: #f1f1f1;
  color: #000 !important;
  border-radius: 20px 20px 20px 3px;
  display: block;
  max-width: 75%;
  padding: 7px 13px 7px 13px;
}

.balon2:before {
  content: attr(data-is);
  position: absolute;
  left: 13px;
  bottom: -0.8em;
  display: block;
  font-size: 0.75rem;
  color: rgba(84, 110, 122, 1);
}

.bg-sohbet:before {
  content: "";
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=");
  opacity: 0.06;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  position: absolute;
}
</style>
