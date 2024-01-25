<template>
  <section class="app-content">
    <div class="container">
      <h1>Circular Objects</h1>
      <div ref="wrapper" class="content-wrapper"></div>
      <div class="buttons flex-center">
        <div
          class="circle-button"
          @click="circleCount > 0 ? circleCount-- : ''"
        >
          REMOVE
        </div>
        <div class="circle-counter">{{ circleCount }}</div>
        <div class="circle-button" @click="circleCount++">ADD</div>
      </div>
    </div>
  </section>
</template>

<script>
import Circle from "../circle";
export default {
  data() {
    return {
      circles: [],
      circleCount: 10,
    };
  },
  watch: {
    circleCount(newCount, oldCount) {
      console.log(newCount, oldCount);
      if (newCount > oldCount) {
        this.circles.push(new Circle(this.$refs.wrapper));
      } else {
        this.circles.at(-1).deleteCircle();
        this.circles.pop();
      }
    },
  },
  methods: {
    spawnCircles() {
      for (let i = 1; i <= this.circleCount; i++) {
        this.circles.push(new Circle(this.$refs.wrapper));
      }

      const that = this;
      function animate() {
        that.circles.forEach((circle) => circle.moveCircle());
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    },
  },
  mounted() {
    this.spawnCircles();
  },
};
</script>

<style lang="scss" scoped>
.app-content {
  overflow: auto;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    h1 {
      color: rgba(55, 63, 60, 0.7);
      font-size: 42px;
      text-transform: uppercase;
      text-align: center;
      font-weight: 300;
      margin-bottom: 24px;
    }
    h2 {
      color: rgba(55, 63, 60, 0.4);
      font-size: 24px;
      text-transform: uppercase;
      text-align: center;
      font-weight: 300;
      padding: 30px;
    }
    .content-wrapper {
      position: relative;
      flex: 1;
      overflow: hidden;
      border: 6px solid rgba(0, 185, 108, 0.5);
      border-radius: 25px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
    }
    .buttons {
      text-align: center;
      color: rgba(0, 185, 108, 0.5);
      font-size: 28px;
      font-weight: 700;
      .circle-counter {
        width: 100px;
      }

      .circle-button {
        user-select: none;
        display: block;
        cursor: pointer;
        width: 120px;
        font-size: 18px;
        line-height: 40px;
        color: currentColor;
        background-color: transparent;
        border: 2px solid rgb(0, 185, 108, 0.5);
        border-radius: 10px;
        transition: 300ms all;
        &:hover {
          color: white;
          background-color: rgb(0, 185, 108, 0.5);
          // border: 2px solid rgb(0, 255, 221);
        }
      }
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}
</style>
