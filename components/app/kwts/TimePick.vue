<template>
  <TimePicker
    hide-disabled-options
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
    :value="time"
    class="valueType"
    type="time"
    placeholder="距离入场时间"
    @on-change="updataTime"
    @on-open-change="OnOpenChange()"
  ></TimePicker>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: "请选择时间"
    }
  },
  data() {
    return {
      myvalue:this.value,
      disabledHours: [],
      disabledMinutes: [],
      disabledSeconds: []
    };
  },
  watch: {
    value(newval){
      if(isNaN(newval)){
      this.$emit("input", 0);
        this.myvalue = 0
        } 
    }
  },
  computed: {
    time() {
      let result = parseInt(this.myvalue);
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);

      return `${h}:${m}:${s}`;
    }
  },
  methods: {
    /**
     *  时分秒禁用
     */
    timeFormat(vel, long) {
      let timeList = [];
      while (long > vel) {
        timeList.push(long);
        long--;
      }
      return timeList;
    },
    /**
     * 格式化时间(时分秒)
     */
    formatTime(value) {
      let result = parseInt(value);
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);

      return `${h}:${m}:${s}`;
    },
    /**
     * 禁用时间
     */
    updataTime(vel) {
      let This = this;
      This.disabledHours = [];
      This.disabledMinutes = [];
      This.disabledSeconds = [];
      let durationArr = vel.split(":");
      let duration = This.formatTime(This.duration).split(":");
      for (let index = 0; index < durationArr.length; index++) {
        let time = parseInt(duration[index]);
        if (index == 0) {
          This.disabledHours = This.timeFormat(time, 24);
        } else if (index == 1) {
          This.disabledMinutes = This.timeFormat(time, 60);
        } else if (
          index == 2 &&
          parseInt(durationArr[1]) == parseInt(duration[1])
        ) {
          This.disabledSeconds = This.timeFormat(time, 60);
        }
      }
        let value = this.createTime(vel, ":");
      this.$emit("input", value);
      //   this.$set(this.formValidate.prospect_tabList[index], "time", $event);
    },
    createTime(time, key) {
      try {
        let time_data = time.split(key);
        let time_s = 0;
        for (let data of time_data) {
          time_s = time_s * 60 + parseInt(data);
        }
        return time_s;
      } catch (e) {
        return 0;
      }
    },
    OnOpenChange() {
      let $event = this.time;
      let This = this;
      This.disabledHours = [];
      This.disabledMinutes = [];
      This.disabledSeconds = [];
      let durationArr = $event.split(":");
      let duration = This.formatTime(This.duration).split(":");
      for (let index = 0; index < durationArr.length; index++) {
        let time = parseInt(duration[index]);
        if (index == 0) {
          This.disabledHours = This.timeFormat(time, 24);
        } else if (index == 1) {
          This.disabledMinutes = This.timeFormat(time, 60);
        } else if (
          index == 2 &&
          parseInt(durationArr[1]) == parseInt(duration[1])
        ) {
          This.disabledSeconds = This.timeFormat(time, 60);
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.valueType {
  width: 100%;
  text-align: center;
}
</style>
