<template>
    <TodoUpsertForm :value="model"
                    resolveLabel="생성하기"
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
    methods: {
        input(v) {
            this.model = v;
        },
        save() {
            Todo.create(this.model).then((res) => {
                const item = new Todo(res);
                this.input(item);
                this.$emit("save", item);
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
.form-field {
    padding-bottom: 10px;
}
.btn-wrapper {
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
}
.form-btn {
    margin-right: 10px;
}
</style>
