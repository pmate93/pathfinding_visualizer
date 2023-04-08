import { shallowMount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(AppHeader, {
            props: { msg }
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
