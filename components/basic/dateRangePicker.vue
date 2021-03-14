<template>
  <div class = "date-range-picker">
    <span class="picker-span" style="min-width: 36px">日期：</span>
    <div class="date-range-picker-column">
        <DatePicker class="date-picker" v-model="startDate" type="date" style="width: 100%" format="yyyy-MM-dd" placeholder="选择日期" @on-change="changeStartDate"></DatePicker>
    </div>
    <span class="picker-span">至</span>
    <div class="date-range-picker-column end-date">
        <DatePicker class="date-picker" v-model="endDate" type="date" style="width: 100%" format="yyyy-MM-dd" placeholder="选择日期" @on-change="changeEndDate"></DatePicker>
    </div>
    <div class="quick-picker" v-bind:class="getClass(item)" v-for="item in dateArr" :key="item.label" @click="quickSelect(item)">
      {{item.text}}
    </div>
  </div>
</template>
<script>
    export default {
        data(){
          return {
            startDate: '',
            endDate: '',
            today: '',
            quickSelectLabel: 'sevenDays',
            dateArr: [
              {
                label: 'today',
                text: '今天',
                start: '',
                end: ''
              },
              {
                label: 'yesterday',
                text: '昨天',
                start: '',
                end: ''
              },
              {
                label: 'sevenDays',
                text: '7天',
                start: '',
                end: ''
              },
              {
                label: 'fourteenDays',
                text: '14天',
                start: '',
                end: ''
              },
              {
                label: 'thirtyDays',
                text: '30天',
                start: '',
                end: ''
              },
            ]
          }
        },
        created(){
          this.setDefaultDate();
        },
        methods: {
          getClass(item){
            if(item.label === this.quickSelectLabel){
              return 'quick-selected'
            } else {
              return ''
            }
          },
          setQuickSelectLabel(label){
            this.quickSelectLabel = label;
          },
          quickSelect(item){
            this.endDate = item.end;
            this.startDate = item.start;

            this.setQuickSelectLabel(item.label);

            this.emitChangeStartAndEndDates();
          },
          emitChangeStartAndEndDates(){
            this.$emit("startDateChanged", this.startDate);
            this.$emit("endDateChanged", this.endDate);
          },
          setDefaultDate(){
            const formatDate = (date) => {
              let month = '' + (date.getMonth() + 1),
                  day = '' + date.getDate(),
                  year = date.getFullYear();

              if (month.length < 2) 
                month = '0' + month;
              if (day.length < 2) 
                day = '0' + day;
              return [year, month, day].join('-');
            }

            let today = new Date();
            let yesterday = new Date();
            let sevenDays = new Date();
            let fourteenDays = new Date();
            let thirtyDays = new Date();

            yesterday.setDate(yesterday.getDate() - 1);
            sevenDays.setDate(sevenDays.getDate() - 6);
            fourteenDays.setDate(fourteenDays.getDate() - 13);
            thirtyDays.setDate(thirtyDays.getDate() - 29);
            
            this.startDate = formatDate(sevenDays);
            this.endDate = formatDate(today);

            this.today = formatDate(today);

            this.dateArr.forEach(date => {
              switch(date.label){
                case 'today':
                  date.start = formatDate(today);
                  date.end = formatDate(today);
                  break;
                case 'yesterday':
                  date.start = formatDate(yesterday);
                  date.end = formatDate(yesterday);
                  break;
                case 'sevenDays':
                  date.start = formatDate(sevenDays);
                  date.end = formatDate(today);
                  break;
                case 'fourteenDays':
                  date.start = formatDate(fourteenDays);
                  date.end = formatDate(today);
                  break;
                case 'thirtyDays':
                  date.start = formatDate(thirtyDays);
                  date.end = formatDate(today);
                  break;
              }
            })

            this.emitChangeStartAndEndDates();
          },
          changeStartDate(date){
            if(this.endDate && date > this.endDate){
              this.startDate = '';
              this.$Message.info('开始日期需要在截止日期之前');
            } else {
              this.setQuickSelectLabel('');
              this.startDate = date;
              this.$emit("startDateChanged", date);
            }
          },
          changeEndDate(date){
            if(this.startDate && date < this.startDate){
              this.endDate = '';
              this.$Message.info('结束日期需要在开始日期之后');
            } else {
              this.setQuickSelectLabel('');
              this.endDate = date;
              this.$emit("endDateChanged", date);
            }
          }
        }
    }
</script>
<style lang="less" scoped>
  .date-range-picker{
    display: flex;
    flex-direction: row;
    width: fit-content;
    align-items: center;
  }
  .date-range-picker-column{
    width: 120px;
  }
  .end-date {
    margin-right: 10px; 
  }
  .picker-span{
    line-height: 32px;
    margin: 0 10px;
    font-size: 14px;
  }
  .quick-picker{
    cursor: pointer;
    width: 40px;
    height: 30px;
    line-height: 30px;
    margin: 2px;
    text-align: center;
    transition: border-bottom 0.4s, color 0.6s;
    border-bottom: solid 1px rgba(32, 138, 243, 0);
  }
  .quick-picker:hover{
    color: #2088F3;
  }
  .quick-selected{
    color: #2088F3;
    border-bottom: solid 2px rgb(32, 138, 243);
  }
</style>
