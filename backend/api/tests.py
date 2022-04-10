from rest_framework.test import APIRequestFactory

# Test simple post request
factory = APIRequestFactory()
test_request = {
    'vehicle_type': 'henkiloauto',
    'year_registered': '2006',
    'mass': '2050',
    'motor_power': 'diesel',
    'consumption': '5.8',
    'yearly_kilometers': '15000',
    'fuel_price': '2.193',
    'yearly_insurance': '332.68'
    }
factory.post('calculate',test_request)