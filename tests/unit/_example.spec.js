import { shallowMount } from '@vue/test-utils';
describe('CreateContract', () => {
    let wrapper;
    const patientId = 1;
    const enrolledPatients = [{ id: 1, product_name: 'Product A', os_months: 15, pfs_months: -1 }, { id: 2, product_name: 'Product B', os_months: -1, pfs_months: 8 }];
    const contract = {
        product: [
            {
                name: 'Product A',
                units: { unit1: 1.0, unit2: 2.0 },
            },
            {
                name: 'Product B',
                units: { unit1: 1.5, unit2: 3.0 },
            }
        ],
        productUnits: 'unit1',
        basePrice: 0,
        payable: 0,
        refundable: 0,
    };

    beforeEach(() => {
        wrapper = shallowMount(CreateContract, {
            data() {
                return {
                    enrolledPatients,
                    contract
                };
            }
        });
    });

    it('calculates pricing correctly for patient with os_months >= 12', () => {
        wrapper.vm.calculatePricing(patientId);
        expect(wrapper.vm.contract.basePrice).toBe('1.00');
        expect(wrapper.vm.contract.payable).toBe('0.75');
        expect(wrapper.vm.contract.refundable).toBe('0.25');
    });

    it('calculates pricing correctly for patient with os_months < 12', () => {
        enrolledPatients[0].os_months = 9;
        wrapper.vm.calculatePricing(patientId);
        expect(wrapper.vm.contract.basePrice).toBe('1.00');
        expect(wrapper.vm.contract.payable).toBe('0.30');
        expect(wrapper.vm.contract.refundable).toBe('0.70');
    });

    it('calculates pricing correctly for patient with pfs_months >= 9', () => {
        enrolledPatients[0].os_months = -1;
        enrolledPatients[0].pfs_months = 10;
        wrapper.vm.calculatePricing(patientId);
        expect(wrapper.vm.contract.basePrice).toBe('1.00');
        expect(wrapper.vm.contract.payable).toBe('0.85');
        expect(wrapper.vm.contract.refundable).toBe('0.15');
    });

    it('calculates pricing correctly for patient with pfs_months < 9', () => {
        enrolledPatients[0].os_months = -1;
        enrolledPatients[0].pfs_months = 7;
        wrapper.vm.calculatePricing(patientId);
        expect(wrapper.vm.contract.basePrice).toBe('1.00');
        expect(wrapper.vm.contract.payable).toBe('0.40');
        expect(wrapper.vm.contract.refundable).toBe('0.60');
    });
});