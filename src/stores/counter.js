import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter' , {
    state:() =>({
        // 主页面的视频源
        videoSources:[
            "/videos/抖音2024113-021964.mp4",
            "/videos/抖音2024113-295887.mp4",
            "/videos/抖音2024113-291746.mp4",
            "/videos/抖音2024113-853385.mp4",
        ],
        // 视频滑动之间的透明度
        videoOpacity:1,
        // 经验页面的照片链接
        expericePhoto:[
            "https://dy.ttentau.top/images/L-aPrCE0jU-oZCnBNaCF6.png",
            "https://dy.ttentau.top/images/2b2rpive_RVzDrYgo-F9K.png",
            "https://dy.ttentau.top/images/ZZswSFx09jieg_gle1Df_.png",
            "https://dy.ttentau.top/images/r1T-FpQnXpOHkddbElUeg.png",
            "https://dy.ttentau.top/images/q6whY5BBk-s46qT9VN5C3.png",
            "https://dy.ttentau.top/images/A-ZZ20sdh4lBcFtaT0fOY.png",
            "https://dy.ttentau.top/images/uGzjvQP8YKdQ2cOBVxpNv.png",
            "https://dy.ttentau.top/images/EH55GbdKR8mLim5Iv7onx.png",
            "https://dy.ttentau.top/images/6-IUsyJr29EqyxjgNu-RT.png",
            "https://dy.ttentau.top/images/Ld4krzXYGlX1lkhSo5Hiw.png",
            "https://dy.ttentau.top/images/k7jQU-1yIREyxhXyrCROZ.png",
            "https://dy.ttentau.top/images/n0SAcEY5gLucU7Ik7yP2P.png",
            "https://dy.ttentau.top/images/Sf5mzf68e2GwZHZv7h1G2.png",
            "https://dy.ttentau.top/images/j5yLQoats003BJxO9sLux.png",
            "https://dy.ttentau.top/images/azQBdX8KfhA5O0u1Gx5Rm.png",
            "https://dy.ttentau.top/images/lMiwlu15zzZL-oepYvFnk.png",
            "https://dy.ttentau.top/images/k0Oihp66J8CcUJ9Mn38iX.png",
            "https://dy.ttentau.top/images/mkE-ajijrsoAwKHf9b-5p.png",
        ],
        // 经验页面的标题数组
        expericeText:[
            "有个身材很好的女朋友是什么体验？！",
            "周三到了是不是就可以开始期待周末了🥰😘",
            "姐妹们都自信点！腿粗穿legging真的很好看✨",
            "这类型身材可以打几分呢",
            "世界上为什么不能多我一个🐻小的人‼️❗",
            "这腰是骑摩托骑出来？",
            "挑战100天让男朋友摸到翘臀（10/100）",
            "练舞穿搭分享",
            "身高156 练了臀后 人生开挂",
            "从C到E的二胎妈妈，🐻大就奶多是真的吗？",
            "一裤回春！原来翘PP都是穿出来的！",
            "加油练，明天休",
            "",
        ],
        // 经验页面 大容器的左间距 用于兼容pc端
        experienceContainerLeft:0
    }),
    actions:{}
})