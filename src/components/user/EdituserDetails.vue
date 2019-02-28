<template id="edituserdetails">
  <div class="user-edit">
    <frontend-header></frontend-header>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm4 md2>
          <front-sidebar></front-sidebar>
        </v-flex>
        <v-flex xs12 sm4 md6>
          <v-toolbar flat>
            <v-list>
              <v-list-tile>
                <v-list-tile-title class="title">
                  Personal Details
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card dark color="">
            <v-form>
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="user.fstname"
                  label="First Name:"
                  box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="user.lstname"
                  label="Last Name:"
                  box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="user.username"
                  label="Username"
                  box
                  disabled
                ></v-text-field>
              </v-flex>
              <v-btn color="green" type="button" v-on:click="update()">Submit</v-btn>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <frontend-footer></frontend-footer>
  </div>
</template>

<script>
  import FrontendHeader from './FrontendHeader'
  import FrontendFooter from './FrontendFooter'
  import FrontSidebar from './FrontSidebar'
  export default {
    name: 'Edituserdetails',
    components: {FrontSidebar, FrontendFooter, FrontendHeader},
    data () {
      return {
        user: {
          fstname: '',
          lstname: '',
          email: '',
          username: '',
          UserId: ''
        }
      }
    },
    created () {
      this.user_details ()
      //this.onload_methods ()
    },
    methods: {
      user_details () {
        const UserId = this.$store.getters.useruseid
        const Usertoken = this.$store.getters.usertoken
        this.$store.dispatch('USER_DETAILS', {UserId, Usertoken})
          .then((response) => {
            this.user.fstname = response.data['first_name']
            this.user.lstname = response.data['last_name']
            this.user.email = response.data['email']
            this.user.username = response.data['username']
          })
          .catch(err => {
            console.log(err)
          })
      },
      update: function () {

      }
    }
  }
</script>

<style scoped>

</style>
