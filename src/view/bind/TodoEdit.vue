<template>
    <TodoUpsertForm :value="model"
                    resolveLabel="수정하기"
                    @input="input"
                    @cancel="redirectToList"
                    @save="save" />
</template>

<script>
import Todo from "../../model/Todo.js";

import TodoUpsertForm from "../../components/TodoUpsertForm.vue";

export default {
    components: {
        TodoUpsertForm,
    },
    data() {
        return {
            model: new Todo(),
        };
    },
    mounted() {
        this.fetchTodo();
    },
    methods: {
        fetchTodo() {
            const { id } = this.$route.params;
            Todo.get(id).then((res) => {
                this.model = res;
            });
        },
        input(v) {
            this.model = v;
        },
        save() {
            const { id } = this.$route.params;
            Todo.update(id, this.model).then((res) => {
                this.input(res);
                this.$emit("edit", this.model);
                this.redirectToList();
            });
        },
        redirectToList() {
            this.$router.push({ name: "Home" });
        },
    },
};
</script>

<style>
</style>
