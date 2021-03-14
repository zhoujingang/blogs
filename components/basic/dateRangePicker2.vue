<template>
  <div class="date-range-picker">
    <row type="flex" justify="start" align="middle">
      <i-col span="12">
        <Date-picker
          type="daterange"
          :open="open"
          :options="options"
          placement="bottom-end"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          :value="[startDate,endDate]"
          confirm
          style="width: 210px"
          @on-change="handleChange"
          @on-ok="handleOk"
        >
          <a href="javascript:void(0)" class="filter-datepicker-ctrl" @click="handleClick">
            <Icon type="ios-calendar-outline"></Icon>
            <span class="filter-content">
              {{this.startDate + '~' + this.endDate}}
            </span>
            <i class="ivu-icon ivu-icon-ios-arrow-down"></i>
          </a>
        </Date-picker>
      </i-col>
    </row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      startDate: "",
      endDate: "",
      confirmStartDate: "",
      confirmEndDate: "",
      options: {
        shortcuts: [
          {
            text: "今天",
            value() {
              const date = new Date();
              return [date, date];
            }
          },
          {
            text: "昨天",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return [date, date];
            }
          },
          {
            text: "7天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "30天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          }
        ],
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      }
    };
  },
  methods: {
    handleClick() {
      this.open = !this.open;
      if (!this.open) {
        this.startDate = this.confirmStartDate;
        this.endDate = this.confirmEndDate;
      }
    },
    handleChange(date) {
      this.startDate = date[0];
      this.endDate = date[1];
    },
    handleOk() {
      this.open = false;
      this.confirmStartDate = this.startDate;
      this.confirmEndDate = this.endDate;
      this.$emit("changeDate", [this.confirmStartDate, this.confirmEndDate]);
    }
  },
  created() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.startDate = this.$formatDate(start);
    this.endDate = this.$formatDate(end);
    this.confirmStartDate = this.$formatDate(start);
    this.confirmEndDate = this.$formatDate(end);
  }
};
</script>

<style lang="less" scoped>
.date-range-picker {
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: center;
  /deep/.ivu-picker-confirm button:first-child {
    display: none;
  }
  a {
    color: #464c5b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .filter-content {
      padding: 0 0px;
    }
  }
}
</style>
