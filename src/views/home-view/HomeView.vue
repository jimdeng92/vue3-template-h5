<script setup>
import { ref } from 'vue';
import { Toast } from 'vant';
import { getHotTheme } from '@/api/eastmoney';

const welcome = ref('Hello, welcome to vue3-template-h5.');
const hotThemeData = ref([]);
const getHotThemeRequest = async () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  try {
    const data = await getHotTheme();
    hotThemeData.value = data[0].Data;
    Toast.clear();
  } catch (e) {
    console.error(e.message);
  }
};
const handleLink2GitHub = () => {
  window.open('https://github.com/jimdeng92/vue3-template-h5#readme');
};

// -------------------- init ------------------------
getHotThemeRequest();

</script>

<template>
  <div class="home-page-container">
    <p class="welcome">{{welcome}}</p>
    <van-button type="primary" @click="handleLink2GitHub">文档</van-button>
    <br />
    <code v-for="item in hotThemeData" :key="item.CategoryCode">{{item}}</code>
  </div>
</template>

<style lang="scss" scoped>
.home-page-container {
  text-align: center;
  padding: 0 16PX;
  .welcome {
    padding: 50px;
  }
  code {
    font-size: 12px;
  }
}
</style>
