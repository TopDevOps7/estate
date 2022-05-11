<template>
    <table class="table text-left">
        <thead>
            <tr class="container">
                <th class="row" style="padding:30px; border-bottom:none">
                    <form class="col-md-3 col-sm-3" style="padding:0">
                        <select v-on:change="handleSearch" name="cars" class="custom-select" v-model="mode">
                            <option  v-for="item in statusVal" v-bind:key = item :value="item">{{item}}</option>
                        </select>
                    </form>
                    <div class="col-md-4 col-sm-4" >
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search" v-model="keyword" v-on:change="handleSearch">
                            <div class="input-group-append">
                            <button class="btn btn-success" type="submit" v-on:click="handleSearch" >Go</button>  
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1 col-sm-1"></div>
                    <div class="col-md-4 col-sm-4 text-right">
                        <b-button  class="btn btn-success" v-b-modal.modal-prevent-closing v-on:click="handleAdd"> + Add Tasks</b-button>
                        <button class="btn btn-outline-danger" v-on:click="handleDelete" v-if="isSeleted" style="margin-left: 10px"><b-icon-trash /></button>
                    </div> 
                <!-- The Modal -->
                <NewModal />
                </th>
            </tr>
        </thead> 
        <tbody id="accordion">
            <tr v-for="item in tasks" :key="item.id" class="container">
                <td v-bind:class="getclass(item.id)" :data="JSON.stringify(item)">
                    <div class="col-md-1 text-right">
                        <input type="checkbox" class="cus_checkbox" :value="item.id" v-on:click="isSeletedhandle" ref="tasksref">
                        <span class="text-decoration-none cus_btn">
                            <span v-on:click="changeStatus(item.id)" :taskId="item.id">
                                <b-icon-star variant="success" v-if="item.status == 1 ? false : true"/>
                                <b-icon-star-fill variant="success" v-if="item.status == 1 ? true : false"/>
                            </span>
                        </span>
                    </div>
                    <div data-toggle="collapse" :href="'#collapse' + item.id"  class="col-md-10">
                        <span class="d-line-block text-decoration-none ">     
                            <span class="card-link">
                                {{item.title}}
                            </span>
                        </span>
                        
                    </div>
                    <div class="col-md-1 text-right">
                        <b-icon-pencil-square class="cus_edit_icon" v-on:click="handleUpdate" v-b-modal.modal-prevent-closing />
                    </div>
                    <div :id="'collapse' + item.id" class="collapse" data-parent="#accordion">
                        <div class="card-body">
                            {{item.description}}
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import NewModal from '../components/NewModalComponent.vue'
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            mode: 'all',
            keyword: '',
            isopen: false,
            statusVal: ['all', 'completed', 'pending'],
            isSeleted: false
        }
    },
    components: {
        NewModal
    },
    computed: {
        ...mapState('tasks', ['tasks', 'status', 'modalFlag']),
    },
    watch: {
        tasks() {
            return this.tasks
        },
        status() {
            if(localStorage.getItem('user')) {
                const user = JSON.parse(localStorage.getItem('user'))
                var {mode, keyword} = this
                this.getList({userId: user.data.id, status: mode, form: keyword});
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['addTask', 'getList', 'resetStatus', 'deleteTasks', 'searchTasks', 'updateTask', 'setModalFlag']),
        handleSearch() {
            if(localStorage.getItem('user')) {
                const user = JSON.parse(localStorage.getItem('user'))
                var {mode, keyword} = this
                this.getList({userId: user.data.id, status: mode, form: keyword});
            }
        },
        handleDelete() {
            var inputs = this.$refs.tasksref
            var arr = [];
            for(var i in inputs) {
                if (inputs[i].checked) {
                    arr.push(inputs[i].value);
                }
            }
            if (arr.length == 0) alert("There are no seleted tasks!")
            else {
                var con = confirm('Are you really remove this tasks?')
                if (con) this.deleteTasks(arr);
            }
            
        },
        
        handleUpdate(e) {
            const target = e.target.closest('.row')
            localStorage.setItem('updateData', target.getAttribute('data'));
            this.setMFlag("Update");
        },
        handleAdd() {
            this.setMFlag("Add");
        },
        setMFlag(f) {
            this.setModalFlag(f);
        },
        changeStatus(id) {
            var target = JSON.parse(document.querySelector(".id_"+id).getAttribute('data'));
            target.status = target.status === 1 ? 0 : 1;
            document.querySelector(".id_"+id).setAttribute('data', JSON.stringify(target));
            var tags = target.tags.split(',');
            this.updateTask({id, title: target.title, description: target.description, tags, status: target.status});
        },
        isSeletedhandle() {
            var inputs = this.$refs.tasksref
            var arr = [];
            for(var i in inputs) {
                if (inputs[i].checked) {
                    arr.push(inputs[i].value);
                }
            }
            this.isSeleted = (arr.length > 0)
        },
        getclass(id) {
            return "row id_" + id;
        },
        getBadgeclass(done) {
            var cls;
            if(done) {
                cls = "badge badge-success"
            } else {
                cls = "badge badge-secondary"
            }
            return cls
        }
    },
    created() {
        if(localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'))
            var {mode, keyword} = this
            this.getList({userId: user.data.id, status: mode, form: keyword});
        }
    }
}
</script>

<style scoped>
    .cus_checkbox {
        margin-right: 15px;
        padding-top: 10px;
        width: 17px;
        height: 17px;
        border-radius: 20px;
    }
    a.cus_tasktitle span:hover{
        cursor: pointer;
    }
    .cus_font {
        margin-top:30px;
        font-size: 20px;
    }
    .cus_btn {
        /* margin: 0 20px 0 2px; */
        font-size: 20px;
    }
    .cus_btn:hover {
        cursor: pointer;
    }
    .done {
        background-color: rgb(255, 255, 255);
    }
    .notdone {
        background-color: rgb(255, 255, 255);
    }
    .done a.cus_tasktitle {
        color: lightgrey;
    }
    .notdone a.cus_tasktitle {
        color:rgb(61, 61, 61);
    }
    #accordion td:hover {
        background-color: rgb(236, 243, 199);
    }
    .cus_edit_icon {
        margin-right: 15px
    }
    .cus_edit_icon:hover {
        cursor: pointer;
    }
</style>