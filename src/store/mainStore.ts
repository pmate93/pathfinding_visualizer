import { createStore } from "vuex";
import { tableStore } from "./TableStore/TableStore";

export default createStore({
    modules: {
        tableStore
    }
});