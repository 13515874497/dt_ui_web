<template>
  <div class="shopUpload">
    <FilesUpload :pId="pId" :showNext="showNext">
      <template v-slot:slotType>
        <payOption @pIdChange="pIdChange"></payOption>
      </template>
    </FilesUpload>
  </div>
</template>
<script>
import FilesUpload from "@/components/FileUpload/FilesUpload";
import PayOption from "@/components/FileUpload/payOption";
export default {
  data() {
    return {
      pId: '',
      showNext:false
    };
  },
  components: {
    FilesUpload,
    PayOption
  },
  methods: {
    pIdChange(val){
      this.pId = val;
      this.showNext = true;
    }
  }
};
</script>
<style scoped>
</style>
