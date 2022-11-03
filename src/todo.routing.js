import BindHome from "./view/TodoVBind.vue";
import BindTodoList from "./view/bind/TodoList.vue";
import BindTodoDetail from "./view/bind/TodoDetail.vue";
import BindTodoCreate from "./view/bind/TodoCreate.vue";
import BindTodoEdit from "./view/bind/TodoEdit.vue";

export default () => [
    {
        path: "",
        redirect: () => ({ name: "Home" }),
    },
    {
        path: "/vbind",
        component: BindHome,
        name: "Home",
        redirect: () => ({ name: "BindTodoList" }),
        children: [
            {
                path: "/vbind/todos",
                component: BindTodoList,
                name: "BindTodoList",
                children: [
                    {
                        path: ":id",
                        name: "BindTodoDetail",
                        component: BindTodoDetail,
                    },
                ]
            },
            {
                path: "/vbind/todos/create",
                name: "BindTodoCreate",
                component: BindTodoCreate,
            },
            {
                path: "/vbind/todos/:id/edit",
                name: "BindTodoEdit",
                component: BindTodoEdit,
            },
        ],
    },

];
