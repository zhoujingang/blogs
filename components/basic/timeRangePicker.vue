<template>
  <div class = "time-range-picker">
    <span class="picker-span" style="min-width: 42px">日期：</span>
    <div class="time-range-picker-column">
        <DatePicker class="time-picker" v-model="date" type="date" style="width: 100%" placeholder="选择日期" @on-change="changeSelectedDate"></DatePicker>
    </div>
    <span class="picker-span" style="min-width: 56px">时间段：</span>
    <div class="time-range-picker-column">
        <TimePicker class="time-picker" confirm v-model="startTime" type="time" format="HH:mm" style="width: 100%" placeholder="00:00" @on-change="changeStartTime"></TimePicker>
    </div>
    <span class="picker-span">至</span>
    <div class="time-range-picker-column">
        <TimePicker class="time-picker" confirm v-model="endTime" type="time" format="HH:mm" style="width: 100%" placeholder="00:00" @on-change="changeEndTime"></TimePicker>
    </div>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          date: '',
          startTime: '',
          endTime: '',
        }
      },
      created(){
        this.setDefaultDate();
      },
      methods: {
        setDefaultDate(){
          let date = new Date(),
              month = '' + (date.getMonth() + 1),
              day = '' + date.getDate(),
              year = date.getFullYear();
          if (month.length < 2) 
            month = '0' + month;
          if (day.length < 2) 
            day = '0' + day;
          this.date = [year, month, day].join('-');
        },
        changeSelectedDate(date){
          this.date = date;
          this.$emit("selectedDateChanged", date);
        },
        changeStartTime(time){
          if(this.endTime && time > this.endTime){
            this.startTime = '';
            this.$Message.info('开始时间需要在截止时间之前');
          } else {
            this.startTime = time;
            this.$emit("startTimeChanged", time);
          }
        },
        changeEndTime(time){
          if(this.startTime && time < this.startTime){
            this.endTime = '';
            this.$Message.info('结束时间需要在开始时间之后');
          } else {
            this.endTime = time;
            this.$emit("endTimeChanged", time);
          }
        }
      }
    }
</script>
<style lang="less" scoped>
  .time-range-picker{
    display: flex;
    flex-direction: row;
    width: fit-content;
  }
  .time-range-picker-column{
    width: 120px;
  }
  .picker-span{
    line-height: 32px;
    font-weight: bolder;
    margin: 0 10px;
  }
</style>