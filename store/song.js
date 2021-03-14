export const state = () => ({
  currentSong: null, //当前播放的节目
  playControl: false,
  pauseTime: "",
});

export const mutations = {
  setCurrentSong (state, song) {
    state.currentSong = song;
  },
  setPlayControl (state, val) {
    state.playControl = val;
  },
  setPauseTime (state, val) {
    state.pauseTime = val;
  }
};