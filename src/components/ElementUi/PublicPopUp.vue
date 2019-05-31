<template>
  <div class="check1">
		<div v-for="(item, index) in data" :key="index" style="padding: 5px;border: 1px solid black;margin: 5px;">
			<div>{{item.goodName}}</div>
			<div style="display: inline-block;padding: 3px;" v-for="(items, indexs) in item.data_list" :key="indexs">
					<div style="display: inline-block;padding: 3px;">{{items.name}}: </div>
					<input type="text">
			</div>
		</div>
			
  </div>
</template>

<script>
  export default {
    data () {
      return {
					data:[
						{
						goodName:"产品A",
						data_list:[
							{name:'总数量'},
							{name:'确认数量'},
							{name:'不合格数量'},
							{name:'合格数量'},
							{name:'合格不合格数量'},
						]
					},
						{
							goodName:"产品B",
							data_list:[
								{name:'总数量'},
								{name:'确认数量'},
								{name:'不合格数量'},
								{name:'合格数量'},
								{name:'合格不合格数量'},
							]
						},
					]
      }
    },
  
  }
</script>

<style scoped lang="scss">
 
</style>
