<template>
  <v-app>
  <div class="whole-app">
    <div class="banner">
      <v-avatar size="140">
        <v-img src="@/assets/logo.png" alt="Logo 1"></v-img>
      </v-avatar>

      <span style='padding: 20%'>
        Book Buddy
      </span>

      <v-avatar size="140">
        <v-img src="@/assets/logo.png" alt="Logo 2"></v-img>
      </v-avatar>
    </div>

    <!-- Main content area -->
    <v-container fluid>
      <!-- Light blue container -->
      <v-row>
        <v-col>
          <v-card class="elevation-2, light-blue-container">
            <v-card-text>
              <!-- Elements from left to right -->
              <v-row align="center">
                <!-- Text box -->
                <v-col cols="4">
                  <v-text-field class="text-field" variant="solo-filled"
                    v-model="textBoxValue"
                    label="Add course by course code"
                  ></v-text-field>

                  <v-chip variant="outlined"
                    v-for="(chip, index) in chips"
                    :key="index"
                    closable
                    color="tertiary"
                  >
                    {{ chip }}
                  </v-chip>
                </v-col>

                <!-- Add button -->
                <v-col cols="1">
                  <v-btn class="custom-btn" @click="addItem">Add</v-btn>
                </v-col>

                <!-- Darker blue container with radio buttons -->
                <v-col >
                  <v-card color="#FFFFFF">
                    <v-card-text>
                      <v-row> 
                        <v-switch class="custom-sw"
                            v-for="(header, index) in headers"
                            :key="index"
                            v-model="headerVisibility[index]"
                            @change="toggleColumn(index)"
                            :label="header.title"
                            :color="'tertiary'"
                          ></v-switch>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- GO button -->
                <v-col cols="1">
                  <v-btn class="custom-btn" @click="go">GO</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Table with sortable headers -->
      <v-row>
        <v-col cols="12">
          <v-card class="elevation-2">
            <v-card-text color="#FFFFFF">
              <v-data-table color="#FFFFFF"
                :headers="visibleHeaders"
                :items="textbooks"
                item-key="key"
                items-per-page="5"
              >
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  
  </div>
</v-app>
</template>

<script>
export default {
  data: () => ({
    // Your existing data properties...
    textBoxValue: "",
    selectedRadio: "",
    sortBy: "name",
    sortDesc: false,
    selectedItem: null,
    chips: [],
    headerVisibility: [],
    textbooks: [
      {
        title: "COMPUTER NETWORKING: A TOP-DOWN APPROACH",
        isbn: "9780133594140",
        author: "JAMES KUROSE, KEITH ROSS",
        edition: "7TH",
        publisher: "PEARSON",
        newRetailPrice: "$210.50",
        usedRetailPrice: "$158.00",
        usedRentalFee: "$88.41",
      },
      {
        title: "COMPUTER NETWORKING: A TOP-DOWN APPROACH",
        isbn: "9780133594140",
        author: "JAMES KUROSE, KEITH ROSS",
        edition: "7TH",
        publisher: "PEARSON",
        newRetailPrice: "$210.50",
        usedRetailPrice: "$158.00",
        usedRentalFee: "$88.41",
      }
      // You can add more textbook entries if needed
    ],
    headers: [
      {
        title: "Title",
        align: "start",
        sortable: true,
        key: "title",
        visible: true,
      },
      {
        title: "ISBN",
        align: "end",
        sortable: true,
        key: "isbn",
        visible: true,
      },
      {
        title: "Author",
        align: "end",
        sortable: true,
        key: "author",
        visible: true,
      },
      {
        title: "Edition",
        align: "end",
        sortable: true,
        key: "edition",
        visible: true,
      },
      {
        title: "Publisher",
        align: "end",
        sortable: true,
        key: "publisher",
        visible: true,
      },
      {
        title: "New Retail Price",
        align: "end",
        sortable: true,
        key: "newRetailPrice",
        visible: true,
      },
      {
        title: "Used Retail Price",
        align: "end",
        sortable: true,
        key: "usedRetailPrice",
        visible: true,
      },
      {
        title: "Used Rental Fee",
        align: "end",
        sortable: false,
        key: "usedRentalFee",
        visible: true,
      },
    ],
  }),
  methods: {
    addItem() {
      if (this.textBoxValue) {
        this.chips.push(this.textBoxValue); // Add the value as a chip
        this.textBoxValue = ""; // Clear the text box
      }
    },
    removeChip(index) {
      this.chips.splice(index, 1);
    },
    go() {
      // GO button logic
    },
    toggleColumn(index) {
      // Toggle the visibility of the header/column
      this.headers[index].visible = !this.headers[index].visible;
    },
    saveHeaderVisibility() {
      // Save header visibility to localStorage
      localStorage.setItem(
        "headerVisibility",
        JSON.stringify(this.headerVisibility)
      );
    },
    loadHeaderVisibility() {
      // Load header visibility from localStorage

      const storedVisibility = localStorage.getItem("headerVisibility");
      if (storedVisibility) {
        this.headerVisibility = JSON.parse(storedVisibility);
      }
    },
  },
  computed: {
    visibleHeaders() {
      // Filter out headers that have visible set to true
      return this.headers.filter((header) => header.visible);
    },
  },
  mounted() {
    // Initialize headerVisibility with true values for all headers
    this.headerVisibility = Array.from(
      { length: this.headers.length },
      () => true
    );
  },
};
</script>

<style>
  .whole-app {
    background-color: #FFFFFF;
    padding: 15px;
    font-family: 'Epilogue', sans-serif;
    font-weight: 400;
  }
  
  .banner {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
    text-align: center;
    background: #525b76;
    color: #F9F7F3;
    font-size: 60px;
    border-radius: 3px 3px 3px 3px;
    font-family: 'Epilogue', sans-serif;
    font-weight: 700;
  }

  .light-blue-container {
    background-color: #D9F0FC;
  }

  .text-field {
    color: #F9F7F3;
  }

  .custom-btn {
    background-color: #F7A072 !important;
    color: #F9F7F3 !important;
  }

  .custom-sw {
    width: 20%;
  }
</style>
