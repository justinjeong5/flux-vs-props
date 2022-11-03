<template>
    <div>
        <b-modal id="detailModal"
                 :title="model.heading"
                 hide-header-close
                 @hide="redirectToList">
            <div>
                <div class="content">
                    {{ model.content }}
                </div>
                <div class="date">
                    created_at: {{ model.created_at }}
                </div>
                <div class="date">
                    updated_at: {{ model.updated_at }}
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Todo from "../../model/Todo.js";

export default {
    data() {
        return {
            model: {},
        };
    },
    mounted() {
        this.$bvModal.show("detailModal");
        this.fetchTodo();
    },
    methods: {
        fetchTodo() {
            const { id } = this.$route.params;
            Todo.get(id).then(res => {
                this.model = res;
            });
        },
        redirectToList() {
            this.$router.push({ name: "Home" });
        },
    },
};
</script>

<style>
h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}
.date {
    align-content: right;
    font-size: 0.9rem;
    color: gray;
}
.content {
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: black;
}
</style>