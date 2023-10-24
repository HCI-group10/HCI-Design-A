<template>
  <v-app>
    <div class="whole-app">
      <div class="banner">
        <v-avatar size="140">
          <v-img src="@/assets/logo.png" alt="Logo 1"></v-img>
        </v-avatar>

        <span style="padding: 25%"> Book Buddy </span>

        <v-avatar size="140">
          <v-img src="@/assets/logo.png" alt="Logo 2"></v-img>
        </v-avatar>
      </div>

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
  </v-app>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";

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
      //call get class info for each item in chips
      //if exists store
      //if class doesn't exist sent alert that it didn't work and skip (TODO)

      let validCourses = this.getClassInfo();

      console.log(validCourses);

      //run through each item stored and create url then search up table data
      //parse table data to create items
      //add said items to textbooks object

      validCourses.forEach((course) => {
        //{classId, classnumber} objects
        const url = `https://www.bsd.ufl.edu/textadoption/studentview/displayadoption1sect.aspx?SECT=${course.classNumber}&YEAR=23&TERM=8`;

        const data = this.fetchData(url);
        if (html) {
          console.log(fixArray(data));
          textbooks = fixArray(data);
        }
      });
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
    async getClassInfo() {
      let validCourses = [];
      let invalidCourse = [];

      const courses = this.chips.map((element) =>
        element.split(" ").join("").toUpperCase()
      ); //remove whitespace and make upper case just in case the user gets funky with it

      for (let classId of courses) {
        try {
          const apiString = `https://one.ufl.edu/apix/soc/schedule/?category=RES&term=2238&course-code=${classId}`;
          const response = await axios.get(apiString);
          const data = response.data;

          if (
            data &&
            Array.isArray(data) &&
            data.length > 0 &&
            data[0].COURSES &&
            Array.isArray(data[0].COURSES) &&
            data[0].COURSES.length > 0
          ) {
            const classNumber = data[0].COURSES[0].sections[0].classNumber;
            validCourses.push({ classId, classNumber });
          } else {
            const classNumber = data[0].COURSES[0].sections[0].classNumber;
            invalidCourse.push({ classId, classNumber });
            console.log(
              `COURSES array is empty or not found for class ${classId}. Skipping...`
            );
          }
        } catch (error) {
          console.error(`Error fetching URL for class ${classId}: ${error}`);
        }
      }

      return validCourses;
    },
    async fetchData(url) {
      try {
        const response = await axios.get(url); //fetches html
        const htmlContent = response.data;
        const $ = cheerio.load(htmlContent); //creates a query item out of html
        const table = $("table.books");

        if (table) {
          const data = [];
          const rows = $("table.books tbody tr");

          const requiredInfo = [
            //teh stuff we want :)
            "Title",
            "ISBN",
            "Cover",
            "Author",
            "Edition",
            "Copyright",
            "Publisher",
            "NewRetailPrice",
            "UsedRetailPrice",
            "NewRentalFee",
            "UsedRentalFee",
          ];

          let tempObject = {};

          //goes through each row and grabs every key possible but filters it to just the stuff we want
          rows.each((index, element) => {
            $(element)
              .find("td")
              .each((i, el) => {
                const key = $(el).text().trim().replace(":", ""); // Get the key for the object
                const value = $(el).next("td.books").text().trim(); // Get the value for the key
                // Store the data if it is required information
                const trimmedKey = key.trim();
                const normalizedKey = trimmedKey.replace(/\s/g, ""); // remove spaces
                if (key && requiredInfo.includes(normalizedKey)) {
                  tempObject[normalizedKey.toLowerCase()] = value; //set to lowercase and add
                }

                if (normalizedKey.startsWith("Thistextis")) {
                  const restOfKey = normalizedKey.substring(
                    "Thistextis".length
                  );
                  tempObject["TextIs?"] = restOfKey;
                }
              });

            if (Object.keys(tempObject).length > 0) {
              data.push(tempObject);
              tempObject = {};
            }
          });

          return fixArray(data);
        } else {
          return "Table with class 'books' not found.";
        }
      } catch (error) {
        return `Error fetching URL. ${error}`;
      }
    },
    fixArray(arr) {
      // Combine every four array items because the website set up their table in the worst way possible
      const combinedObjects = [];
      for (let i = 0; i < arr.length; i += 4) {
        const combined = {};
        for (let j = 0; j < 4 && i + j < arr.length; j++) {
          Object.assign(combined, arr[i + j]);
        }
        combinedObjects.push(combined);
      }

      return combinedObjects;
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
  background-color: #f9f7f3;
  padding: 15px;
}

.banner {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  text-align: center;
  background: #525b76;
  color: #f9f7f3;
  font-size: 50px;
  border-radius: 10px 10px 10px 10px;
}
</style>
