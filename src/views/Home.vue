<template>
  <div>
    <!-- Header with logos and title -->
    <v-app-bar app color="#525b76" dark flat class="pa-md-4 mx-lg-auto" width="250px">
      <v-app-bar-title >
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
        <v-col cols="12">
          <v-card class="elevation-2">
            <v-card-text>
              <!-- Elements from left to right -->
              <v-row align="center">
                <!-- Text box -->
                <v-col cols="4">
                  <v-text-field v-model="textBoxValue" label="Text Box"></v-text-field>

                  <v-chip
                  v-for="(chip, index) in chips"
                  :key="index"
                  close
                  @click:close="removeChip(index)"
                  >
                  {{ chip }}
                  </v-chip>
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
              :items="desserts"
              class="elevation-1"
              item-key="name"
              items-per-page="5"
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
  data: () => ({
      textBoxValue: "",
      selectedRadio: "",
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
      ],
      headers: [
        [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
            rowspan: 2,
          },
          {
            title: 'Properties',
            key: 'foo',
            colspan: 5,
          },
        ],
        [
          { title: 'Calories', align: 'end', key: 'calories' },
          { title: 'Fat (g)', align: 'end', key: 'fat' },
          { title: 'Carbs (g)', align: 'end', key: 'carbs' },
          { title: 'Protein (g)', align: 'end', key: 'protein' },
          { title: 'Iron (%)', align: 'end', key: 'iron' },
        ],
      ],
      sortBy: "name",
      sortDesc: false,
      selectedItem: null, 
      chips: [],
    }),
  methods: {
    addItem() {
      if (this.textBoxValue) {
        this.chips.push(this.textBoxValue); // Add the value as a chip
        this.textBoxValue = ""; // Clear the text box
      }
    },
    removeChip(index) {
      this.chips.splice(index, 1); // Remove the chip at the specified index
    },
    go() {
      // GO button logic
    },
  },
};

</script>

<style>

</style>
