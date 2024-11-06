<script></script>
<template>
  <router-view>
    <div class="container">
      <div class="main">
        <!-- 上部分 -->
        <div class="header">
          <img
            class="bgc"
            src="@/assets/my.jpg"
            mode="scaleToFill"
          />
          <!-- 导航栏 -->
          <div class="navigate">
            <div class="navigate-edit">
              <img src="@/assets/my-edit.png" class="navigate-edit-icon"/>
              <div class="navigate-edit-text">编辑资料</div>
            </div>
            <div class="navigate-icon">
              <img class="icons" src="@/assets/my-right.png"/>
              <img class="icons" src="@/assets/my-people.png"/>
              <img class="icons" src="@/assets/my-search.png"/>
              <img class="icons" src="@/assets/my-menu.png"/>
            </div>
            <div class="navigate-avatar">
              <div class="navigate-avatar-img">
                <img class="avatarimg" src="@/assets/my-avatar.jpg"/>
              </div>
            </div>
            <div class="navigate-info">
              <div class="navigate-info-name">5G学高数</div>
              <div class="navigate-info-id">
                <div class="id">抖音号：12345douyin</div>
                <img class="ecode" src="@/assets/my-ercode.png"/>
              </div>
            </div>
          </div>
        </div>
         <!-- 弹出层 -->
        <div class="popup">
          <!-- 获赞 朋友 关注 粉丝 -->
           <div class="popup-container">
            <span class="fans">
              <div class="fans-text">124</div>
              <div class="fans-item">点赞</div>
            </span>
            <span class="fans">
              <div class="fans-text">3778</div>
              <div class="fans-item">朋友</div>
            </span>
            <span class="fans">
              <div class="fans-text">3778</div>
              <div class="fans-item">关注</div>
            </span>
            <span class="fans">
              <div class="fans-text">173.5万</div>
              <div class="fans-item">粉丝</div>
            </span>
            <button class="button">添加朋友</button>
           </div>
          <!-- 个人简介 -->
           <div class="context">
            <div class="context-info">每晚12:00直播 韩舞业余，专业蹦迪！</div>
            <div class="context-info">我的小号@杨巅峰</div>
            <div class="context-info">商务V：Joymedia7</div>
            <div class="context-info">这辈子人潮汹涌 遇到你 我很幸运</div>
           </div>
           <!-- 年龄 地址 -->
            <div class="area">
              <span class="area-age">
                <img v-if="true" class="area-age-img" src="@/assets/girl.png"/>
                <img v-else class="area-age-img" src="@/assets/boy.png"/>
                <span class="area-age-info">27岁</span>
              </span>
              <span class="area-address">广东·珠海</span>
            </div>
          <!-- 抖音商城 我的音乐 我的群聊 查看更多 -->
           <div class="extra">
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/shoppingcar.png"/>
              <div class="extraItem-info">抖音商城</div>
            </span>
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/music.png"/>
              <div class="extraItem-info">我的音乐</div>
            </span>
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/contact.png"/>
              <div class="extraItem-info">我的群聊</div>
            </span>
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/more.png"/>
              <div class="extraItem-info">查看更多</div>
            </span>
           </div>
           <!-- 作品 私密 喜欢 收藏 -->
           <div class="status">
            <span class="status-item active">作品</span>
            <span class="status-item">私密</span>
            <span class="status-item">喜欢</span>
            <span class="status-item">收藏</span>
          </div>
          <!-- 作品 -->
           <div>
            <div></div>
           </div>
        </div>
        
         
         <!-- 底部导航栏 -->
        <div class="bottom"></div>
      </div>
    </div>
  </router-view>
</template>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #1c2833;
  .main {
    width: 400px;
    height: 100vh; 
    position: relative;
  }
}
.bgc {
  width: 25em;
  height: 13.5em;
}
// 导航栏 头像
.navigate {
  padding: 0.1em 1em;
  position: absolute;
  left: 0;
  top: 0.5em;
  &-edit {
    width: 7em;
    height: 1.5em;
    background:rgba(0,0,0,0.1);
    display: flex;
    padding: 4px;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
    margin: 0;
    float: left;
    &-icon {
      width: 1em;
      height: 1em;
      float: left;
    }
    &-text {
      font-size: 1em;
      color: white;
    }
  }
  &-icon {
    margin-left: 10em;
  }
  &-avatar {
    margin-top: 1em; 
    float: left;
  }
  &-info {
    height: 7em;
    // display: flex;
    flex-direction: column;
    vertical-align: middle;
    position:absolute;
    left: 7em;
    margin-left:2em;
    text-align: left;
    &-name {
      line-height: 1.5em;
      font-size: 1em;
      color: white;
      margin-top: 3em;
    }
    &-id {
      line-height: 1.5em;
    }
  }
}
.icons {
  width: 1.6em;
  height: 1.6em;
  padding: 2px;
  margin-right: 0.5em;
  border-radius: 50%;
  background: rgba(0,0,0,0.1);
}
.icons:nth-child(1) {
  margin-left: 2.5em;
}
.avatarimg {
  width: 7em;
  height: 7em;
  border-radius: 50%;
  border: 2px solid #000;
}
.id {
  font-size: 0.8em;
  color: #babec7;
  float: left;
}
.ecode {
  margin-left: 0.5em;
  width: 0.7em;
  height: 0.7em;
}
//弹出层
.popup {
  position: absolute;
  top: 12em;
  width: 25em;
  min-height: 34em;
  border: 1px solid #000;
  border-radius: 20px 20px 0 0;
  padding: 1em 0 0 0;
  background-color: #151724;
}
.fans {
  float: left;
  width: 4em;
  height: 3em;
  &-text {
    color: white;
    font-weight: bold;
    font-size: 0.8em;
    text-align: center;
  }
  &-item {
    color: #b2b2b3;
    font-size: 0.7em;
    text-align: center;
  }
}
.button {
  background-color:#3a3a46;
  width: 6em;
  height: 2.5em;
  border-radius: 6px;
  color: white;
  margin-left: 4em;
}
// 个人简介
.context {
  margin-left: 1em;
  margin-top: 1em;
  &-info {
    color: #b2b2b3;
    font-size: 0.7em;
  }
}
// 年龄 地址
.area {
  margin-left: 1em;
  margin-top: 0.5em;
  // line-height: 1em;
  color: #b2b2b3;
  &-age {
    border-radius: 5px;
    background-color: #3a3a46;
    padding: 0.05em 0.05em 0.1em 0.05em;
    // line-height: 0.5em;
    &-img {
      width: 0.7em;
      height: 0.7em;
    }
    &-info {
      margin-left: 0.2em;
      font-size: 0.7em;
    }
  }
  &-address {
    margin-left: 0.6em;
    border-radius: 5px;
    padding: 0.3em;
    background-color: #3a3a46;
    font-size: 0.7em;
  }
}
//抖音商城 我的音乐 我的群聊 查看更多
.extra {
  
}
.extraItem {
  width: 6.22em;
  height: 4em;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &-img {
    width: 1.5em;
    height: 1.5em;
  }
  &-info {
    margin-top: 0.5em;
    color: #808080;
    font-size: 0.8em;
  }
}
//作品 私密 喜欢 收藏
.status {
  margin-top: 4em;
  &-item {
    width: 8em;
    height: 3em;
    padding: 0.5em 2.11em 0.5em 2.11em;
    color: white;
    font-weight: bold;
  }
}
.active {
  border-bottom:2px solid #ffd700;
}
</style>