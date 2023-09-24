<template>
  <div>
    <!-- Header with logos and title -->
    <v-app-bar app color="primary" dark>
      <v-avatar>
        <v-img src="@/assets/logo1.png" alt="Logo 1"></v-img>
      </v-avatar>
      <v-toolbar-title class="mx-4">Book Buddy</v-toolbar-title>
      <v-avatar>
        <v-img src="@/assets/logo2.png" alt="Logo 2"></v-img>
      </v-avatar>
    </v-app-bar>

    <!-- Main content area -->
    <v-container fluid>
      <!-- Light blue container -->
      <v-row>
        <v-col cols="12">
          <v-card class="elevation-2">
            <v-card-text>
              <!-- Elements from left to right -->
              <v-row align="center">
                <!-- Text box -->
                <v-col cols="4">
                  <v-text-field v-model="textBoxValue" label="Text Box"></v-text-field>
                </v-col>

                <!-- Add button -->
                <v-col cols="2">
                  <v-btn color="primary" @click="addItem">Add</v-btn>
                </v-col>

                <!-- Darker blue container with radio buttons -->
                <v-col cols="4">
                  <v-card class="elevation-2" color="blue darken-2">
                    <v-card-text>
                      <v-radio-group v-model="selectedRadio" column>
                        <v-radio label="Option 1" value="Option 1"></v-radio>
                        <v-radio label="Option 2" value="Option 2"></v-radio>
                        <v-radio label="Option 3" value="Option 3"></v-radio>
                      </v-radio-group>
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
                :headers="headers"
                :items="tableData"
                :sort-by="sortBy"
                :sort-desc="sortDesc"
                multi-sort
                show-select
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textBoxValue: "",
      selectedRadio: "",
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Age", value: "age", sortable: true },
      ],
      tableData: [
        { name: "John", age: 30 },
        { name: "Alice", age: 25 },
        { name: "Bob", age: 35 },
      ],
      sortBy: "name",
      sortDesc: false,
    };
  },
  methods: {
    addItem() {
      // Add item logic
    },
    go() {
      // GO button logic
    },
  },
};
</script>
