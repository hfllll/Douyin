import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter' , {
    state:() =>({
        videoSources:[
            "/videos/抖音2024113-021964.mp4",
            "/videos/抖音2024113-295887.mp4",
            "/videos/抖音2024113-291746.mp4",
            "/videos/抖音2024113-853385.mp4",
        ]
    }),
    actions:{
        
    }
})