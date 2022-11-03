import constants from "../library/constants.js";

export default class Todo {
    constructor() {
        this.heading = "";
        this.content = "";
        this.created_at = new Date();
        this.updated_at = new Date();
        this.finished = false;
    }
    static baseURL() {
        return `${constants.BASE_API}/todos`;
    }
    static get(id) {
        return fetch(`${Todo.baseURL()}/${id}`).then((res) => res.json());
    }
    static list() {
        return fetch(Todo.baseURL()).then((res) => res.json());
    }
    static create(data) {
        const internalData = Object.assign({}, data, { updated_at: new Date() });
        return fetch(Todo.baseURL(), {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(internalData),
        }).then((res) => res.json());
    }
    static update(id, data) {
        const internalData = Object.assign({}, data, { updated_at: new Date() });
        return fetch(`${Todo.baseURL()}/${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(internalData),
        }).then((res) => res.json());
    }
    static finish(data) {
        const internalData = Object.assign(
            {},
            data,
            {
                updated_at: new Date(),
                finished: true,
            }
        );
        return fetch(`${Todo.baseURL()}/${data.id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(internalData),
        }).then((res) => res.json());
    }
};
