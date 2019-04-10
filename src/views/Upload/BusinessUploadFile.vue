<template>
  <div class="shopUpload">
    <FilesUpload :businessTime="businessTime" :showNext="showNext">
      <template slot="slotType">
        <DatePicker @changeDate="changeDate"></DatePicker>
        
      </template>
    </FilesUpload>
  </div>
</template>
<script>
import FilesUpload from "@/components/FileUpload/FilesUpload.vue";
import DatePicker from "@/components/FileUpload/DatePicker";
export default {
  data() {
    return {
      businessTime: 0,
      showNext:false
    };
  },
  components: {
    FilesUpload,
    DatePicker
  },
  methods: {
    changeDate(val){
      this.businessTime = val;
      this.showNext = true;
    }
  }
};
</script>
<style scoped>
</style>
