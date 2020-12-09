// 1.查找触发事件的元素
// 获取视频元素
let videoEle = document.getElementById('video');
// 获取播放/暂停按钮
let controlButtonEle = document.getElementById('control-button');
// 获取视频播放/暂停状态的图标
let controlIconEle = document.getElementById('control-icon');
// 获取静音的按钮
let volumeEle = document.getElementById('volume-button');
// 获取静音按钮的图标
let volumeIcoEle = document.getElementById('volume-icon');
// 获取音量滑块
let volumeRange = document.getElementById('volume-range');
// 获取当前播放时间
let currentTimeEle = document.getElementById('time-elapsed');
// 获取显示总时长的span
let durationEle = document.getElementById('duration');
// 获取全屏按钮
let fullscreenButtonEle = document.getElementById('fullscreen-button');
// 获取整个视频元素所在的div
let videoContainerEle = document.getElementById('video-container');
// 获取全屏图标元素
let fullscreenIconEle = document.getElementById('fullsceen-icon');
// 获取
// 获取进度条上的滑块
let seekEle = document.getElementById('seek');
// 2.为元素绑定事件事件处理函数
// 控制播放和暂停
controlButtonEle.onclick = function () {
  // 3.查找要修改的元素
  if (videoEle.paused || videoEle.ended) {
    videoEle.play();
    controlIconEle.src = 'icons/pause.png';
  } else {
    videoEle.pause();
    controlIconEle.src = 'icons/play.png';
  }
}
// 为音量按钮添加事件
// 2.为元素添加事件处理函数
volumeEle.onclick = function () {
  // 判断当前播放时视频是否为静音
  if (videoEle.muted) {
    // 如果是静音，那么改为不静音，并且图标改为开声音
    videoEle.muted = false;
    volumeIcoEle.src = 'icons/volume-on.png';
  } else {
    // 否则，如果是不静音就改为静音
    videoEle.muted = true;
    volumeIcoEle.src = 'icons/volume-off.png';
  }
}
// 拖动滑块增大减少音量
volumeRange.oninput = function () {
  console.log(volumeRange.value);
  videoEle.volume = volumeRange.value;
  // 根据音量修改音量图标
  if (videoEle.volume == 0) {
    volumeIcoEle.src = 'icons/volume-off.png';
  } else {
    volumeIcoEle.src = 'icons/volume-on.png';
  }
}

// 获取video的头数据（总时长）
videoEle.addEventListener('loadedmetadata', () => {
  // 获取总时长
  let currentTime = formatTime(parseInt(videoEle.currentTime));
  let duration = formatTime(videoEle.duration);
  durationEle.innerHTML = duration;
  currentTimeEle.innerHTML = currentTime;
});
// currentTime发生变化时，需要实时进行更新
videoEle.ontimeupdate = function () {
  let currentTime = formatTime(parseInt(videoEle.currentTime));
  let duration = formatTime(parseInt(videoEle.duration));
  durationEle.innerHTML = duration;
  currentTimeEle.innerHTML = currentTime;
  // 实时获取到当前播放时间时更新给滑条value
  seekEle.max = videoEle.duration;
  seekEle.value = parseInt(videoEle.currentTime);
}
// 时间处理函数  将秒数转换为h m s 
var formatTime = function (seconds) {
  let h = parseInt(seconds / 3600);
  let m = parseInt(seconds % 3600 / 60);
  let s = parseInt(seconds % 60);
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  // return h,m,s;
  return h + ':' + m + ':' + s;
}
// 让整个视频所在的div进入到全屏
// 全屏按钮单击
fullscreenButtonEle.onclick = function () {
  // 判断是否处于全屏状态
  // 如果处于全屏状态上，就退出全屏
  if (document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElemnt || document.msFullscreenElement) {
    console.log('endFullscreen');
    quitFullscreen();
    // 并且改变图标
    fullscreenIconEle.src = 'icons/fullscreen.png';
  } else {
    console.log('inFullScreen');
    launchRequestFullscreen(videoContainerEle);
    fullscreenIconEle.src = 'icons/fullscreen-exit.png';
  }
}

//拖动总时长的滑块时，改变当前播放时间
seekEle.oninput = function(){
  videoEle.currentTime = seekEle.value;
}

//兼容浏览器的进入全屏的写法
function launchRequestFullscreen(element) {
  if (element.msRequestFullscreen) {           //Internet Explorer
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {    //Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) { //Chrome
    element.webkitRequestFullScreen();
  } else {                                    //W3C
    element.requestFullscreen();
  }
}
//兼容浏览器的退出全屏的写法
var quitFullscreen = ()=>{
    if(document.exitFullscreen){//w3c
      console.log(document.exitFullscreen);
      document.exitFullscreen();
    }else if(document.msExitFullscreen){
      document.msexitFullscreen();//IE
    }else if(document.webkitExitFullscreen){
      document.msexitFullscreen();//IE
    }
  }