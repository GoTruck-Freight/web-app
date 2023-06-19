<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { VDataTable } from 'vuetify/labs/VDataTable'
import ItemType from '@/types/OrdersData'

export default defineComponent({
  name: "OrderListComponent",
  components: {
    VDataTable
  },
  data() {
    return {
      orders: [],
      itemsPerPage: 5,
      dialog: false,
      dialogDelete: false,
      status: '',
      selectedStatus: '',
      id: '',
      headers: [
        { title: 'Date', align: 'end', key: 'created_at' },
        { title: 'Origin', align: 'end', key: 'origin', sortable: false },
        { title: 'Destination', align: 'end', key: 'destination', sortable: false },
        { title: 'Min payment', align: 'end', key: 'minpayment' },
        { title: 'Max payment', align: 'end', key: 'maxpayment' },
        { title: 'Ideal payment', align: 'end', key: 'payment' },
        { title: 'Status', align: 'end', sortable: false, key: 'status' },
        { title: 'Propsal payment', align: 'end', key: 'propsalpayment' },
        { title: 'Action', key: 'actions', sortable: false, width: '100px' }
      ],
      editedIndex: -1,
      editedItem: {
        _id: ""
      },
      defaultItem: {
        _id: ''
      },
    }
  },
  methods: {
    ...mapActions(['getOrders', 'deleteOrder', 'getStatusbyName', 'getStatus', 'updateOrder']),
    async getItems() {
      let orders = await this.getOrders()
      this.orders = orders.data
    },
    async getDefaultStatus() {
      const arr = await this.getStatus()
      this.status = arr
    },
    deleteItemConfirm () {
      if (this.editedIndex !== -1) {
        this.deleteOrder(this.id)
        this.orders.splice(this.editedIndex, 1);
      }
      this.closeDelete()
    },
    deleteItem(item: {_id: string}): void {
      // Perform the delete operation on the item
      // For example, you can remove it from an array of items
      this.id = item._id
      this.editedIndex = this.orders.indexOf(item)
      this.dialogDelete = true
    },
    editItem(item: ItemType) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          // this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    async saveOrderStatus() {
      const arr = await this.getStatusbyName(this.selectedStatus)
      const data = {
        'id': this.editedItem._id,
        'status': {
          "status": arr.shift()
        }
      }
      const item = await this.updateOrder(data)
      this.orders[this.editedIndex] = item
      this.selectedStatus = ''
      this.dialog = false
    },
    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.dialog = false
    },


  },
  mounted() {
    this.getItems()
    this.getDefaultStatus()
  },

})

</script>
<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="home-tab">
        <div class="tab-content tab-content-basic">
          <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
            <div class="row">
              <div class="col-lg-12 d-flex flex-column">
                <div class="row flex-grow">
                  <div class="col-12 grid-margin stretch-card">
                    <div class="card card-rounded">
                      <div class="card-body">
                        <div class="d-sm-flex justify-content-between align-items-start">
                          <div>
                            <h4 class="card-title card-title-dash">Pending Requests</h4>
                            <p class="card-subtitle card-subtitle-dash">You have 50+ new requests</p>
                          </div>
                        </div>
                        <div class="table-responsive  mt-1">
                          <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="orders"
                            :sort-by="[{ key: 'created_at', order: 'desc' }]" item-value="name" class="elevation-1">

                            <template v-slot:item.status="{ item }">
                              <span>{{ item.raw.status.name }}</span>
                            </template>
                            <template v-slot:top>
                              <v-dialog v-model="dialog" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5"></span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" md="12">
                                          <v-select label="Select" :items="status" v-model="selectedStatus"
                                            item-title="name"></v-select>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="saveOrderStatus()">
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                  <v-card-title class="text-h5">Are you sure you want to delete this
                                    item?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                              <v-icon size="small" class="me-2" @click="editItem(item.raw)">
                                mdi-pencil
                              </v-icon>
                              <v-icon small class="mr-2" @click="deleteItem(item.raw)">mdi-delete</v-icon>
                            </template>
                          </v-data-table>
                        </div>
                      </div>
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>