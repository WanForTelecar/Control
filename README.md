# 控制端
```
基于Vue，Cordova，可打包PC和Android
```

## 功能

- [x] 与云服务器建立 socket 连接，断开自动连接，重启 webrtc
- [x] 与被控端建立 webrtc 音视频连接（单向）
- [x] 按下说话功能（发送音频）
- [x] 高德地图展示
- [x] 信号展示
- [x] 电量展示
- [x] 离线状态展示

## android
```
1. 打 debug-apk 包 cordova build android
2. webrtc 依赖 cordova-plugin-webview-x5
3. 摄像头|mic 权限需要用户手动打开
4. 打 aab 包：cordova build android --prod --release -- -- --packageType=bundle
```
### PC 教程
```
1. 找到 www 目录，上传至服务器即可
```
### android 教程
```
1. cordova build android 即可得到 debug 包
2. 安卓 debug.apk 包即可
```
### more
```
1. 摇杆|手柄控制请参考https://git.caner.top/Caner/ESP8266-PS-Contrl
```
### 后续
```
更多使用方法会在抖音更新：Caner
```
