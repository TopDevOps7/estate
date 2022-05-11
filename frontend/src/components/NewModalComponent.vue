<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit" method="POST">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            :state="titleState"
            value="asdfasdfasdfasdfsfsdf"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Task Description"
          label-for="description-input"
          invalid-feedback="Description is required"
          :state="descriptionState"
        >
          <b-form-textarea
            id="description-textarea"
            v-model="description"
            :state="descriptionState"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          label="Tags"
          label-for="tags-input"
          invalid-feedback="Tags is required"
          :state="tagsState"
        >
          <b-form-tags input-id="tags-basic" v-model="tags" :state="tagsState" required></b-form-tags>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
  export default {
    data() {
      return {
        id: '',
        title: '',
        description: '',
        tags: [],
        status: false,
        isSubmit: false
      }
    },
    computed: {
        ...mapState('tasks', ['signupStatus', 'task_temp', 'modalFlag']),
        titleState() {
            return this.isSubmit ? this.title.length > 0 : null
        },
        descriptionState() {
            return this.isSubmit ? this.description.length > 0 : null
        },
        tagsState() {
            return this.isSubmit ? this.tags.length > 0 : null
        }

    },
    
    methods: {
    ...mapActions('tasks', ['addTask', 'updateTask']),
      checkFormValidity() {
        const valid = this.titleState && this.descriptionState && this.tagsState
        return valid
      },
      resetModal() {
          const data = JSON.parse(localStorage.getItem('updateData'))
          if(this.modalFlag == "Add") {
            this.title = ''
            this.description = ''
            this.tags = []
          } else if(this.modalFlag == "Update") {
              this.id = data.id
              this.status = data.status == 1 ? true : false;
              this.title = data.title
              this.description = data.description
              this.tags = data.tags.split(',')
          }
        
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        this.isSubmit = true;
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        if(this.modalFlag === "Add") {
            if(localStorage.getItem('user')) {
                const userId = JSON.parse(localStorage.getItem('user')).data.id;
                const {title, description, tags, status} = this;
                this.addTask({userId, title, description, tags, status});
            }
        } else if (this.modalFlag === "Update") {
            const {id, title, description, tags, status} = this;
            this.updateTask({id, title, description, tags, status});
        }
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
          this.isSubmit = false
        })
      }
    }
  }
</script>