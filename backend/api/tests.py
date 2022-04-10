from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status

from .views import CalculationResult
from .models import TaxClass

class CalculationTest(APITestCase):
    client = APIClient()
    def setUp(self):
        self.tax_class = TaxClass.objects.create(tax_class=158, yearly_tax=218.27, tax_norm = "nedc")
        self.tax_class.save()

    def test_post(self):
        '''Test if simple post request is OK.'''
        test_request = {
            "vehicle-type": "henkiloauto",
            "year-registered": "2006",
            "mass": "2050",
            "motor-power": "diesel",
            "consumption": "5.8",
            "emissions": "158",
            "yearly-kilometers": "15000",
            "fuel-price": "2.193",
            "yearly-insurance": "332.68"
            }
        print("Testing post request.")
        response = self.client.post('/api/calculate/', test_request, format='json')
        print("Response is: ")
        print(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        #self.assertEqual(response.content.decode("UTF-8"), {"yearly": 2880.44, "monthly": 240.04})
