<template>
  <div
    ref="progressBar"
    class="progress_bar"
    @mousedown.stop.prevent="progressClick">
    <div class="bar_inner">
      <div
        ref="progress"
        class="progress"/>
      <div
        ref="progressBtn"
        class="progress_btn_wrapper"
        @click.stop.prevent=""
        @mousedown.stop.prevent="progressTouchStart"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        touch: {},
        // progressBtnWidth: 12,
        isDrag: false,
        isMove: false,
        progressMoving: false
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.isDrag) {
          const barWidth = this.$refs.progressBar.clientWidth;
          const offsetWidth = newPercent * barWidth;
          this._offset(offsetWidth)
        }
      }
    },
    mounted() {
      // this.progressTouchMove();
    },
    methods: {
      progressTouchStart(e) {

        this.isDrag = true;
        this.touch.startX = e.pageX;
        this.touch.left = this.$refs.progress.clientWidth;
        this.progressTouchMove();
      },
      // 鼠标移动事件
      progressTouchMove() {
        const _this = this;
        document.onmousemove = function (e) {

          if (!_this.isDrag){
            return
          }
          _this.isMove = true;

          const deltax = e.pageX - _this.touch.startX;
          const offsetWidth = Math.min(_this.$refs.progressBar.clientWidth, Math.max(0, _this.touch.left + deltax))
          _this._offset(offsetWidth)
        }
        document.onmouseup = () => {
          document.onmousemove=null;
          document.onmouseup=null;
          _this.isDrag = false;
          if (!_this.isMove){
            return
          }
          _this.isMove = false;
          _this._triggerPercent()
        }
      },

      progressClick(e) {

        if (this.isMove){
          return
        }

        const rect = this.$refs.progressBar.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left;
        this._offset(offsetWidth);
        this._triggerPercent();
        this.progressMoving = false;
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth;
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        // this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`
      }
    }
  }
</script>
<style lang="less" scoped>
  @pr_color: #FFDF1F;
  .progress_bar{
    position: relative;
    width: 100%;
    height: 3px;
    background:rgba(0,0,0,.05);
    border-radius:2px;
    cursor: pointer;
    /*opacity:0.05;*/
    .bar_inner{
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      .progress{
        background: @pr_color;
        height: 3px;
        border-radius:2px;
      }
      .progress_btn_wrapper{
        position: absolute;
        z-index: 100;
        right: -4px;
        width: 12px;
        height: 12px;
        top: -4px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 15px 0px rgba(0,0,0,0.15);
        border-radius: 50%;
        &:after{
          position: absolute;
          content: ' ';
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width:4px;
          height:4px;
          background: @pr_color;
          border-radius: 50%;
        }
      }
    }
  }
</style>
