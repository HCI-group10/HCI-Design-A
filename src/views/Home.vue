<template>
  <v-app>
    <div class="whole-app">
      <div class="banner">
        <v-avatar size="140">
          <v-img src="@/assets/logo.png" alt="Logo 1"></v-img>
        </v-avatar>

        <span style="padding: 20%"> Book Buddy </span>

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
                    <v-text-field
                      class="text-field"
                      variant="solo-filled"
                      v-model="textBoxValue"
                      label="Add course by course code"
                    ></v-text-field>

                    <v-chip
                      variant="outlined"
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
                  <v-col>
                    <v-card color="#FFFFFF">
                      <v-card-text>
                        <v-row>
                          <v-switch
                            class="custom-sw"
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
                <v-data-table
                  color="#FFFFFF"
                  :headers="visibleHeaders"
                  :items="textbooks"
                  item-key="key"
                  items-per-page="5"
                >
                  <template v-slot:[`item.moreinfo`]="{ item }">
                    <v-btn @click="openModal(item)" color="primary" dark
                      >More Info</v-btn
                    >
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="modalOpen" max-width="600">
          <v-card>
            <v-toolbar flat color="primary">
              <v-spacer></v-spacer>
              <v-btn icon @click="modalOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-title class="d-flex justify-center headline">{{
              selectedTextbook.title
            }}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <div>
                      <strong>Author:</strong> {{ selectedTextbook.author }}
                    </div>
                    <div>
                      <strong>ISBN:</strong> {{ selectedTextbook.isbn }}
                    </div>
                    <div>
                      <strong>Edition:</strong> {{ selectedTextbook.edition }}
                    </div>
                    <div>
                      <strong>Publisher:</strong>
                      {{ selectedTextbook.publisher }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div>
                      <strong>Requirement:</strong>
                      {{ selectedTextbook.textis }}
                    </div>
                    <div>
                      <strong>New Retail Price:</strong>
                      {{ selectedTextbook.newretailprice }}
                    </div>
                    <div>
                      <strong>Used Retail Price:</strong>
                      {{ selectedTextbook.usedretailprice }}
                    </div>
                    <div>
                      <strong>Used Rental Fee:</strong>
                      {{ selectedTextbook.usedrentalfee }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn color="primary" @click="openLink('amazon')" outlined
                >Buy from Amazon</v-btn
              >
              <v-btn color="primary" @click="openLink('google')" outlined
                >Buy from Google</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    modalOpen: false,
    selectedTextbook: {},
    sortBy: "name",
    sortDesc: false,
    selectedItem: null,
    chips: [],
    headerVisibility: [],
    textbooks: [],
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
        key: "newretailprice",
        visible: true,
      },
      {
        title: "Used Retail Price",
        align: "end",
        sortable: true,
        key: "usedretailprice",
        visible: true,
      },
      {
        title: "Used Rental Fee",
        align: "end",
        sortable: false,
        key: "usedrentalfee",
        visible: true,
      },
      {
        title: "Requirement",
        align: "end",
        sortable: false,
        key: "textis",
        visible: true,
      },
      {
        title: "More Info",
        align: "end",
        sortable: false,
        key: "moreinfo",
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
    async go() {
      // GO button logic
      //call get class info for each item in chips
      //if exists store
      //if class doesn't exist sent alert that it didn't work and skip (TODO)

      let validCourses = await this.getClassInfo();

      //run through each item stored and create url then search up table data
      //parse table data to create items
      //add said items to textbooks object

      this.textbooks = [];

      for (let course of validCourses) {
        //{classId, classnumber} objects
        const url = `https://www.bsd.ufl.edu/textadoption/studentview/displayadoption1sect.aspx?SECT=${course.classNumber}&YEAR=23&TERM=8`;

        const data = await this.fetchData(url);

        if (data) {
          // Assuming 'data' is the array you want to append to 'textbooks'

          data.forEach((book) => {
            this.textbooks.push(book);
          });
        }
      }
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
                  tempObject["textis"] = restOfKey.toUpperCase();
                }
              });

            if (Object.keys(tempObject).length > 0) {
              data.push(tempObject);
              tempObject = {};
            }
          });

          return this.fixArray(data);
        } else {
          return "Table with class 'books' not found.";
        }
      } catch (error) {
        return `Error fetching URL. ${error}`;
      }
    },
    async generateTextbookLinkGoog(title, author, isbn) {
      const baseUrl = "https://www.googleapis.com/books/v1/volumes";
      const query = `intitle:${title}+inauthor:${author}`;
      const encodedQuery = encodeURIComponent(query);
      const url = `${baseUrl}?q=${encodedQuery}`;

      try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.items && data.items.length > 0) {
          const book = data.items[0];
          const infoLink = book.volumeInfo.infoLink;
          return infoLink ? infoLink : "";
        } else {
          return "";
        }
      } catch (error) {
        console.error(
          "Error fetching book information from Google Books API: ",
          error
        );
        return "";
      }
    },
    generateTextbookLinkAmazon(title, author, isbn) {
      const baseUrl = "https://www.amazon.com/s?";
      const encodedTitle = encodeURIComponent(title);
      const encodedAuthor = encodeURIComponent(author);
      const encodedIsbn = isbn ? encodeURIComponent(isbn) : "";

      let urlParameters = `k=${encodedTitle}+${encodedAuthor}+textbook&i=stripbooks`;
      if (encodedIsbn !== "") {
        urlParameters += `&field-isbn=${encodedIsbn}`;
      }

      return baseUrl + urlParameters;
    },
    async openLink(source) {
      let link = "";
      if (source === "amazon") {
        link = this.generateTextbookLinkAmazon(
          this.selectedTextbook.title,
          this.selectedTextbook.author,
          this.selectedTextbook.isbn
        );
      } else if (source === "google") {
        link = await this.generateTextbookLinkGoog(
          this.selectedTextbook.title,
          this.selectedTextbook.author,
          this.selectedTextbook.isbn
        );
      }
      if (link) {
        window.open(link, "_blank");
      } else {
        console.log("ERROR WITH LINK");
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
    openModal(item) {
      const {
        title,
        author,
        isbn,
        edition,
        publisher,
        newretailprice,
        usedretailprice,
        usedrentalfee,
        textis,
      } = item.columns;

      this.selectedTextbook = {
        title,
        author,
        isbn,
        edition,
        publisher,
        newretailprice,
        usedretailprice,
        usedrentalfee,
        textis,
      };
      this.modalOpen = true;
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
  background-color: #ffffff;
  padding: 15px;
  font-family: "IBM Plex Sans Condensed", sans-serif;
  font-weight: 400;
}

.banner {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  text-align: center;
  background: #525b76;
  color: #f9f7f3;
  font-size: 80px;
  border-radius: 3px 3px 3px 3px;
  font-family: "IBM Plex Sans Condensed", sans-serif;
  font-weight: 400;
}

.light-blue-container {
  background-color: #d9f0fc;
}

.text-field {
  color: #ffffff;
}

.custom-btn {
  background-color: #f7a072 !important;
  color: #ffffff !important;
}

.custom-sw {
  width: 20%;
}
</style>
