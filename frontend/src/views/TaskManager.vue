<template>
    <div class="text-center">
        <div>
            <img src="../../public/1.jpg" class="img-fluid" width="">
            <div class="d-inline-block font-weight-bold cus_taskheader">
                <h1 class="">Estate Tasks</h1>
                <div class="btn-group d-block">
                    <a type="button" class="dropdown-toggle text-success  border-none outline-none text-decoration-none" data-toggle="dropdown">
                    Estate Task Guide</a>
                    <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Tablet</a>
                    <a class="dropdown-item" href="#">Smartphone</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white shadow container cus_table">
            <div class="row" style="margin: 20px">
                <table class="cus_table_header text-left col-md-10">
                    <tr>
                        <td rowspan="2" style="padding-top:30px;width:15px"><b class="cus_header_num text-dark text-decoration-none">1</b></td>
                        <td style="padding-top:30px"><h3>Immediate Steps</h3></td>
                    </tr>
                    <tr>
                        <td><div>These are your immediate steps to complemte</div></td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th style="padding-top: 30px">
                            {{this.mode === 'pending' ? JSON.parse(rateState).sum - JSON.parse(rateState).pendding:JSON.parse(rateState).success}} / {{JSON.parse(rateState).sum}} tasks left
                        </th>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 10px">
                            <div class="progress float-right " style="width:150px">
                                <div class="progress-bar bg-secondary" :style="getPercent()"></div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <data-table></data-table>
            <hr />
        </div>
        
    </div>
</template>

<script>
import DataTable from '../components/DataTable.vue';
import {mapState} from 'vuex'
export default {
    data() {
        return {
            aTitle: "",
        }
    },
    components: {
        DataTable,
    },
    computed: {
        ...mapState('tasks', ['tasks', 'rate', 'title', 'status', 'mode']),
        rateState() {
            return this.rate;
        },
        titleState() {
            return this.title
        }
    },
    methods: {
        getPercent() {
            if(this.rateState) {
                var rate = JSON.parse(this.rateState)
                if(this.mode == 'pending') {
                    return 'width:' + (rate.sum - rate.pendding) / rate.sum *100 + '%'
                } else {
                    return 'width:' + rate.success / rate.sum * 100 + '%'
                }
            }
        }
    },
    created() {
    }
}

</script>
<style lang="css" scoped>
    .cus_table {
        border-radius: 5px;
        margin-top: 30px;
        padding-bottom: 30px;
    }
    .cus_taskheader {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    .cus_table_header {
        padding: 10px
    }
    .cus_header_num {
        padding-right: 25px;
        font-size: 30px;
    }
</style>

