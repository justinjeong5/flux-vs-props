<template>
    <div id="app">
        <header>
            <img alt="Vue logo"
                 class="logo"
                 src="../assets/logo.svg"
                 width="125"
                 height="125" />

            <div class="wrapper">
                <TodoSummary msg="Todo List"
                             :todos="todos" />
            </div>
        </header>
        <main>
            <router-view :todos="todos"
                         @update="update"
                         @save="save" />
        </main>
    </div>
</template>
<script>
import Todo from "../model/Todo.js";

import TodoSummary from "./bind/TodoSummary.vue";

export default {
    components: {
        TodoSummary,
    },
    data() {
        return {
            todos: [],
        };
    },
    watch: {
        $route: {
            immediate: true,
            deep: true,
            handler() {
                this.fetchTodos();
            },
        },
    },
    methods: {
        fetchTodos() {
            Todo.list().then(list => {
                this.todos = list;
            });
        },
        update(list) {
            if (typeof list !== "object" || !Array.isArray(list)) {
                throw new Error(
                    `Updated list must be Array. \n
                    received: ${list}, type of '${typeof list}'', isArray: ${Array.isArray(
                        list
                    )}`
                );
            }
            this.todos = list;
        },
        save(item) {
            if (typeof item !== "object" || !(item instanceof Todo)) {
                throw new Error(
                    `Saved item must be instance of 'Todo'. \n
                    received: ${item}, type of '${typeof item}''`
                );
            }
            this.todos = [...this.todos, item];
        },
    },
};
</script>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
