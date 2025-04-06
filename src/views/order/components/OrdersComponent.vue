<script>
import axios from 'axios';
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';
import { mapGetters } from 'vuex';
import { toCurrency } from '@/helpers/text_format';
import { jsPDF } from "jspdf";
// import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';

export default {
    name: 'OrdersComponent',
    setup() {return { toCurrency }},
    components: {
        TablePaginationComponent,
        // VueImageZoomer
    },
    data() {
        return {
          table_headers: [
                {
                    label: 'Name'
                },
                {
                    label: 'Order Date'
                },
                {
                    label: 'Total'
                },
                {
                    label: 'Actions'
                },
            ],
            orders: [],
            meta: {},
            filter : {
                order_by: 'asc',
                sort_by: 'created_at',
                per_page: 12,
                data: null
            },
            order_id: null,
            order_details: null,
            order_headers: [
                {
                    label: 'Name',
                },
                {
                    label: 'Quantity'
                },
                {
                    label: 'Price'
                }
            ]
        }
    },
    computed: {
      ...mapGetters({
          token: 'getToken'
      })
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
      async fetchOrders(url = null) {
          axios.get(url ? url : `/v1/checkout/paginate`, {
              params: this.filter,
              headers: {
                  Authorization: 'Bearer ' + this.token,
              }
          }).then((response) => {
              this.orders = response.data.data;
              this.meta = response.data.meta;
          });
      },
      refreshTable({
            url = undefined, 
            per_page = 10
        }){
            this.filter.per_page = per_page;
            this.fetchOrders(url);
      },
      generateReceipt(items) {
          const doc = new jsPDF({
            orientation: "p",
            unit: "in",
            format: [4, 6],
          });
          doc.setProperties({
              title: "e-Receipt"
          });

          // Set header information
          doc.setFont("times", "bold");
          doc.setFontSize(16);
          doc.text("Momecoph", 1.45, 0.5);
          doc.setFont("times", "normal");
          doc.setFontSize(10);
          doc.text("Eco Materials and Skincare", 1.25, 0.7);

          // Draw a green rectangle for the header
          doc.setFillColor(0, 114, 0);
          doc.rect(0, 1, 4, 0.05, "F");

          // Draw the item list header
          let yPosition = 1.35;
          doc.setFont("times", "bold");
          doc.text("Item", 0.2, yPosition);
          doc.text("Quantity", 2, yPosition);
          doc.text("Price", 3, yPosition);

          // Set normal font for item list
          doc.setFont("times", "normal");
          yPosition += 0.2;

          // Loop through items and display each one
          items.forEach(item => {
            if (Array.isArray(item)) {
              // Handle nested array if applicable
              item.forEach(subItem => {
                doc.text(subItem.name, 0.2, yPosition);
                doc.text(subItem.quantity.toString(), 2, yPosition);
                doc.text("$" + subItem.price, 3, yPosition);
                yPosition += 0.2;
              });
            } else {
              // Handle the main item
              doc.text(item.name, 0.2, yPosition);
              doc.text(item.quantity.toString(), 2, yPosition);
              doc.text("" + item.price, 3, yPosition);
              yPosition += 0.2;
            }
          });

          // Calculate and display the total price
          const totalPrice = items.reduce((total, item) => {
            if (Array.isArray(item)) {
              return total + item.reduce((subTotal, subItem) => subTotal + (subItem.price * subItem.quantity), 0);
            }
            return total + (item.price * item.quantity);
          }, 0);

          // Display the total price
          doc.setFont("times", "bold");
          doc.text("Total Price: " + totalPrice, 2.6, 5);

          doc.setFont("times", "normal");
          doc.text('website: https://momecoph.shop', 0.2, 5.5);
          doc.text('tiktok: https://www.tiktok.com/@momeco.ph', 0.2, 5.7);

          // Save the PDF
          // doc.save("receipt.pdf");
          doc.output("dataurlnewwindow");
        },
        async updatePaymentStatus(status) {
          let payload = {
              status: status,
              id: this.order_id
          }
          await this.$store.dispatch('UPDATE_PAYMENT_STATUS', payload).then((response) => {
            if(response) {
              this.fetchOrders();
              this.$refs.closePymentDetails.click();
            }
          })
        }
    }
} 
</script>
<template>
  <!-- <div class="col-12 text-md-end mb-2 d-flex align-items-center flex-wrap gap-3">
    <div class="col-auto order-2 order-md-1">
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
          <input type="text" class="form-control p-2 px-3" id="floatingInputGroup1" placeholder="Search" @keydown.enter="searchProducts()" v-model="filter.data">
      </div>
    </div>
  </div> -->
  <img id="imagePreview" src="../../../assets/images/e-receipt.png" alt="Preview" hidden/>
  <div class="table-responsive table-lg">
    <table class="table align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr class="table-header">
          <th v-for="header in table_headers" :key="header">{{ header.label }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="orders.length > 0">            
          <tr v-for="order in orders" :key="order">
            <td>
              <p class="fw-bold mb-1">{{ order.user_details.name }}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">{{ order.order_date }}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">{{ toCurrency(order.total) }}</p>
            </td>
            <td>
              <div class="d-flex gap-3">
                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" data-bs-target="#paymentDetails" data-bs-toggle="modal" v-if="order.status == 'pending'" @click="order_id = order.id">
                  <i class="isax isax-money-2"></i>
                  <span>Payment</span>
                </div>
                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" v-if="order.status == 'approved'" data-bs-target="#viewOrderDetails" data-bs-toggle="modal" @click="order_details = order">
                  <i class="isax isax-eye"></i>
                  <span>View Details</span>
                </div>
                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="generateReceipt(order.items)" v-if="order.status == 'approved'">
                  <i class="isax isax-receipt-1"></i>
                  <span> Receipt</span>
                </div>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
            <tr><td colspan="9" class="p-3 text-center">There are no items to be displayed</td></tr>
        </template>
      </tbody>
    </table>
  </div>
  <TablePaginationComponent :meta="meta" @refreshTable="refreshTable"></TablePaginationComponent>

  <div class="modal fade" id="paymentDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmationProductLabel">Payment Confirmation</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="order_id = null" ref="closePymentDetails"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center align-items-center flex-wrap gap-3">
            <div class="col-12 text-center">
              <img src="https://placehold.co/600x1000" alt="payment" class="w-100 h-100"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-2" @click="updatePaymentStatus('approved')">Approved</button>
          <button type="button" class="btn btn-1" data-bs-dismiss="modal" @click="updatePaymentStatus('denied')">Declined</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div class="modal fade" id="viewOrderDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="confirmationProductLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title g-heading-2" id="confirmationProductLabel">Order Details</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="order_details = null"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="col-12 col-md-6">
                <p class="r-paragraph mb-0 mb-2"><span class="fw-bold g-heading-3 mb-0">Customer Name:</span> {{ order_details?.user_details?.name }}</p>
            </div>
            <div class="col-12 col-md-6">
                <p class="r-paragraph mb-0 mb-2"><span class="fw-bold g-heading-3 mb-0">Address:</span> {{ order_details?.user_details?.address }}</p>
            </div>
            <div class="col-12 col-md-6">
                <p class="r-paragraph"><span class="fw-bold g-heading-3">Contact No.:</span> {{ order_details?.user_details?.mobile_no }}</p>
            </div>
          </div>
          <div class="table-responsive table-auto">
              <table class="table align-middle mb-0 bg-white">
                  <thead class="bg-light">
                    <tr class="table-header">
                      <th v-for="order in order_headers" :key="order">{{ order.label }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in order_details?.items" :key="order">
                      <td>
                          <div class="d-flex align-items-center">
                              <img
                                :src="order.img_url"
                                :alt="order.name"
                                style="width: 45px; height: 45px"
                                class="rounded-circle"
                              />
                              <div class="ms-3">
                                <p class="fw-bold mb-1">{{ order.name }}</p>
                              </div>
                          </div>
                      </td>
                      <td>
                          <p class="fw-normal mb-1">{{ order.quantity }}</p>
                      </td>
                      <td>
                          <p class="fw-normal mb-1">{{ toCurrency(order.quantity * order.price) }}</p>
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-2">Update Status</button>
          <button type="button" class="btn btn-1" data-bs-dismiss="modal" ref="closeConfirmationModal" @click="order_details = null">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template> 