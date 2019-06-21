<template>
 <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>User CRUD</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card ref="form">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-btn flat icon @click ="close">
              <v-icon>cancel</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="ID" :readonly="editedIndex > -1"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field 
                  required v-model="editedItem.name" 
                  label="Name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="clear">Reset</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs">{{ props.item.id }}</td>
        <td class="text-xs">{{ props.item.name }}</td>
        <td class="text-xs">{{ props.item.age }}</td>
        <td class="text-xs">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
  </div>
  <!-- <div class="users">
    <h1>User list</h1>
    <div v-for="user in users" :key="user" class="user">
        <strong>{{user.name}}</strong>
        <router-link :to="{ name: 'userView', params: { id: user.id }}">More</router-link>
    </div>
  </div> -->
</template>
<script>
export default {
  created () {
    this.$http.get('/api/users')
    .then((response) => {
      this.users = response.data
    })
  },
  data () {
    return {
      dialog: false,
      headers: [
        { text: 'id', value: 'id'},
        { text: 'name', value: 'name'},
        { text: 'age', value: 'age'},
        { text: 'action', sortable: false }
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        age: 0
      },
      defaultItem: {
        id: 0,
        name: '',
        age: 0
      },
      selectedItem: {},
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectedItem = item
      this.dialog = true
    },
    deleteItem(item){
      console.log("in delete method")
      confirm('Are you sure you want to delete this item? ') && 
      this.$http.delete(`/api/users/delete/` + item.id)
      .then((response) => {     
      }).catch(function(error){
        alert('Sorry, failed to delete user')
      })
      window.location.reload()   
    },
    close(){
      this.dialog = false
      setTimeout( ()=> {
        this.editedItem = Object.assign( {}, this.defaultItem)
        this.editedIndex = -1       
      }, 300)     
    },
    save(){
      // if(this.editedItem.name.length > 0 && this.editItem.age == 0){
      //   console.log("required pass!!")
      // }
      // else {
      //   console.log("failed")
      // }
      // console.log(this.editedItem.age)
      // console.log(this.editedItem)
      // console.log(this.editedItem.name.length)
      if(this.editedIndex > -1){
        // edit new item
        this.$http.put('/api/users/edit/' + this.editedItem.id, {
          id: this.editedItem.id,
          name: this.editedItem.name,
          age: this.editedItem.age
        }).then((response) => {
          alert('Edit succcessfully')
        }).catch(function(error){
          alert('Edit failed')
        })
        console.log("in if statement")
      } else {
        //add new item
        console.log("in else statement")
        console.log(this.editedItem)
        this.$http.post('/api/users/add', {
          id: this.editedItem.id,
          name: this.editedItem.name,
          age: this.editedItem.age
        }).then((response) =>{
          alert('Success to add user')
        }).catch(function(error){
          alert('Failed to add user')
        })
      }
      window.location.reload()   
    }, 
    clear(){
      if (this.editedIndex>-1) {
        // reset to edit item
        this.editItem(this.selectedItem)
      } else {
        // reset to add item
        console.log()
        this.editedItem = Object.assign( {}, this.defaultItem)
        this.editedIndex = -1 
      }
      console.log("Clear method")
      
    }, initialize() {
      console.log("in initialize method")
    }
  }
}
</script>