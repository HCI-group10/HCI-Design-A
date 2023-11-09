<template>
  <v-banner
    class="d-flex flex-row-reverse"
    :style="{ backgroundColor: bannerBackgroundColor }"
  >
    Design A
    <v-switch
      class="design-switch"
      v-model="designSwitch"
      @change="setDesign"
    ></v-switch>
    Design B
  </v-banner>
  <div class="launch-page">
    <div class="centered-content">
      <h1 class="title">Welcome to Book Buddy</h1>
      <p class="description">
        Your one-stop solution for effortlessly managing your class materials.
      </p>
      <div class="instructions">
        <ol>
          <li>Enter your class codes in the search bar.</li>
          <li>Click the "Go" button.</li>
          <li>
            We'll retrieve all the textbook information you need for your
            courses.
          </li>
        </ol>
      </div>
      <button @click="redirectToHome" class="btn-primary">Let's Go</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      designSwitch: false, // Initial state of the switch
      bannerBackgroundColor: "#d9f0fc",
    };
  },
  methods: {
    redirectToHome() {
      // You can use router navigation to go to the Home page or any other desired route
      this.$router.push({
        name: "Home",
        params: { design: this.designSwitch ? "B" : "A" },
      }); // Change 'Home' to the actual name of your home route
    },
    setDesign() {
      // Set the design variable based on the state of the switch
      this.design = this.designSwitch ? "B" : "A";
    },
  },
};
</script>

<style scoped>
.banner {
  background-color: #d9f0fc;
  padding: 20px;
}
.launch-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #d9f0fc; /* Blue background color */
}

.centered-content {
  text-align: center;
  padding: 20px;
  background-color: #f9f7f3; /* White content background color */
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Box shadow for content */
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #525b76; /* Blue title color */
  font-family: "IBM Plex Sans Condensed", sans-serif;
  font-weight: 700;
}

.description {
  font-size: 18px;
  margin-bottom: 20px;
  font-family: "IBM Plex Sans Condensed", sans-serif;
  font-weight: 400;
}

.instructions {
  font-size: 16px;
  margin-bottom: 20px;
  font-family: "IBM Plex Sans Condensed", sans-serif;
  font-weight: 400;
}

ol {
  text-align: left;
  margin-left: 20px;
}

.btn-primary {
  font-size: 24px;
  padding: 10px 20px;
  background-color: #f7a072; /* Orange button background color */
  color: #fff; /* Button text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "IBM Plex Sans Condensed", sans-serif;
  font-weight: 400;
}

.btn-primary:hover {
  background-color: #e98149; /* Orange button background color on hover */
}
</style>
