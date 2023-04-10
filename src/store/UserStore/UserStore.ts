import { defineStore } from 'pinia';
import { ACTIONS } from './TableStore.const';

export type User = {
    id: number;
    userName: string;
    isFav: boolean;
};

export const useUserStore = defineStore({
    id: 'userStore',
    state: (): { users: User[] } => ({
        users: [
            { id: 1, userName: 'myName', isFav: true },
            { id: 2, userName: 'myName2', isFav: false },
            { id: 3, userName: 'myName3', isFav: true },
        ],
    }),
    getters: {
        favs(): User[] {
            return this.users.filter((u: User) => u.isFav);
        },
    },
    actions: {
        [ACTIONS.SET_TABLE](amount = 1) {
            this.users.splice(1);
        },
        ['yoyo'](amount = 1) {
            this.users.splice(1);
        },
    }
});

export type UserStore = ReturnType<typeof useUserStore>;
