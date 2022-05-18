# Client_For_App

1. √ 与云服务器建立 socket 连接，断开自动连接，重启 webrtc
2. √ 与树莓派建立 webrtc 音视频连接（只接收视频）
3. √ socket 发送按下说话功能（发送音频）
4. √ socket 接收接收电量+信号+GPS+车速
5. √ socket 发送控制信息
6. √ webrtc 发送 anwers
7. √ 高德地图展示
8. √ 信号展示
9. √ 电量展示
10. √ 离线状态展示

## android

1. 打 debug-apk 包 cordova build android
2. webrtc 依赖 cordova-plugin-webview-x5
3. 权限需要用户手动打开
4. 打 aab 包：cordova build android --prod --release -- -- --packageType=bundle
