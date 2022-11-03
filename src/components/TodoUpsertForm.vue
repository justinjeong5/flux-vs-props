<template>
    <div>
        <b-form-group class="form-field mb-0"
                      label="Todo Title"
                      label-for="todo-title"
                      description="30자 이내로 할일을 요약해주세요.">
            <b-form-input id="todo-title"
                          placeholder="Enter new todo title"
                          :value="value.heading"
                          @input="input('heading', $event)" />
        </b-form-group>
        <b-form-group class="form-field mb-0"
                      label="Todo Description"
                      label-for="todo-desc"
                      description="300자 이내로 할일을 작성해주세요.">
            <b-form-textarea id="todo-desc"
                             placeholder="Enter new todo description"
                             :value="value.content"
                             rows="3"
                             max-rows="6"
                             @input="input('content', $event)" />
        </b-form-group>
        <div class="btn-wrapper">
            <b-button class="form-btn"
                      variant="outline-secondary"
                      @click="cancel">
                {{ rejectLabel }}
            </b-button>
            <b-button variant="outline-primary"
                      @click="save">
                {{ resolveLabel }}
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {},
        rejectLabel: {
            type: String,
            default: "취소",
        },
        resolveLabel: {
            type: String,
            default: "저장하기",
        },
    },
    methods: {
        input(field, value) {
            this.$emit("input", {
                ...this.value,
                [field]: value,
            });
        },
        cancel() {
            this.$emit("cancel");
        },
        save() {
            this.$emit("save");
        },
    },
};
</script>

<style>
.btn-wrapper {
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
}
.form-btn {
    margin-right: 10px;
}
</style>