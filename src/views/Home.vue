<template>
  <div>
    <!-- Header with logos and title -->
    <v-app-bar
      app
      color="primary"
      dark
      flat
      class="pa-md-4 mx-lg-auto"
      width="250px"
    >
      <v-app-bar-title>
        <div class="text-center" display="flex">
          <v-avatar size="60">
            <v-img src="@/assets/logo.png" alt="Logo 1"></v-img>
          </v-avatar>
          Book Buddy
          <v-avatar size="60">
            <v-img src="@/assets/logo.png" alt="Logo 2"></v-img>
          </v-avatar>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <!-- Main content area -->
    <v-container fluid>
      <!-- Light blue container -->
      <v-row>
        <v-col>
          <v-card class="elevation-2">
            <v-card-text>
              <!-- Elements from left to right -->
              <v-row align="center">
                <!-- Text box -->
                <v-col cols="4">
                  <v-text-field
                    v-model="textBoxValue"
                    label="Add course by course code"
                  ></v-text-field>

                  <v-chip
                    v-for="(chip, index) in chips"
                    :key="index"
                    closable
                    color="secondary"
                  >
                    {{ chip }}
                  </v-chip>
                </v-col>

                <!-- Add button -->
                <v-col cols="2">
                  <v-btn color="primary" @click="addItem">Add</v-btn>
                </v-col>

                <!-- Darker blue container with radio buttons -->

                <v-col>
                  <v-card color="tertiary">
                    <v-card-text>
                      <v-row>
                        <v-switch
                          v-for="(header, index) in headers"
                          :key="index"
                          v-model="headerVisibility[index]"
                          @change="toggleColumn(index)"
                          :label="header.title"
                          :color="'orange darken-2'"
                        ></v-switch>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- GO button -->
                <v-col cols="2">
                  <v-btn color="primary" @click="go">GO</v-btn>
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
            <v-card-text>
              <v-data-table
                :headers="visibleHeaders"
                :items="textbooks"
                class="elevation-1"
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
        cover: "N/A",
        author: "JAMES KUROSE, KEITH ROSS",
        edition: "7TH",
        copyright: "",
        publisher: "PEARSON",
        newRetailPrice: "$210.50",
        usedRetailPrice: "$158.00",
        usedRentalFee: "$88.41",
      },
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
        title: "Cover",
        align: "end",
        sortable: true,
        key: "cover",
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
        title: "Copyright",
        align: "end",
        sortable: true,
        key: "copyright",
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

<style></style>
