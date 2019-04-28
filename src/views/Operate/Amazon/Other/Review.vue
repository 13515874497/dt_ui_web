<script>
//review
import {getReview,saveReview,repGetShopName} from '@/api'
import MxTable from '@/components/Mixins/MxTable'
export default {
  mixins:[MxTable],
  data(){
    return{
      customField: [
        {
          //店铺列表
          topType: "shopName",
          inputType: 3,
          ajax: repGetShopName,
        }
      ]
    }
  },
  methods:{
    queryPage(data){
      return getReview(data)
    },
    ajax_add(data){
      return saveReview(data) 
    },
  }
}
</script>
