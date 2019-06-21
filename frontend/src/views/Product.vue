<template>
 <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Product CRUD</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.Product_ID" label="ID" :readonly="editedIndex > -1"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.Kor_Name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-select
                    v-model="editedItem.Supplier_ID"
                    label="Supplier"
                    :items = "supplier"
                    item-text = "Suplier_Name"
                    item-value = "Supplier_ID"
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-select
                    v-model="editedItem.Category_CODE"
                    label="category"
                    :items = "category"
                    item-text = "code_name"
                    item-value = "code"
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.Unit" label="Unit"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.Unit_Weigh" label="Unit Weight"></v-text-field>
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
      :items="products"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs">{{ props.item.Product_ID }}</td>
        <td class="text-xs">{{ props.item.Kor_Name }}</td>
        <td class="text-xs">{{ props.item.Suplier_Name }}</td>
        <td class="text-xs">{{ props.item.code_name }}</td>
        <td class="text-xs">{{ props.item.Unit }}</td>
        <td class="text-xs">{{ props.item.Unit_Weigh }}</td>
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
    </v-data-table>
  </div>
</template>

<script>
export default {
    created () {
        this.$http.get('/api/products')
        .then((response) => {
            this.products = response.data
        }) 
        this.$http.get('/api/suppliers')
        .then((response) =>{
            this.supplier = response.data
        })
        this.$http.get('/api/categories')
        .then((response) =>{
            this.category = response.data
        })
        
    },
    data() {
        return {
            dialog: false,
            headers: [
                { text: 'ID', value: 'Product_ID' },
                { text: 'Name(Kor)', value: 'Kor_Name' },
                { text: 'Supplier', value: 'Supplier_ID' },
                { text: 'Category', value: 'Category_CODE' },
                { text: 'Unit', value: 'Unit' },
                { text: 'Unit Weight', value: 'Unit_Weigh', sortable: false  },
                { text: 'Action', sortable: false },
            ],
            products: [],
            supplier: [],
            category: [],
            editedIndex: -1,
            editedItem: {
                Product_ID: 0,
                Kor_Name: '',
                Supplier_ID: 0,
                Category_CODE: '',
                Unit: '',
                Unit_Weigh: ''
            },
            defaultItem: {
                Product_ID: 0,
                Kor_Name: '',
                Supplier_ID: 0,
                Category_CODE: '',
                Unit: '',
                Unit_Weigh: ''
            },
            selectedItem: {},
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },
    methods:{
        editItem(item) {    
            this.editedIndex = this.products.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.selectedItem = item
            this.dialog = true        
        },
        deleteItem(item) {
            confirm('Are you sure you want to delete?') &&
            this.$http.delete(`/api/products/delete/${item.Product_ID}`)
            .then((response) => {
            }).catch(function(error) {
                alert('Sorry, failed to delete!')
            }) 
            window.location.reload();
        },
        close() {
            this.dialog = false
            setTimeout( ()=>{
                this.editedItem = Object.assign( {}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
        save() {
            if(this.editedIndex >-1 ){
                this.$http.put('/api/products/edit/' + this.editedItem.Product_ID, {
                    Product_ID: this.editedItem.Product_ID,
                    Kor_Name: this.editedItem.Kor_Name,
                    Supplier_ID: this.editedItem.Supplier_ID,
                    Category_CODE: this.editedItem.Category_CODE,
                    Unit: this.editedItem.Unit,
                    Unit_Weigh: this.editedItem.Unit_Weigh
                }).then((response) => {
                alert('Edit succcessfully')
                }).catch(function(error){
                alert('Edit failed')
                })     
            } else {
                console.log(this.editedItem.Category_CODE)
                this.$http.post('/api/products/add', {
                    Product_ID: this.editedItem.Product_ID,
                    Kor_Name: this.editedItem.Kor_Name,
                    Eng_Name: '',
                    Supplier_ID: this.editedItem.Supplier_ID,
                    Category_CODE: this.editedItem.Category_CODE,
                    Unit: this.editedItem.Unit,
                    Unit_Weigh: this.editedItem.Unit_Weigh,
                    Price: 0
                }).then((response) => {
                    alert('Add succcessfully')
                }).catch(function(error){
                    alert('Add failed')
                })
            }
            window.location.reload()
        },
        clear() {
            if(this.editedIndex>-1) {
                // reset to edit item
                this.editItem(this.selectedItem)
            } else {
                // reset to add item
                console.log()
                this.editedItem = Object.assign( {}, this.defaultItem)
                this.editedIndex = -1 
            }
        }
    }
}
</script>
<style scoped>

</style>