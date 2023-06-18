import { mount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';
import TABLE from '@/store/TableStore';

describe('AppHeader', () => {
    let store: any;

    beforeEach(() => {
        /* store = createStore({
            modules: {
                [TABLE.NAMESPACE]: {
                    state: {
                        startingCell: { id: 1 },
                        endCell: { id: 2 },
                        waypoints: [{ rowIdx: 1, colIdx: 1 }],
                    },
                    getters: {
                        [TABLE.GETTERS.GET_STARTING_CELL]: state => state.startingCell,
                        [TABLE.GETTERS.GET_END_CELL]: state => state.endCell,
                        [TABLE.GETTERS.HAS_WAYPOINT]: state => state.waypoints.length > 0,
                    },
                    actions: {
                        [TABLE.ACTIONS.VISUALIZE_DIJKSTRA]: jest.fn(),
                        [TABLE.ACTIONS.SET_WAYPOINT]: jest.fn(),
                    },
                },
            },
        }); */
    });

    it('renders the component', () => {
        const wrapper = mount(AppHeader, { global: { plugins: [store] } });

        expect(wrapper.exists()).toBe(true);
    });

    it.only('calls visualizeDijkstra when start button is clicked', async () => {
        const wrapper = mount(AppHeader, { global: { plugins: [store] } });

        const startButton = wrapper.find('button:nth-child(1)');
        await startButton.trigger('click');

        expect(store.dispatch).toHaveBeenCalledWith(TABLE.ACTIONS.VISUALIZE_DIJKSTRA, {
            startCellId: store.getters[TABLE.NAMESPACE + '/' + TABLE.GETTERS.GET_STARTING_CELL].id,
            endCellId: store.getters[TABLE.NAMESPACE + '/' + TABLE.GETTERS.GET_END_CELL].id,
        });
    });

    it('calls setWaypoint when addWaypoint button is clicked', async () => {
        const wrapper = mount(AppHeader, { global: { plugins: [store] } });

        const addWaypointButton = wrapper.find('button[add-waypoint-button]');
        await addWaypointButton.trigger('click');

        expect(store.dispatch).toHaveBeenCalledWith(TABLE.ACTIONS.SET_WAYPOINT, { rowIdx: 25, colIdx: 25 });
    });

    it('disables addWaypoint button if there is already a waypoint', () => {
        const wrapper = mount(AppHeader, { global: { plugins: [store] } });

        const addWaypointButton = wrapper.find('button[add-waypoint-button]');

        expect(addWaypointButton.attributes('disabled')).toBeTruthy();
    });
});