import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import AppHeader from '../AppHeader.vue';
import HeaderButton from '../HeaderButton.vue';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { useTableStore, useUtilityStore } from '@/store';
import type { TableStore } from '@/store/TableStore/TableStore';
import type { UtilityStore } from '@/store/UtilityStore/UtilityStore';

describe('AppHeader', () => {
    let tableStore: TableStore;
    let utilityStore: UtilityStore;
    const mountAppHeader = () => mount(AppHeader);
    let wrapper: ReturnType<typeof mountAppHeader>;

    beforeAll(() => {
        const pinia = createTestingPinia({ stubActions: false, createSpy: vi.fn });
        setActivePinia(pinia);
        tableStore = useTableStore(pinia);
        utilityStore = useUtilityStore(pinia);
    });

    beforeEach(() => {
        vi.resetAllMocks();
        wrapper = mountAppHeader();
    });

    it('renders properly', () => {
        expect(wrapper.text()).toContain('Pathfinding Visualizer');
    });

    it('tests that all buttons get rendered.', () => {
        const expectedLength = 3;

        const buttons = wrapper.findAllComponents(HeaderButton);

        expect(buttons).toHaveLength(expectedLength);
    });

    it('tests that `addWaypoint` method calls `setWaypoint` store action.', () => {
        const expectedPayload = { rowIdx: 25, colIdx: 25 };
        tableStore.setWaypoint = vi.fn();

        const buttons = wrapper.findAllComponents(HeaderButton);
        buttons.at(1)?.trigger('click');

        expect(tableStore.setWaypoint).toHaveBeenCalledWith(expectedPayload);
    });

    it('tests that reset button emits `onReset` event.', () => {
        const buttons = wrapper.findAllComponents(HeaderButton);

        buttons.at(2)?.trigger('click');

        expect(wrapper.emitted('OnReset')).toBeDefined();
        expect(wrapper.emitted('OnReset')).toHaveLength(1);
    });

    it('tests that reset button emits `onReset` event.', () => {
        const expectedResetValue = false;
        utilityStore.setResetValue = vi.fn();

        const buttons = wrapper.findAllComponents(HeaderButton);
        buttons.at(0)?.trigger('click');

        expect(utilityStore.setResetValue).toHaveBeenCalledWith(expectedResetValue);
    });

    it('tests that reset button emits `onReset` event.', () => {
        const expectedResetValue = false;
        utilityStore.setResetValue = vi.fn();

        const buttons = wrapper.findAllComponents(HeaderButton);
        buttons.at(0)?.trigger('click');

        expect(utilityStore.setResetValue).toHaveBeenCalledWith(expectedResetValue);
    });

    it('tests that visualizeDijkstra action is called with start & end cells.', () => {
        const expectedStartCell = { id: 'a' };
        const expectedEndCell = { id: 'b' };
        tableStore.visualizeDijkstra = vi.fn();
        // @ts-ignore
        tableStore.getStartingCell = vi.fn().mockReturnValue(expectedStartCell);
        // @ts-ignore
        tableStore.getEndCell = vi.fn().mockReturnValue(expectedEndCell);

        const buttons = wrapper.findAllComponents(HeaderButton);
        buttons.at(0)?.trigger('click');

        expect(tableStore.visualizeDijkstra).toHaveBeenCalledWith({
            startCellId: expectedStartCell.id,
            endCellId: expectedEndCell.id,
        });
    });

    it('tests that visualizeDijkstra action is NOT called when start cell or end cell is undefined.', () => {
        tableStore.visualizeDijkstra = vi.fn();
        // @ts-ignore
        tableStore.getStartingCell = vi.fn().mockReturnValue(null);
        // @ts-ignore
        tableStore.getEndCell = vi.fn().mockReturnValue(null);

        const buttons = wrapper.findAllComponents(HeaderButton);
        buttons.at(0)?.trigger('click');

        expect(tableStore.visualizeDijkstra).toHaveBeenCalledTimes(0);
    });
});
