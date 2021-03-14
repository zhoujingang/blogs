<template>
  <div
    ref="playControl"
    :class="{ islock: islock, nolock : !islock, 'not_showinpage': notShowinpage}"
    class="playControl"
    @mouseenter="controlMouseIn"
    @mouseleave="controlMouseOut"
  >
    <div class="playControl_inn">
      <div class="control_out">
        <div class="lock">
          <i
            :class="islock ? 'iconbar_icon_lock_' : 'iconbar_icon_unlock_'"
            class="iconfont"
            @click="lock"
          />
        </div>
        <div class="posi_re">
          <div class="control">
            <div class="con_l flex-c">
              <div v-show="!currentSong._id" class="cover" />
              <nuxt-link :to="`/play_detail/${currentSong._id}`">
                <img
                  :src="currentSong.pic ? currentSong.pic : 'https://h5static.kuwo.cn/upload/image/bcb35d33836add51d788988248504c4571a978cac13ce097c2e1b20f1fd01414.png'"
                  class="song_img"
                  alt
                />
              </nuxt-link>
              <div>
                <div class="flex-c info_con">
                  <div class="info">
                    <div v-show="currentSong._id">
                      <span :title="currentSong.name" class="song_name">{{ currentSong.name }}</span>
                      <span
                        v-if="currentSong.artist"
                        :title="currentSong.artist"
                        class="artist">- {{ currentSong.artist }}</span>
                    </div>
                    <div v-show="!currentSong._id">好音质，用酷我</div>
                  </div>
                  <span
                    class="time"
                  >{{ currentSong._id ? currentTime : '00:00' }}/{{ songTimeMinutes ? songTimeMinutes : '00:00' }}</span>
                </div>
                <div class="process">
                  <progress-bar :percent="percent" @percentChange="onProgressBarChange" />
                </div>
              </div>
            </div>
            <div class="col_c flex-c">
              <div title="上一首" class="prev" @click="prevSong">
                <i class="iconfont iconbar_icon_pre_" />
              </div>
              <div :title="playIcon == 'iconbar_icon_pause_' ? '暂停' : '播放'" class="play">
                <i :class="playIcon" class="iconfont" @click="togglePlaying" />
              </div>
              <div title="下一首" class="next" @click="nextSong">
                <i class="iconfont iconbar_icon_next_" />
              </div>
            </div>
            <div class="col_r flex-c">
              <i
                title="收藏歌曲"
                class="prev icon_heart iconfont iconbar_icon_heart_"
                @click="load('collect')"
              />
              <i title="下载歌曲" class="prev iconfont iconbar_icon_download_" @click="load('down')" />
              <i title="评论" class="prev iconfont iconbar_icon_ncomment_" @click="routeToComment" />
              <span class="playList" @click.stop="isShowList">
                <span v-if="songList.length > 0" class="play_count">{{ songList.length }}</span>
                <i title="歌曲列表" class="prev iconfont iconbar_icon_playlistfuzhi" />
              </span>
              <i
                v-show="volume == 0"
                title="音量"
                class="iconfont iconbar_icon_mute"
                @click="openVolume"
              />
              <i
                v-show="volume > 0"
                title="音量"
                class="iconfont iconbar_icon_volume_"
                @click="closeVolume"
              />
              <div class="volume">
                <progress-bar :percent="volume" @percentChange="volumeChange" />
              </div>
            </div>
          </div>
          <div v-show="showList" class="song_list" @click.stop>
            <div class="list_top flex-c">
              <div>
                <span class="text">播放列表</span>
                <span class="num">({{ songList.length > 0 ? '共' + songList.length + '首' : '0' }})</span>
              </div>
              <div :class="{no_list: songList.length <= 0}" class="flex-c">
                <div class="clear_all">
                  <i class="iconfont icon-list_clean_n" @click.stop="confirmClear" />
                  <span class="clear_btn" @click.stop="confirmClear">清空列表</span>
                  <div v-show="isClear" class="confirm">
                    <div class="confirm_tit flex-c">
                      <span>清空列表</span>
                      <i class="iconfont icon-list_icon_x" @click.stop="isClear = false" />
                    </div>
                    <p class="text">确认清空当前播放列表</p>
                    <p>
                      <span class="sure" @click="clearList">清空</span>
                    </p>
                  </div>
                </div>
                <i class="close iconfont icon-list_icon_x" @click="isShowList" />
              </div>
            </div>
            <div ref="songout" class="list_con">
              <div>
                <div
                  v-for="(item,index) in songList"
                  :key="index"
                  :class="{active_cur : currentSong._id == item._id }"
                  class="flex-c list_item"
                >
                  <div class="list_idx">
                    {{ index + 1 }}
                    <span v-show="currentSong.rid == item.rid" class="playing">
                      <span :class="{ playing_now : playing, pause: !playing }" class="side1" />
                      <span :class="{ playing_now : playing, pause: !playing }" class="side2" />
                      <span :class="{ playing_now : playing, pause: !playing }" class="side3" />
                    </span>
                  </div>
                  <div class="song_name">
                    <span :title="item.name" @click.stop="selectPlay(item)">{{ item.name }}</span>
                  </div>
                  <div class="artist">
                    <nuxt-link
                      :title="item.artist"
                      :to="`/singer_detail/${ item.artistid}`"
                      target="_blank"
                    >{{ item.artist }}</nuxt-link>
                  </div>

                  <div class="time">{{ item.songTimeMinutes }}</div>
                  <div class="song_opts flex-c">
                    <i
                      title="添加歌曲"
                      class="iconfont icon-playlist_icon_add_"
                      @click.stop="load('add')"
                    />
                    <i
                      title="收藏歌曲"
                      class="iconfont icon-list_icon_heart"
                      @click.stop="load('collect')"
                    />
                    <i
                      title="下载歌曲"
                      class="iconfont iconbar_icon_download_"
                      @click.stop="load('down')"
                    />
                    <i
                      title="删除歌曲"
                      class="iconfont icon-playlist_icon_trash_"
                      @click.stop="selectDel(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audio"
      :src="playUrl"
      :loop="isloop"
      :autoplay="autoplay"
      @play="ready"
      @canplay="canplay"
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @ended="end"
    />
  </div>
</template>
<script>
// import axios from 'axios';
// import BScroll from 'better-scroll';
// import progressBar from "~/components/app/fq/progressBar";
// import { mFormat } from "~/utils/utils";
import { mapState } from "vuex";
export default {
  components: {
    // progressBar
  },
  data() {
    return {
      // showPlayContaol: true,
      // hasStorageList: false, // 根据此字段判断音频是否开启自动播放
      playUrl: "",
      autoplay: true,
      songReady: false,
      playing: false,
      percent: 0,
      currentTime: "00:00",
      songTimeMinutes: "00:00",
      showList: false,
      mode: [
        { name: "循环播放", mode: "normal", icon: "iconbar_icon_loop_" },
        { name: "单曲循环", mode: "single", icon: "iconbar_icon_repeat_" },
        { name: "顺序播放", mode: "list", icon: "iconbar_icon_list_" },
        { name: "随机播放", mode: "random", icon: "iconbar_icon_random_" }
      ],
      isloop: false,
      islock: false,
      notShowinpage: false,
      isanimation: false,
      isMouseOut: true,
      volume: 0,
      volume2: 0,
      canMove: true,
      source: [null, null],
      scroll: null,
      isClear: false
    };
  },

  computed: {
    ...mapState({
      // playMode(state) {
      //   if (mode === 'single') {
      //     this.isloop = true;
      //   } else {
      //     this.isloop = false;
      //   }
      //   return state.song.mode
      // },
      songList() {
        if (this.scroll) {
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
        return [];
      },
      currentSong(state) {
        const currentSong = Object.assign({}, state.song.currentSong);
        // console.log(currentSong);
        return currentSong;
      },
      playControl(state) {
        //加入新歌曲时显示播控条
        return state.song.playControl;
      }
    }),
    currentIndex() {
      const list = this.songList;
      if (list.length === 0) return -1;
      return list.findIndex((item, index) => {
        return item.rid === this.currentSong.rid;
      });
    },
    currentSongRid() {
      return this.currentSong._id;
    },
    playIcon() {
      return this.playing ? "iconbar_icon_pause_" : "iconbar_icon_play_1";
    }
  },
  watch: {
    currentSongRid(newVal, oldVal) {
      this.playing = false;
      this.songReady = false;
      this.$refs.audio.pause();
      this.clearState();
      // debugger
      if (newVal) {
        this.autoplay = true;
        this.getPlayUrl(this.currentSong);
      }
    },
    playControl(val) {
      this.controlMouseIn("addSong");
    },
    showList(val) {
      this.isClear = false;
      if (val && this.scroll) {
        this.$nextTick(() => {
          this.scroll.refresh();
          const el = document.querySelector(".active_cur");
          this.scroll.scrollToElement(el, 600, 0, true);
        });
      }
    },
    volume(val) {
      localStorage.setItem("volume", val);
    },
    $route() {
      this.isShowPlaycontrol();
    }
  },
  mounted() {
    this.isShowPlaycontrol();

    const volume = localStorage.getItem("volume");
    if (volume != null) {
      this.volume = Number(volume);
      this.volume2 = Number(volume);
    } else {
      this.volume = 0.5;
      this.volume2 = 0.5;
    }
    this.$refs.audio.volume = this.volume;
  },
  methods: {
    isShowPlaycontrol() {
      const routeName = this.$route.path;
      if (routeName.includes("mvplay")) {
        this.notShowinpage = true;
        if (this.$refs.audio) {
          this.$refs.audio.pause();
        }
      } else {
        this.notShowinpage = false;
      }
    },
    getPlayUrl(song) {
      if (song.notAutoplay) {
        this.autoplay = false;
      }
      this.playUrl = song.url;
      song.notAutoplay = false;
    },
    canplay() {
      this.songReady = true;
      this.songTimeMinutes = this.$mFormat(
        this.$refs.audio && this.$refs.audio.duration
      );
    },
    ready(e) {
      this.playing = true;
    },
    onError(e) {
      this.songReady = false;
      this.playing = false;
    },
    onWaiting(e) {},
    onPause(e) {
      this.playing = false;
    },
    end(e) {
      const mode = this.playMode;
      switch (mode) {
        case "single":
          this.loop();
          break;
        default:
          this.endNextSong();
          break;
      }
    },
    onTimeupdate(e) {
      const currentTime =
        (e.target && e.target.currentTime) ||
        (e.srcElement && e.srcElement.currentTime);
      const audio = this.$refs.audio;
      // console.log(audio.duration);
      const percent = currentTime / audio.duration;

      this.percent = percent;
      this.currentTime = this.$mFormat(currentTime);
      // this.$store.commit('song/upTime', currentTime)
      // this.$store.commit('song/upPercent', percent)
    },
    endNextSong() {
      const list = this.songList;
      const mode = this.playMode;
      let next;
      switch (mode) {
        case "single":
          this.loop();
          break;
        case "normal":
          if (list.length === 1) {
            this.loop();
            return;
          }
          this.currentIndex === list.length
            ? (next = 0)
            : (next = this.currentIndex + 1);
          next = next % list.length;
          this.$store.commit("song/changeSong", list[next]);
          break;
        case "list":
          if (list.length === 1) {
            this.loop();
            this.$refs.audio.pause();
            return;
          }
          if (this.currentIndex + 1 === list.length) {
            this.clearState();
            return;
          }
          next = this.currentIndex + 1;
          this.$store.commit("song/changeSong", list[next]);
          break;
        case "random":
          if (list.length === 1) {
            this.loop();
            return;
          }
          next = Math.floor(list.length * Math.random());
          this.$store.commit("song/changeSong", list[next]);
          break;
        default:
          break;
      }
    },
    nextSong() {
      const list = this.songList;
      if (list.length === 0) return;
      if (list.length === 1 && this.currentSong.rid) {
        this.loop();
        return;
      }
      let next;
      this.currentIndex === list.length
        ? (next = 0)
        : (next = this.currentIndex + 1);
      next = next % list.length;
      if (this.playMode === "random") {
        next = Math.floor(list.length * Math.random());
      }
      this.$store.commit("song/changeSong", list[next]);
    },
    prevSong() {
      const list = this.songList;
      if (list.length === 0) return;
      if (list.length === 1 && this.currentSong.rid) {
        this.loop();
        return;
      }
      let next;
      this.currentIndex === 0
        ? (next = this.songList.length - 1)
        : (next = this.currentIndex - 1);
      if (this.playMode === "random") {
        next = Math.floor(this.songList.length * Math.random());
      }
      this.$store.commit("song/changeSong", list[next]);
    },

    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    clearState() {
      this.currentTime = "00:00";
      if (this.$refs.audio && this.$refs.audio.currentTime) {
        const audio = this.$refs.audio;
        audio.currentTime = 0;
      }
      this.percent = 0;
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      if (this.playing) {
        console.log(this.currentTime);
        this.$store.commit("song/setPauseTime", this.currentTime);
      }
      const audio = this.$refs.audio;
      this.playing ? audio.pause() : audio.play();
    },
    onProgressBarChange(val) {
      const audio = this.$refs.audio;
      audio.currentTime = audio.duration * val;
    },
    volumeChange(val) {
      if (val > 0) {
        this.volume2 = val;
      }
      const audio = this.$refs.audio;
      audio.volume = val;
      this.volume = val;
    },
    isShowList() {
      this.showList = !this.showList;
    },

    load(str) {
      this.$store.commit("model/modelOption", {
        textType: str,
        type: "load",
        title: "提示",
        text: "",
        url: "http://down.kuwo.cn/mbox/kwmusic_web_2.exe"
      });
    },
    lock() {
      this.islock = !this.islock;
    },
    controlMouseIn(state) {
      this.isMouseOut = false;
      if (this.islock || !this.canMove) {
        return;
      }
      this.canMove = false;
      this.$refs.playControl.style.bottom = "0px";
      setTimeout(() => {
        this.canMove = true;
        if (this.isMouseOut || state === "addSong") {
          this.controlMouseOut();
        }
      }, 2000);
    },
    controlMouseOut() {
      this.isMouseOut = true;
      if (this.islock || !this.canMove) {
        return;
      }
      this.$refs.playControl.style.bottom = "-70px";
    },
    // 列表播放歌曲
    selectPlay(song) {
      this.$store.commit("song/changeSong", song);
    },
    // 列表删除歌曲
    selectDel(song) {
      const list = this.songList;
      if (list.length === 1) {
        let nextSong = {};
        this.$store.commit("song/changeSong", nextSong);
      } else if (song.rid === this.currentSong.rid) {
        this.nextSong();
      }
      this.$store.commit("songlist/del", song);
    },
    confirmClear() {
      const list = this.songList;
      if (list.length == 0) {
        return;
      }
      this.isClear = true;
    },
    // 清空播放列表
    clearList() {
      this.isClear = false;
      this.$store.commit("songlist/clear");
      this.$store.commit("song/changeSong", {});
    },
    switchType() {
      this.load("quality");
    },
    openVolume() {
      this.volume = this.volume2;
      this.$refs.audio.volume = this.volume;
    },
    closeVolume(vol) {
      this.volume = 0;
      this.$refs.audio.volume = 0;
    },
    routeToComment() {
      if (this.currentSong.rid) {
        const routeName = this.$route.path;
        if (routeName.includes(`play_detail/${this.currentSong.rid}`)) {
          document.querySelector("#comment_con").scrollIntoView(true);
        } else {
          this.$router.push({
            path: `/play_detail/${this.currentSong.rid}`,
            query: { scrollTo: true }
          });
        }
      }
    },
    routeTo(str) {
      this.$router.push(str);
    }
  }
};
</script>
<style lang="less" scoped>
.text-c {
  text-align: center;
}
.col-primary {
  color: #0952ff;
}
.bg-primary {
  background: #0952ff;
}
.flex-c {
  display: flex;
  align-items: center;
}
.just-b {
  display: flex;
  justify-content: space-between;
}
.lock {
  position: absolute;
  bottom: 69px;
  right: 110px;
  height: 40px;
  width: 80px;
  text-align: center;
  z-index: 999;
  .iconfont {
    cursor: pointer;
    position: relative;
    font-size: 20px;
    top: 19px;
    left: 2px;
  }
}
.posi_re {
  position: relative;
}
.playControl {
  position: fixed;
  left: 0;
  bottom: -70px;
  z-index: 11000;
  padding-top: 20px;
  height: 90px;
  width: 100%;
  &.nolock {
    transition: bottom 0.4s ease-out;
  }
  &.islock {
    bottom: 0px;
  }
  &.not_showinpage {
    z-index: -1;
    opacity: 0;
  }
  .playControl_inn {
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  }
  .control_out {
    position: relative;
    max-width: 1640px;
    padding: 0 120px;
    margin: 0 auto;
    background: #fff;
  }
  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .con_l {
      flex-shrink: 0;
      position: relative;
      width: 460px;
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 101;
      }
      .info_con {
        width: 370px;
        justify-content: space-between;
        margin-bottom: 11px;
        .info {
          width: 290px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .song_name {
          display: inline-block;
          vertical-align: middle;
          max-width: 53.67%;
          line-height: 22px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .artist {
          display: inline-block;
          vertical-align: middle;
          max-width: 31.63%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #666;
          cursor: pointer;
        }
        .time {
          color: #999;
        }
      }
      .process {
        width: 370px;
      }
    }
    .col_c {
      flex-shrink: 0;
      color: #333;
      .prev,
      .next {
        width: 28px;
        // height: 28px;
        text-align: center;
        cursor: pointer;
        .iconfont {
          font-size: 24px;
        }
      }
      .play {
        width: 46px;
        // height: 46px;
        text-align: center;
        cursor: pointer;
        .iconfont {
          font-size: 40px;
        }
        margin: 0 31px;
      }
      .iconfont {
        &:hover {
          color: #000;
        }
      }
      &.no_list {
        .iconfont {
          color: #999;
          &:hover {
            color: #999;
          }
        }
      }
    }
    .col_r {
      display: flex;
      justify-content: flex-end;
      width: 460px;
      color: #666;
      flex-shrink: 0;

      .iconfont {
        font-size: 18px;
        margin-left: 28px;
        cursor: pointer;
        color: #666;
        &:hover {
          color: #333;
        }
        &.icon_heart {
          margin-left: 0;
        }
      }
      .playList {
        position: relative;
        .play_count {
          position: absolute;
          text-align: center;
          top: -4px;
          left: 37px;
          padding: 0 2px;
          font-size: 12px;
          background: #fff;
          cursor: pointer;
        }
      }
      .volume {
        display: flex;
        align-self: center;
        width: 86px;
        margin-left: 10px;
      }
    }
  }
  .song_list {
    position: absolute;
    right: 14%;
    bottom: 80px;
    width: 512px;
    /*overflow: hidden;*/
    background: #fff;
    padding: 34px 0 20px;
    box-shadow: 0px 4px 20px 0px rgba(65, 67, 70, 0.08);
    .list_top {
      justify-content: space-between;
      padding: 0 23px 0 25px;
      .text {
        font-size: 16px;
        height: 22px;
        font-weight: 600;
      }
      .num {
        font-size: 14px;
        font-weight: 300;
      }
      .clear_all {
        position: relative;
        margin-right: 21px;
        .iconfont {
          font-size: 20px;
          vertical-align: middle;
          cursor: pointer;
        }
        .clear_btn {
          display: inline-block;
          cursor: pointer;
        }
        .confirm {
          position: absolute;
          top: 110%;
          left: -64px;
          z-index: 100000;
          width: 240px;
          height: 164px;
          padding: 16px 20px;
          background: #fff;
          box-shadow: 0px 4px 20px 0px rgba(65, 67, 70, 0.08);
          .confirm_tit {
            justify-content: space-between;
            font-weight: 600;
            line-height: 22px;
            font-size: 16px;
          }
          .text {
            margin-top: 31px;
            font-weight: 300;
            color: #666;
            font-size: 16px;
            line-height: 22px;
          }
          .sure {
            display: inline-block;
            margin-top: 14px;
            width: 200px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #ffdf1f;
            border-radius: 23px;
            cursor: pointer;
          }
        }
      }
      .close {
        font-size: 20px;
        cursor: pointer;
      }
      .no_list {
        color: #999;
      }
    }
    .list_con {
      max-height: 414px;
      overflow: hidden;
      margin-top: 20px;
      .list_item {
        height: 46px;
        padding: 0 25px;
        .song_opts {
          flex: 1;
          text-align: right;
          display: none;
          .iconfont {
            cursor: pointer;
            margin-left: 13px;
          }
        }
        .list_idx {
          position: relative;
          width: 16px;
          height: 20px;
          text-align: center;
          margin-right: 8px;
          line-height: 20px;
          .playing {
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 16px;
            line-height: 14px;
            text-align: center;
            background: #f7f7f7;
            span {
              position: absolute;
              bottom: 0;
              width: 2px;
              background: #ffe200;
            }
          }

          // loading
          .side1 {
            left: 2px;
            height: 6px;
            animation: first 1s linear infinite;
          }
          .side2 {
            left: 6px;
            height: 4px;
            animation: second 1s linear infinite;
          }
          .side3 {
            left: 10px;
            height: 6px;
            animation: middle 1s linear infinite;
          }
          .plaing_now {
            animation-play-state: running;
          }
          .pause {
            animation-play-state: paused;
          }
          @keyframes first {
            0% {
              height: 6px;
            }
            56% {
              height: 10px;
            }
            100% {
              height: 8px;
            }
          }
          @keyframes second {
            0% {
              height: 4px;
            }
            28% {
              height: 6px;
            }
            80% {
              height: 12px;
            }
            100% {
              height: 6px;
            }
          }
          @keyframes middle {
            0% {
              height: 10px;
            }
            56% {
              height: 8px;
            }
            100% {
              height: 6px;
            }
          }
        }
        .song_name {
          width: 198px;
          height: 20px;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          margin-right: 22px;
          span {
            cursor: pointer;
          }
        }
        .artist {
          width: 163px;
          height: 20px;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          a {
            color: #666;
          }
        }
        &.active_cur {
          background: rgba(247, 247, 247, 0.7);
        }
        &:hover {
          background: rgba(247, 247, 247, 1);
          .song_opts {
            display: block;
          }
          .time {
            display: none;
          }
          .artist {
            width: 66px;
          }
        }
        .time {
          margin-left: 16px;
          height: 16px;
          line-height: 16px;
          font-weight: 600;
        }
      }
    }
  }
  .song_img {
    margin-right: 20px;
    width: 70px;
    height: 70px;
  }
}
.no_data {
  margin: 119px 0;
  text-align: center;
  p {
    color: #999;
    line-height: 24px;
    a {
      color: #296294;
    }
  }
}
</style>
