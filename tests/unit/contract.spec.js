
import { mount } from '@vue/test-utils';
import CreateContract from '@/components/contract/CreateContract.vue';

describe('CreateContract', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CreateContract);
  });

  it('calculates the pricing correctly for an enrolled patient', () => {
    // Arrange
    const patientId = 1;
    wrapper.setData({
      enrolledPatients: [
        {
          id: 1,
          os_months: 12,
          pfs_months: 10,
          product_name: 'Product A',
        },
      ],
      contract: {
        product: [
          {
            name: 'Product A',
            units: { 'unit-1': 10 },
          },
        ],
        productUnits: 'unit-1',
        basePrice: 0,
        payable: 0,
        refundable: 0,
      },
    });

    // Act
    wrapper.vm.calculatePricing(patientId);

    // Assert
    expect(wrapper.vm.contract.basePrice).toEqual('10.00');
    expect(wrapper.vm.contract.payable).toEqual('7.50');
    expect(wrapper.vm.contract.refundable).toEqual('2.50');
  });
});