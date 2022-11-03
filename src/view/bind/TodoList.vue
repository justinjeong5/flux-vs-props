<template>
    <div>
        <b-button class="add_btn"
                  variant="outline-primary"
                  @click="handleRoute('BindTodoCreate')">
            Add item
        </b-button>
        <div>
            <TodoItem v-for="(item, idx) in internalTodos"
                      :key="idx">
                <template #icon>
                    <component :is="getIcon(idx)" />
                </template>
                <template #heading>
                    <span class="heading"
                          @click="handleRoute('BindTodoDetail', item.id)">
                        {{ item.heading }}
                    </span>
                    <div class="edit-btn__wrapper">
                        <span class="edit-btn"
                              @click="handleRoute('BindTodoEdit', item.id)">
                            수정
                        </span>
                        <span class="edit-spacing">
                            /
                        </span>
                        <span class="edit-btn"
                              @click="handleFinish(item)">
                            완료
                        </span>
                    </div>
                </template>
                <slot name="default">
                    <div v-html="item.content" />
                </slot>
            </TodoItem>
        </div>
        <router-view @edit="handleEdit"
                     @save="handleSave" />
    </div>
</template>

<script>
import Todo from "../../model/Todo.js";
import constants from "../../library/constants.js";

import TodoItem from "../../components/TodoItem.vue";
import DocumentationIcon from "../../icons/IconDocumentation.vue";
import ToolingIcon from "../../icons/IconTooling.vue";
import EcosystemIcon from "../../icons/IconEcosystem.vue";
import CommunityIcon from "../../icons/IconCommunity.vue";
import SupportIcon from "../../icons/IconSupport.vue";

export default {
    components: {
        TodoItem,
        DocumentationIcon,
        ToolingIcon,
        EcosystemIcon,
        CommunityIcon,
        SupportIcon,
    },
    props: {
        todos: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
    },
    computed: {
        internalTodos() {
            return this.todos.filter(({ finished }) => !finished);
        },
    },
    methods: {
        getIcon(idx) {
            const { ICONS } = constants;
            return ICONS[idx % ICONS.length];
        },
        handleRoute(name, id) {
            this.$router.push({ name, params: { id } });
        },
        handleFinish(item) {
            Todo.finish(item).then(this.save);
        },
        handleEdit(item) {
            if (!(item instanceof Todo)) {
                throw new Error(
                    `Edited item must be instance of 'Todo'. \n
                    received: ${item}, type of '${typeof item}'`
                );
            }
            this.save(item);
        },
        handleSave(item) {
            this.save(item);
        },
        save(item) {
            this.$emit("update", this.externalTodos(item));
        },
        externalTodos(item) {
            const targetIdx = this.todos.findIndex(({ id }) => id === item.id);
            const IS_NEW = targetIdx === -1;

            if (IS_NEW) {
                return [...this.todos, item];
            }
            return [
                ...this.todos.slice(0, targetIdx),
                item,
                ...this.todos.slice(targetIdx + 1),
            ];
        },
    },
};
</script>

<style scoped>
.add_btn {
    margin-left: 85%;
    margin-bottom: 20px;
}

.heading {
    cursor: pointer;
}
.heading:hover {
    color: black;
}
.edit-btn {
    cursor: pointer;
    font-size: 11px !important;
}
.edit-spacing {
    font-size: 11px !important;
}
.edit-btn__wrapper {
    position: absolute;
    top: 0;
    right: 0;
}
.label {
    margin-right: 4px;
    color: gray;
}
</style>