<template>
<!-- 欢迎弹窗 -->
<el-dialog
  v-model="showWelcome"
  title="欢迎来到商城"
  width="80%"
  center
>
  <div class="welcome-content">
    <img src="@/assets/my-search.png" alt="欢迎">
    <p>今日优惠多多,快来选购吧!</p>
  </div>
</el-dialog>

<!-- 顶部导航栏 -->
<el-affix>
  <div class="nav-bar bg-blue-800">
    <div class="nav-item text-black" 
      v-for="(item, index) in navItems" 
      :key="index"
      :class="{ active: currentNav === index }"
      @click="currentNav = index"
    >
      {{ item }}
    </div>
  </div>
</el-affix>

<!-- 顶部搜索栏 -->
<el-row class="search-area">
    <el-col :span="1"></el-col>
    <el-col :span="22" class="search-box">
        <div class="search-inner">
            <img src="@/assets/my-search.png" alt="">
            <el-input
              v-model="searchText"
              placeholder="搜索商品"
              clearable
            />
            <el-button type="primary" class="search-btn">搜索</el-button>
        </div>
    </el-col>
    <el-col :span="1"></el-col>
</el-row>

<!-- 轮播图 -->
<el-carousel height="200rem" indicator-position="outside" class="banner">
  <el-carousel-item v-for="item in 4" :key="item">
    <div class="banner-item">促销活动 {{ item }}</div>
  </el-carousel-item>
</el-carousel>

<!-- 商品瀑布流布局 -->
<div class="container">
    <!-- 左列 -->
    <div class="column">
        <div class="goods-card" v-for="i in 10" :key="i" @click="goDetail">
            <div class="goods-img">
              <el-image 
                src="https://picsum.photos/200/300"
                fit="cover"
              />
              <div class="goods-tag">热卖</div>
            </div>
            <div class="goods-info">
                <div class="title">时尚潮流商品</div>
                <div class="desc">这是一个很棒的商品描述</div>
                <div class="price-row">
                  <div class="price">¥199</div>
                  <div class="sales">已售1.2w</div>
                </div>
            </div>
        </div>
    </div>
    <!-- 右列 -->
    <div class="column">
        <div class="goods-card" v-for="i in 10" :key="i" @click="goDetail">
            <div class="goods-img">
              <el-image
                src="https://picsum.photos/200/300"
                fit="cover"
              />
              <div class="goods-tag">新品</div>
            </div>
            <div class="goods-info">
                <div class="title">精选好物推荐</div>
                <div class="desc">这是一个很棒的商品描述</div>
                <div class="price-row">
                  <div class="price">¥299</div>
                  <div class="sales">已售8.5k</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 回到顶部 -->
<el-backtop :right="20" :bottom="20" />

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElBacktop } from 'element-plus'

const router = useRouter()
const showWelcome = ref(true)
const searchText = ref('')
const currentNav = ref(0)
const navItems = ['推荐', '女装', '男装', '美妆', '数码']

const goDetail = () => {
  router.push('/shop/detail')
}

onMounted(() => {
  setTimeout(() => {
    showWelcome.value = false
  }, 2000)
})
</script>

<style lang="scss" scoped>
.welcome-content {
  text-align: center;
  img {
    width: 200rem;
    height: 200rem;
  }
  p {
    color: #666;
    margin-top: 20rem;
  }
}

.nav-bar {
  width: 375rem;
  height: 40rem;
  display: flex;
  align-items: center;
  padding: 0 10rem;
  
  .nav-item {
    padding: 0 15rem;
    color: rgba(255,255,255,0.8);
    font-size: 14rem;
    cursor: pointer;
    
    &.active {
      color: #fff;
      font-weight: bold;
    }
  }
}

.search-area {
    width: 375rem;
    margin: 10rem 0;
    .search-box {
        height: 40rem;
        border-radius: 20rem;
        background: #f8f8f8;
        align-items: center;
        display: flex;
        padding: 0 15rem;
        
        img {
            width: 18rem;
            height: 18rem;
            margin-right: 10rem;
        }
        
        .search-btn {
            margin-left: 10rem;
            border-radius: 15rem;
        }
    }
}

.banner {
  margin-bottom: 15rem;
  
  .banner-item {
    height: 100%;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20rem;
  }
}

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10rem;
    padding: 10rem;
    
    .column {
        display: flex;
        flex-direction: column;
        gap: 10rem;
    }

    .goods-card {
        background: #fff;
        border-radius: 12rem;
        overflow: hidden;
        box-shadow: 0 2rem 10rem rgba(0,0,0,0.05);
        transition: all 0.3s;
        
        &:hover {
          transform: translateY(-3rem);
          box-shadow: 0 5rem 15rem rgba(0,0,0,0.1);
        }
        
        .goods-img {
            width: 100%;
            height: 200rem;
            position: relative;
            
            .goods-tag {
              position: absolute;
              top: 10rem;
              left: 10rem;
              background: #ff2c54;
              color: #fff;
              padding: 3rem 8rem;
              border-radius: 4rem;
              font-size: 12rem;
            }
        }
        
        .goods-info {
            padding: 12rem;
            
            .title {
                font-size: 14rem;
                color: #333;
                font-weight: bold;
            }
            
            .desc {
              font-size: 12rem;
              color: #999;
              margin: 5rem 0;
            }
            
            .price-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              
              .price {
                  font-size: 16rem;
                  color: #ff2c54;
                  font-weight: bold;
              }
              
              .sales {
                font-size: 12rem;
                color: #999;
              }
            }
        }
    }
}
</style>
