<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 800px">
        <el-tab-pane label="版本信息" name="first" >
            <div>
                <div class="title1" style="font-size: 20px">版本信息</div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span >应用工程名</span>
                    <span class="title_item01" >{{project}}</span>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>FR 版本</span>
                    <span class="title_item02">{{edition}}</span>
                </div>
            </div>

            <div>
                <div class="title1" style="font-size: 20px;">注册信息</div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>版本注册</span>
                    <span class="title_item03">{{git}}</span>
                    <a href="">[重新注册]</a>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>认证方式</span>
                    <span class="title_item04">{{way}}</span>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>机械信息</span>
                    <span class="title_item05">{{info}}</span>
                    <p style="margin-left: 280px">机器码:   {{device}}</p>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>版本号</span>
                    <span class="title_item06">{{VNumber}}</span>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>应用工程名</span>
                    <span class="title_item07">{{project2}}</span>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>同时访问模板IP个数</span>
                    <span class="title_item08">{{nIP}}</span>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>过期时间</span>
                    <span class="title_item09">{{time}}</span>
                    <p style="margin-left: 280px"><a href="">导出注册信息</a></p>
                </div>
                <div style="margin-top: 16px;margin-bottom: 16px;">
                    <span>插件注册</span>
                    <span class="title_item10">{{plug_in}}个插件未成功注册</span>
                </div>
            </div>


        </el-tab-pane>
        <el-tab-pane label="功能列表" name="second" >
            <div class="bb" style="font-size: 20px">
                功能列表
            </div>
        </el-tab-pane>

    </el-tabs>
</template>
<script>
    export default {
        data() {
            return {
                project:'WebRopret',//应用工程名
                edition:'版本号: 9.0',//FR版本
                git:'注册成功',//版本注册
                way:'本地机器信息认证',//认证方式
                info:'Mac地    D0:94:66:1C:70:BA',//机械信息
                device:'xxxxxxxxxxxxxxxxxxxx',//机器码
                VNumber:'9.0',
                project2:'不限',//应用工程名
                nIP:'不限并发',//同时访问个数
                time:'2018/1/12',//过期时间
                plug_in:'1',
                activeName: 'first',
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .el-tabs__nav.is-top{


    }
    .el-tabs__nav-wrap::after{
        position: static !important;
    }
    .title1{
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 2px;
        border-style:solid;
        border-color: #e4e7ed;
    }
    .title_item01{
        padding-left: 200px;
    }
    .title_item02{
        padding-left: 224.33px;
    }
    .title_item03{
        padding-left: 216px;
    }
    .title_item04{
        padding-left: 216px;
    }
    .title_item05{
        padding-left: 216px;
    }
    .title_item06{
        padding-left: 232px;
    }
    .title_item07{
        padding-left: 200px;
    }
    .title_item08{
        padding-left: 137.52px;
    }
    .title_item09{
        padding-left: 216px;
    }
    .title_item10{
        padding-left: 216px;
    }

</style>
